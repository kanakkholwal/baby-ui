export type StorageArea = "local" | "session";

export interface Serializer<T> {
	serialize: (value: T) => string;
	deserialize: (raw: string) => T;
}

export type PersistedErrorContext = "read" | "deserialize" | "write" | "remove";

export interface PersistedStateOptions<T> {
	/** Which web storage to back onto. Defaults to `"local"`. */
	storage?: StorageArea;
	/** Sync across tabs and other instances in this document. Defaults to `true`. */
	syncTabs?: boolean;
	/**
	 * Override how the value is (de)serialized. Defaults to a type-aware
	 * serializer inferred from `initialValue`.
	 */
	serializer?: Serializer<T>;
	/** Observe parse/quota failures. The value still falls back safely. */
	onError?: (error: unknown, context: PersistedErrorContext, key: string) => void;
}

const SAME_DOC_EVENT = "baby-ui:persisted-state";

interface SameDocDetail {
	key: string;
	area: StorageArea;
	source: number;
}

let instanceCounter = 0;

const isBrowser = typeof window !== "undefined";

function isPlainObject(value: unknown): value is Record<string, unknown> {
	if (typeof value !== "object" || value === null) return false;
	const proto = Object.getPrototypeOf(value);
	return proto === Object.prototype || proto === null;
}

/** Serializer inferred from `initialValue`'s type: strings raw, numbers/booleans
 * coerced, everything else JSON. Keeps reading keys written as raw strings. */
export function inferSerializer<T>(initialValue: T): Serializer<T> {
	if (typeof initialValue === "string") {
		return { serialize: (v) => v as string, deserialize: (raw) => raw as T };
	}
	if (typeof initialValue === "number") {
		return {
			serialize: (v) => String(v),
			deserialize: (raw) => {
				const n = Number(raw);
				if (Number.isNaN(n)) throw new Error(`Not a number: ${raw}`);
				return n as T;
			},
		};
	}
	if (typeof initialValue === "boolean") {
		return {
			serialize: (v) => String(v),
			deserialize: (raw) => {
				if (raw !== "true" && raw !== "false") throw new Error(`Not a boolean: ${raw}`);
				return (raw === "true") as T;
			},
		};
	}
	return {
		serialize: (v) => JSON.stringify(v),
		deserialize: (raw) => JSON.parse(raw) as T,
	};
}

function area(storage: StorageArea): Storage {
	return storage === "session" ? window.sessionStorage : window.localStorage;
}

/** Reactive value backed by web storage (`.current`), synced across tabs. Missing,
 * malformed or partial stored data falls back to `initialValue`, never throws. */
export class PersistedState<T> {
	#key: string;
	#areaKind: StorageArea;
	#serializer: Serializer<T>;
	#onError?: (error: unknown, context: PersistedErrorContext, key: string) => void;
	#initialValue: T;
	#source = instanceCounter++;
	#synced: boolean;
	#value = $state() as T;

