import type { PostHog } from "posthog-js/dist/module.slim.no-external";

/** PostHog cloud region; the `/ingest` proxy in hooks.server.ts forwards here. */
export const POSTHOG_REGION = "us";

export type TrackProps = Record<string, unknown>;
/** An event a copy control fires, so each call site can say what was copied. */
export type TrackEvent = { event: string; props?: TrackProps };

const KEY = import.meta.env.VITE_POSTHOG_KEY;
let client: PostHog | undefined;
let context: TrackProps = {};

function trackOutbound(e: MouseEvent) {
	const link = (e.target as Element | null)?.closest("a[href]");
	if (!(link instanceof HTMLAnchorElement) || link.host === location.host) return;
	track("outbound_clicked", { href: link.origin + link.pathname });
}

/** Loads PostHog in production builds that have `VITE_POSTHOG_KEY`; otherwise a no-op. */
export async function initAnalytics() {
	if (!import.meta.env.PROD || !KEY || client) return;
	// The slim no-external build has no replay, surveys or remote script loading: half the size.
	const { posthog } = await import("posthog-js/dist/module.slim.no-external");
	posthog.init(KEY, {
		api_host: "/ingest",
		ui_host: `https://${POSTHOG_REGION}.posthog.com`,
		// Cookieless needs "Cookieless server hash mode" enabled in the project settings.
		cookieless_mode: "always",
		// Sent by hand below, after the context is registered; the root layout sends route changes.
		capture_pageview: false,
		capture_pageleave: true,
		autocapture: false,
		disable_session_recording: true,
		disable_surveys: true,
		advanced_disable_flags: true,
	});
	posthog.register(context);
	client = posthog;
	track("$pageview");
	document.addEventListener("click", trackOutbound);
}

/** Properties attached to every later event: current component, framework, package manager. */
export function setAnalyticsContext(props: TrackProps) {
	context = { ...context, ...props };
	client?.register(props);
}

/** Captures a custom event; dropped silently when analytics is off. */
export function track(event: string, props?: TrackProps) {
	client?.capture(event, props);
}
