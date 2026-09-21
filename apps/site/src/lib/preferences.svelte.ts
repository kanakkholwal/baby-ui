import type { Framework } from "@baby-ui/registry-schema";

export type Appearance = "light" | "dark" | "system";
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
	appearance: Appearance;
	pm: PackageManager;
};

function read(): Partial<Stored> {
	try {
		return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Partial<Stored>;
	} catch {
		return {};
	}
}

class Preferences {
	framework = $state<Framework>("svelte");
	dialect = $state<Dialect>("ts");
	pm = $state<PackageManager>("bun");
	appearance = $state<Appearance>("dark");
	theme = $state<ThemeId>("default");
	open = $state(false);

	/** Called once from the root layout, where `document` exists. */
	hydrate() {
		const saved = read();
		if (saved.framework) this.framework = saved.framework;
		if (saved.dialect) this.dialect = saved.dialect;
		if (saved.pm) this.pm = saved.pm;
		if (saved.appearance) this.appearance = saved.appearance;
		try {
			const session = sessionStorage.getItem(THEME_KEY) as ThemeId | null;
			if (session && THEMES.some((t) => t.id === session)) this.theme = session;
		} catch {
			// Storage can be blocked; the default theme still applies.
		}
		this.apply();
	}

	save() {
		try {
			localStorage.setItem(
				KEY,
				JSON.stringify({
					framework: this.framework,
					dialect: this.dialect,
					pm: this.pm,
					appearance: this.appearance,
				}),
			);
			// The theme is a try-it-out control, so it lasts the tab and not longer.
			sessionStorage.setItem(THEME_KEY, this.theme);
		} catch {
			// A blocked storage API should not stop the preference taking effect.
		}
	}

	apply() {
		const root = document.documentElement;
		const dark =
			this.appearance === "system"
				? matchMedia("(prefers-color-scheme: dark)").matches
				: this.appearance === "dark";
		root.classList.toggle("dark", dark);
		root.style.colorScheme = dark ? "dark" : "light";

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
		this[key] = value as never;
		this.apply();
		this.save();
	}
}

export const prefs = new Preferences();
