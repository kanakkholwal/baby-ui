import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const CACHE_DIR = resolve(
	dirname(fileURLToPath(import.meta.url)),
	"../node_modules/.cache/registry-build",
);

export const hashOf = (...parts: string[]) =>
	createHash("sha1").update(parts.join("\0")).digest("hex");

type Stored = { version: string; entries: Record<string, string | null> };

/**
 * A content-addressed disk cache: a value is keyed by the hash of its inputs, and the whole file
 * is dropped when `version` changes. `save` keeps only the entries this run read or wrote.
 */
export async function openCache(name: string, version: string) {
	const file = resolve(CACHE_DIR, `${name}.json`);
	const stored: Stored | null = await readFile(file, "utf8")
		.then((raw) => JSON.parse(raw) as Stored)
		.catch(() => null);
	const previous = new Map(
		Object.entries(stored?.version === version ? stored.entries : {}),
	);
	// Promises, so two callers asking for one key in parallel share a single compute.
	const used = new Map<string, Promise<string | null>>();

	return {
		get(key: string, compute: () => Promise<string | null>): Promise<string | null> {
			const known = used.get(key);
			if (known) return known;
			const value = previous.has(key)
				? Promise.resolve(previous.get(key) ?? null)
				: compute();
			used.set(key, value);
			// A failed compute is not a result; the next run tries again.
			value.catch(() => used.get(key) === value && used.delete(key));
			return value;
		},
		async save() {
			const entries: Record<string, string | null> = {};
			for (const key of [...used.keys()].sort()) {
				const value = await used.get(key)?.catch(() => undefined);
				if (value !== undefined) entries[key] = value;
			}
			await mkdir(CACHE_DIR, { recursive: true });
			// Two builds at once (turbo plus the dev watcher) must never leave a half-written file.
			const tmp = `${file}.${process.pid}.tmp`;
			await writeFile(tmp, JSON.stringify({ version, entries } satisfies Stored));
			await rename(tmp, file);
		},
	};
}