	constructor(key: string, initialValue: T, options: PersistedStateOptions<T> = {}) {
		this.#key = key;
		this.#areaKind = options.storage ?? "local";
		this.#serializer = options.serializer ?? inferSerializer(initialValue);
		this.#onError = options.onError;
		this.#initialValue = initialValue;
		this.#synced = options.syncTabs ?? true;
		this.#value = this.#read();

		if (isBrowser && this.#synced) {
			window.addEventListener("storage", this.#onStorage);
			window.addEventListener(SAME_DOC_EVENT, this.#onSameDoc as EventListener);
		}
	}

	get current(): T {
		return this.#value;
	}

	set current(next: T) {
		this.#value = next;
		this.#write(next);
	}

	/** Clears the key and reverts `current` to the initial value. */
	reset() {
		this.current = this.#initialValue;
		if (!isBrowser) return;
		try {
			area(this.#areaKind).removeItem(this.#key);
		} catch (error) {
			this.#onError?.(error, "remove", this.#key);
		}
	}

	/** Stops listening for cross-tab/same-document updates. */
	dispose() {
		if (!isBrowser || !this.#synced) return;
		window.removeEventListener("storage", this.#onStorage);
		window.removeEventListener(SAME_DOC_EVENT, this.#onSameDoc as EventListener);
	}

	#read(): T {
		if (!isBrowser) return this.#initialValue;
		let raw: string | null;
		try {
			raw = area(this.#areaKind).getItem(this.#key);
		} catch (error) {
			this.#onError?.(error, "read", this.#key);
			return this.#initialValue;
		}
		if (raw === null) return this.#initialValue;
		try {
			const parsed = this.#serializer.deserialize(raw);
			if (isPlainObject(this.#initialValue) && isPlainObject(parsed)) {
				return { ...this.#initialValue, ...parsed } as T;
			}
			return parsed;
		} catch (error) {
			this.#onError?.(error, "deserialize", this.#key);
			return this.#initialValue;
		}
	}

	#write(value: T) {
		if (!isBrowser) return;
		try {
			area(this.#areaKind).setItem(this.#key, this.#serializer.serialize(value));
		} catch (error) {
			this.#onError?.(error, "write", this.#key);
			return;
		}
		if (!this.#synced) return;
		window.dispatchEvent(
			new CustomEvent<SameDocDetail>(SAME_DOC_EVENT, {
				detail: { key: this.#key, area: this.#areaKind, source: this.#source },
			}),
		);
	}

	#onStorage = (event: StorageEvent) => {
		if (event.key !== this.#key || event.storageArea !== area(this.#areaKind)) return;
		this.#value = this.#read();
	};

	#onSameDoc = (event: CustomEvent<SameDocDetail>) => {
		const { key, area: eventArea, source } = event.detail;
		if (key !== this.#key || eventArea !== this.#areaKind || source === this.#source)
			return;
		this.#value = this.#read();
	};
}

/** Convenience factory for when `new PersistedState(...)` reads awkwardly at the call site. */
export function persisted<T>(
	key: string,
	initialValue: T,
	options?: PersistedStateOptions<T>,
): PersistedState<T> {
	return new PersistedState(key, initialValue, options);
}

interface SafeStorageOptions<T> {
	storage?: StorageArea;
	serializer?: Serializer<T>;
	onError?: (error: unknown, context: PersistedErrorContext, key: string) => void;
}

/**
 * Non-reactive twin of `PersistedState` for one-shot reads/writes that don't
 * need a reactive rune or cross-tab listeners. Same null/parse/quota guarantees.
 */
export const safeStorage = {
	get<T>(key: string, fallback: T, options: SafeStorageOptions<T> = {}): T {
		if (!isBrowser) return fallback;
		const storage = options.storage ?? "local";
		const serializer = options.serializer ?? inferSerializer(fallback);

		let raw: string | null;
		try {
			raw = area(storage).getItem(key);
		} catch (error) {
			options.onError?.(error, "read", key);
			return fallback;
		}
		if (raw === null) return fallback;

		try {
			return serializer.deserialize(raw);
		} catch (error) {
			options.onError?.(error, "deserialize", key);
			return fallback;
		}
	},

	set<T>(key: string, value: T, options: SafeStorageOptions<T> = {}): void {
		if (!isBrowser) return;
		const storage = options.storage ?? "local";
		const serializer = options.serializer ?? inferSerializer(value);
		try {
			area(storage).setItem(key, serializer.serialize(value));
		} catch (error) {
			options.onError?.(error, "write", key);
		}
	},

	remove(
		key: string,
		options: Pick<SafeStorageOptions<unknown>, "storage" | "onError"> = {},
	): void {
		if (!isBrowser) return;
		const storage = options.storage ?? "local";
		try {
			area(storage).removeItem(key);
		} catch (error) {
			options.onError?.(error, "remove", key);
		}
	},
};
