import { defineComponent } from "../index";

export const card = defineComponent({
	slug: "card",
	name: "Card",
	description: "Content surface with header, body and footer slots.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "interactive",
			type: "boolean",
			description:
				"Lift and brighten the border on hover. Only set this when the whole card is a link.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "variant",
			type: '"default" | "framed"',
			description:
				"`framed` wraps the body in the same inset rim as Dialog and Command: a thin bg-background border around a bg-card surface.",
			default: '"default"',
			control: { kind: "select", options: ["default", "framed"] },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The hover lift is removed; the border change stays.",
		behaviour: [
			"An interactive card lifts 2px and brightens its border over 200ms on hover.",
			"A non-interactive card has no hover state at all, so it never looks clickable.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"`interactive` is presentation only. Put a real link or button inside; a hover style is not an affordance.",
			"Part names and `data-slot` values match shadcn/ui, so this replaces an existing card without touching call sites.",
		],
	},
	licenseOrigin: {
		source: "sivir-ui",
		url: "https://github.com/aidan-neel/sivir-ui",
		license: "MIT",
		copyright: "Copyright (c) 2026 Aidan Neel",
	},
	impl: {
		react: {
			entry: "Card",
			files: [
				{ path: "card/card.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Card",
			files: [
				{ path: "card/card.svelte", type: "registry:ui" },
				{ path: "card/card-header.svelte", type: "registry:ui" },
				{ path: "card/card-title.svelte", type: "registry:ui" },
				{ path: "card/card-description.svelte", type: "registry:ui" },
				{ path: "card/card-action.svelte", type: "registry:ui" },
				{ path: "card/card-content.svelte", type: "registry:ui" },
				{ path: "card/card-footer.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["card", "surface", "panel", "container"],
});
