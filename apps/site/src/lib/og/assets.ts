const STORE = "baby-ui-og-v1";
const MEMO_LIMIT = 48;

export type Asset = { data: ArrayBuffer; type: string };

const memo = new Map<string, Promise<Asset>>();

async function store(): Promise<Cache | null> {
	try {
		return typeof caches === "undefined" ? null : await caches.open(STORE);
	} catch {
		return null;
	}
}

async function read(response: Response): Promise<Asset> {
	return {
		data: await response.arrayBuffer(),
		type: response.headers.get("content-type") ?? "",
	};
}

async function load(url: string, init?: RequestInit): Promise<Asset> {
	const disk = await store();
	const hit = await disk?.match(url);
	if (hit) return read(hit);
	const response = await fetch(url, init);
	if (!response.ok) throw new Error(`${response.status} for ${url}`);
	// Stored without blocking the render; a full quota is not a render failure.
	if (disk) void disk.put(url, response.clone()).catch(() => undefined);
	return read(response);
}

/**
 * A font or image, loaded once per worker and kept in Cache Storage across visits.
 * A failed load is forgotten, so the next render retries instead of replaying the failure.
 */
export function cachedAsset(url: string, init?: RequestInit): Promise<Asset> {
	const known = memo.get(url);
	if (known) return known;
	const next = load(url, init);
	memo.set(url, next);
	next.catch(() => memo.delete(url));
	const oldest = memo.size > MEMO_LIMIT ? memo.keys().next().value : undefined;
	if (oldest !== undefined) memo.delete(oldest);
	return next;
}
