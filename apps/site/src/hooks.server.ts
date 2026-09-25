import type { Handle } from "@sveltejs/kit";
import { POSTHOG_REGION } from "$lib/analytics";

const INGEST = `https://${POSTHOG_REGION}.i.posthog.com`;
const FORWARDED = ["content-type", "content-encoding", "user-agent"];

// Same-origin proxy: ad blockers drop requests aimed at posthog.com directly.
export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;
	if (!pathname.startsWith("/ingest/")) return resolve(event);

	// Read only here: prerendering throws on any access to url.search.
	const { request, url } = event;
	const headers = new Headers({ "x-forwarded-for": event.getClientAddress() });
	for (const name of FORWARDED) {
		const value = request.headers.get(name);
		if (value) headers.set(name, value);
	}
	const hasBody = request.method !== "GET" && request.method !== "HEAD";
	const upstream = await fetch(
		`${INGEST}${pathname.slice("/ingest".length)}${url.search}`,
		{
			method: request.method,
			headers,
			body: hasBody ? await request.arrayBuffer() : undefined,
		},
	);
	return new Response(upstream.body, upstream);
};
