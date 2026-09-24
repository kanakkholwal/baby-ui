import type { Framework } from "@baby-ui/registry-schema";
import { mode } from "mode-watcher";
import { persisted } from "./persisted-state.svelte";

export type Dialect = "ts" | "js";
export type PackageManager = "bun" | "npm" | "pnpm" | "yarn";

type Ramp = { primary: string; fg: string };

/** The eleven beUI themes. Each rewrites the brand ramp; neutrals never move. */
export const THEMES = [
	{ id: "default", name: "Mono", swatch: "oklch(40% 0 0)" },
	{
		id: "violet",
		name: "Violet",
		swatch: "oklch(55% 0.2 290)",
		light: { primary: "oklch(55% 0.2 290)", fg: "oklch(99% 0 0)" },
		dark: { primary: "oklch(72% 0.16 290)", fg: "oklch(15% 0 0)" },
	},
	{
		id: "blue",
		name: "Blue",
		swatch: "oklch(55% 0.18 255)",
		light: { primary: "oklch(55% 0.18 255)", fg: "oklch(99% 0 0)" },
		dark: { primary: "oklch(70% 0.15 255)", fg: "oklch(15% 0 0)" },
	},
	{
		id: "green",
		name: "Green",
		swatch: "oklch(56% 0.14 150)",
		light: { primary: "oklch(56% 0.14 150)", fg: "oklch(99% 0 0)" },
		dark: { primary: "oklch(72% 0.15 150)", fg: "oklch(15% 0 0)" },
	},
	{
		id: "amber",
		name: "Amber",
		swatch: "oklch(74% 0.15 70)",
		light: { primary: "oklch(74% 0.15 70)", fg: "oklch(20% 0.02 70)" },
		dark: { primary: "oklch(80% 0.15 75)", fg: "oklch(18% 0.02 75)" },
	},
	{
		id: "blood-orange",
		name: "Blood Orange",
		swatch: "oklch(60% 0.19 40)",
		light: { primary: "oklch(60% 0.19 40)", fg: "oklch(99% 0 0)" },
		dark: { primary: "oklch(72% 0.17 42)", fg: "oklch(15% 0 0)" },
	},
	{
		id: "rose",
		name: "Rose",
		swatch: "oklch(58% 0.2 12)",
		light: { primary: "oklch(58% 0.2 12)", fg: "oklch(99% 0 0)" },
		dark: { primary: "oklch(70% 0.17 12)", fg: "oklch(15% 0 0)" },
	},
	{
		id: "red",
		name: "Red",
		swatch: "oklch(55% 0.22 25)",
		light: { primary: "oklch(55% 0.22 25)", fg: "oklch(99% 0 0)" },
		dark: { primary: "oklch(68% 0.19 25)", fg: "oklch(15% 0 0)" },
	},
	{
		id: "teal",
		name: "Teal",
		swatch: "oklch(55% 0.12 185)",
		light: { primary: "oklch(55% 0.12 185)", fg: "oklch(99% 0 0)" },
		dark: { primary: "oklch(72% 0.13 185)", fg: "oklch(15% 0 0)" },
	},
	{
		id: "indigo",
		name: "Indigo",
		swatch: "oklch(50% 0.2 275)",
		light: { primary: "oklch(50% 0.2 275)", fg: "oklch(99% 0 0)" },
		dark: { primary: "oklch(70% 0.16 275)", fg: "oklch(15% 0 0)" },
	},
	{
		id: "lime",
		name: "Lime",
		swatch: "oklch(72% 0.18 130)",
		light: { primary: "oklch(72% 0.18 130)", fg: "oklch(20% 0.04 130)" },
		dark: { primary: "oklch(80% 0.18 130)", fg: "oklch(18% 0.04 130)" },
	},
] as const satisfies readonly {
	id: string;
	name: string;
	swatch: string;
	light?: Ramp;
	dark?: Ramp;
}[];

export type ThemeId = (typeof THEMES)[number]["id"];

const KEY = "baby-ui:preferences";
const THEME_KEY = "baby-ui:theme";

type Stored = {
	framework: Framework;
	dialect: Dialect;
	pm: PackageManager;
};

const DEFAULT_STORED: Stored = {
	framework: "svelte",
	dialect: "ts",
	pm: "bun",
};

class Preferences {
	#stored = persisted<Stored>(KEY, DEFAULT_STORED);
	// The theme is a try-it-out control, so it lasts the tab and not longer.
	#theme = persisted<ThemeId>(THEME_KEY, "default", { storage: "session" });
	open = $state(false);

	get framework() {
		return this.#stored.current.framework;
	}
	get dialect() {
		return this.#stored.current.dialect;
	}
	get pm() {
		return this.#stored.current.pm;
	}
	get theme() {
		return this.#theme.current;
	}

	/** Applies the brand ramp for the current mode-watcher mode and `theme`.
	 * Call from an `$effect` in the root layout so it reruns on any change. */
	apply() {
		const root = document.documentElement;
		const dark = mode.current !== "light";

		const entry = THEMES.find((t) => t.id === this.theme) ?? THEMES[0];
		const ramp = "light" in entry ? (dark ? entry.dark : entry.light) : undefined;
		// --ring derives from --primary in the token layer, so it follows on its own.
		for (const [name, value] of [
			["--primary", ramp?.primary],
			["--primary-foreground", ramp?.fg],
			["--accent", ramp?.primary],
			["--accent-foreground", ramp?.fg],
		] as const) {
			if (value) root.style.setProperty(name, value);
			else root.style.removeProperty(name);
		}
	}

	set<K extends keyof Stored | "theme">(
		key: K,
		value: K extends keyof Stored ? Stored[K] : ThemeId,
	) {
		if (key === "theme") {
			this.#theme.current = value as ThemeId;
		} else {
			this.#stored.current = { ...this.#stored.current, [key]: value };
		}
	}
}

export const prefs = new Preferences();
