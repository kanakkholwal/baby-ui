import { defineComponent } from "../index";

export const card = defineComponent({
	slug: "card",
	name: "Card",
	description:
		"Surface with optional header, body and footer slots that keep consistent padding.",
	category: "base",
	status: "stable",
	variants: { padding: ["sm", "md", "lg"] },
	props: [
		{
			name: "padding",
			type: '"sm" | "md" | "lg"',
			description: "Inner padding on every slot.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg"] },
		},
		{
			name: "interactive",
			type: "boolean",
			description:
				"Lift and brighten the border on hover. Only set this when the whole card is a link.",
			default: false,
			control: { kind: "boolean" },
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
				{ path: "card/card-footer.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["card", "surface", "panel", "container"],
});
