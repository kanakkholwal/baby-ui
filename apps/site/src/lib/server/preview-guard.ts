// Preview-only endpoints: other sites must not use them as a free renderer or an image fetcher.
export const MAX_PROPS = 4096;

const IMAGE_HOSTS = new Set([
	"picsum.photos",
	"fastly.picsum.photos",
	"i.pravatar.cc",
	"cdn.simpleicons.org",
	"avatars.githubusercontent.com",
]);

export function sameOrigin(request: Request, url: URL): boolean {
	const site = request.headers.get("sec-fetch-site");
	if (site) return site === "same-origin";
	const from = request.headers.get("origin") ?? request.headers.get("referer");
	if (!from) return false;
	try {
		return new URL(from).origin === url.origin;
	} catch {
		return false;
	}
}

/** Drops any absolute URL that is neither same-origin nor an allowlisted image host. */
export function safeUrls(value: unknown, origin: string): unknown {
	if (typeof value === "string") {
		if (!/^(https?:)?\/\//i.test(value)) return value;
		try {
			const target = new URL(value, origin);
			return target.origin === origin || IMAGE_HOSTS.has(target.hostname)
				? value
				: undefined;
		} catch {
			return undefined;
		}
	}
	if (Array.isArray(value)) return value.map((item) => safeUrls(item, origin));
	if (value && typeof value === "object") {
		return Object.fromEntries(
			Object.entries(value).map(([key, item]) => [key, safeUrls(item, origin)]),
		);
	}
	return value;
}
