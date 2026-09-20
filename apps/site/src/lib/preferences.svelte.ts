import type { Framework } from "@baby-ui/registry-schema";

export type Appearance = "light" | "dark" | "system";
export type Dialect = "ts" | "js";

/** Each entry overrides --primary on <html>, so every component recolours at once. */
export const PRIMARIES = [
	{ id: "default", name: "Default", primary: "", fg: "" },
	{ id: "cyan", name: "Cyan", primary: "oklch(72% 0.15 195)", fg: "oklch(99% 0 0)" },
	{ id: "violet", name: "Violet", primary: "oklch(58% 0.22 295)", fg: "oklch(99% 0 0)" },
	{ id: "lime", name: "Lime", primary: "oklch(70% 0.19 145)", fg: "oklch(15% 0 0)" },
	{ id: "amber", name: "Amber", primary: "oklch(76% 0.16 75)", fg: "oklch(15% 0 0)" },
	{ id: "rose", name: "Rose", primary: "oklch(62% 0.21 18)", fg: "oklch(99% 0 0)" },
] as const;

export type PrimaryId = (typeof PRIMARIES)[number]["id"];

const KEY = "baby-ui:preferences";
const PRIMARY_KEY = "baby-ui:primary";

type Stored = {
	framework: Framework;
	dialect: Dialect;
	appearance: Appearance;
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
	primary = $state<PrimaryId>("default");
	open = $state(false);

	/** Called once from the root layout, where `document` exists. */
	hydrate() {
		const saved = read();
		if (saved.framework) this.framework = saved.framework;
		if (saved.dialect) this.dialect = saved.dialect;
		if (saved.appearance) this.appearance = saved.appearance;
		try {
			const session = sessionStorage.getItem(PRIMARY_KEY) as PrimaryId | null;
			if (session && PRIMARIES.some((p) => p.id === session)) this.primary = session;
		} catch {
			// Storage can be blocked; the default primary still applies.
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
					appearance: this.appearance,
				}),
			);
			// Primary is a try-it-out control, so it lasts the tab and not longer.
			sessionStorage.setItem(PRIMARY_KEY, this.primary);
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

		const swatch = PRIMARIES.find((p) => p.id === this.primary) ?? PRIMARIES[0];
		if (swatch.primary) {
			root.style.setProperty("--primary", swatch.primary);
			root.style.setProperty("--primary-foreground", swatch.fg);
			root.style.setProperty("--ring", swatch.primary);
		} else {
			root.style.removeProperty("--primary");
			root.style.removeProperty("--primary-foreground");
			root.style.removeProperty("--ring");
		}
	}

	set<K extends keyof Stored | "primary">(
		key: K,
		value: K extends keyof Stored ? Stored[K] : PrimaryId,
	) {
		this[key] = value as never;
		this.apply();
		this.save();
	}
}

export const prefs = new Preferences();
