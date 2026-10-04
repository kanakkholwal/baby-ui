import { track } from "#lib/analytics.js";

export type StudioSlug = "background" | "chart" | "og";
type Base = { studio: StudioSlug };
type OgLayerKind = "text" | "image" | "shape";

/** Every studio event with its properties; PostHog receives each as `studio_<name>`. */
export type StudioEvents = {
	opened: Base & { mode?: string };
	/** Sent when the visitor leaves: how long they stayed and how much they did. */
	session_ended: Base & { seconds: number; actions: number; exported: boolean };
	mode_switched: Base & { mode: string };
	item_picked: Base & { slug: string; tier: string; via: "list" | "select" | "shuffle" };
	props_changed: Base & { slug: string; props: string[] };
	png_toggled: Base & { on: boolean };
	png_downloaded: Base & { slug: string; ms: number };
	png_failed: Base & { slug: string; message: string };
	code_opened: Base & { slug: string; locked: boolean };
	link_copied: Base & { slug: string };
	remixed: Base & { slug: string };
	reset: Base & { slug: string };
	layout_applied: Base & { layout: string; tier: "free" | "pro"; replaced: number };
	layer_added: Base & {
		kind: OgLayerKind;
		via: "button" | "drop" | "upload" | "duplicate";
	};
	layer_removed: Base & { kind: OgLayerKind };
	layer_restacked: Base & { kind: OgLayerKind; direction: "forward" | "backward" };
	text_edited: Base & { via: "canvas" | "panel" };
	history_used: Base & { action: "undo" | "redo"; via: "button" | "shortcut" };
	shortcut_used: Base & { key: string };
	panel_tab: Base & { panel: string; tab: string };
	pro_gate_shown: Base & { slug: string; action: "download" | "code" };
};

export type StudioEvent = keyof StudioEvents;

let actions = 0;
let exported = false;

/** Captures one studio event; a no-op wherever analytics is off. */
export function trackStudio<E extends StudioEvent>(event: E, props: StudioEvents[E]) {
	if (event !== "opened" && event !== "session_ended") actions += 1;
	if (event === "png_downloaded" || event === "code_opened") exported = true;
	track(`studio_${event}`, props);
}

const pending = new Map<string, ReturnType<typeof setTimeout>>();

/** For a stream of edits (dragging a dial): sends only the last call once it settles. */
export function trackStudioSettled<E extends StudioEvent>(
	key: string,
	event: E,
	props: StudioEvents[E],
	ms = 1500,
) {
	clearTimeout(pending.get(key));
	pending.set(
		key,
		setTimeout(() => {
			pending.delete(key);
			trackStudio(event, props);
		}, ms),
	);
}

/** Sends `opened` now and `session_ended` on unmount or tab close; returns the cleanup. */
export function startStudioSession(studio: StudioSlug, mode?: string): () => void {
	const started = performance.now();
	actions = 0;
	exported = false;
	trackStudio("opened", { studio, ...(mode ? { mode } : {}) });
	let ended = false;
	const end = () => {
		if (ended) return;
		ended = true;
		trackStudio("session_ended", {
			studio,
			seconds: Math.round((performance.now() - started) / 1000),
			actions,
			exported,
		});
	};
	addEventListener("pagehide", end);
	return () => {
		removeEventListener("pagehide", end);
		end();
	};
}
