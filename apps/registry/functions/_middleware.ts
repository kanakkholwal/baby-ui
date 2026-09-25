import { PostHog } from "posthog-node";

type Env = { POSTHOG_KEY?: string };
type Context = {
	request: Request & { cf?: { country?: string } };
	env: Env;
	next: () => Promise<Response>;
	waitUntil: (promise: Promise<unknown>) => void;
};

// Keep in step with POSTHOG_REGION in apps/site/src/lib/analytics.ts.
const HOST = "https://us.i.posthog.com";
// curl is the deploy smoke test; the rest are crawlers.
const SKIP = /^curl\/|bot|crawler|spider/i;

async function visitor(request: Request) {
	const ip = request.headers.get("cf-connecting-ip") ?? "";
	const agent = request.headers.get("user-agent") ?? "";
	const day = new Date().toISOString().slice(0, 10);
	const digest = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder().encode(`${ip}|${agent}|${day}`),
	);
	return [...new Uint8Array(digest).slice(0, 12)]
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
}

async function capture(context: Context, key: string, response: Response) {
	const { request } = context;
	const { pathname } = new URL(request.url);
	const agent = request.headers.get("user-agent") ?? "";
	const posthog = new PostHog(key, { host: HOST });
	await posthog.captureImmediate({
		event: "registry_item_fetched",
		// A daily hash of IP and user agent: counts distinct installers without storing either.
		distinctId: await visitor(request),
		properties: {
			item: pathname
				.split("/")
				.pop()
				?.replace(/\.json$/, ""),
			framework: pathname.startsWith("/svelte/") ? "svelte" : "react",
			dialect: pathname.includes("/js/") ? "js" : "ts",
			status: response.status,
			client: /Mozilla\//.test(agent) ? "browser" : "cli",
			user_agent: agent.slice(0, 120),
			country: request.cf?.country,
			$process_person_profile: false,
		},
	});
}

/** Records every registry JSON download: the CLI fetches these, so they are real installs. */
export const onRequest = async (context: Context) => {
	const response = await context.next();
	const key = context.env.POSTHOG_KEY;
	const agent = context.request.headers.get("user-agent") ?? "";
	if (key && context.request.method === "GET" && !SKIP.test(agent)) {
		context.waitUntil(capture(context, key, response).catch(() => {}));
	}
	return response;
};
