import type { Framework } from "@baby-ui/registry-schema";

export type Appearance = "light" | "dark" | "system";
export type Dialect = "ts" | "js";

/** Each accent writes these two variables on <html>, overriding the token layer. */
export const ACCENTS = [
	{ id: "default", name: "Cyan", accent: "oklch(80% 0.18 195)", fg: "#151515" },
	{ id: "violet", name: "Violet", accent: "oklch(68% 0.22 295)", fg: "oklch(98% 0 0)" },
	{ id: "lime", name: "Lime", accent: "oklch(80% 0.22 145)", fg: "#151515" },
	{ id: "amber", name: "Amber", accent: "oklch(78% 0.18 75)", fg: "#151515" },
	{ id: "rose", name: "Rose", accent: "oklch(66% 0.21 18)", fg: "oklch(98% 0 0)" },
] as const;

export type AccentId = (typeof ACCENTS)[number]["id"];

const KEY = "baby-ui:preferences";

type Stored = {
	framework: Framework;
	dialect: Dialect;
	appearance: Appearance;
	accent: AccentId;
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
	appearance = $state<Appearance>("dark");
	accent = $state<AccentId>("default");
	open = $state(false);

	/** Called once from the root layout, where `document` exists. */
	hydrate() {
		const saved = read();
		if (saved.framework) this.framework = saved.framework;
		if (saved.dialect) this.dialect = saved.dialect;
		if (saved.appearance) this.appearance = saved.appearance;
		if (saved.accent) this.accent = saved.accent;
		this.apply();
	}

	save() {
		try {
			localStorage.setItem(
				KEY,
				JSON.stringify({
					framework: this.framework,
					dialect: this.dialect,
					appearance: this.appearance,
					accent: this.accent,
				}),
			);
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

		const swatch = ACCENTS.find((a) => a.id === this.accent) ?? ACCENTS[0];
		root.style.setProperty("--accent", swatch.accent);
		root.style.setProperty("--accent-fg", swatch.fg);
	}

	set<K extends keyof Stored>(key: K, value: Stored[K]) {
		this[key] = value as never;
		this.apply();
		this.save();
	}
}

export const prefs = new Preferences();
