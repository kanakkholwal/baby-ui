import { error } from "@sveltejs/kit";
import type { Component } from "svelte";

// Prop types live in the optional Pro repo, which public CI never checks out.
// biome-ignore lint/suspicious/noExplicitAny: see above
type Screen = Component<any>;

const screens = __SHOW_PRO__
	? (import.meta.glob(
			"../../../../pro/packages/demos/src/screens/*-screen.svelte",
		) as Record<string, () => Promise<{ default: Screen }>>)
	: {};
const samples = __SHOW_PRO__
	? import.meta.glob("../../../../pro/packages/demos/src/screens/sample.ts")
	: {};

/** The named screen and the Pro sample module, or a 404 when this build has no Pro. */
export async function loadProScreen(
	name: "login" | "pricing" | "checkout" | "dashboard",
) {
	const screen = Object.entries(screens).find(([path]) =>
		path.endsWith(`/${name}-screen.svelte`),
	);
	const sample = Object.values(samples)[0];
	if (!screen || !sample) error(404, "Not found");
	const [mod, data] = await Promise.all([screen[1](), sample()]);
	// biome-ignore lint/suspicious/noExplicitAny: typed in the Pro repo
	return { Screen: mod.default, sample: data as Record<string, any> };
}
