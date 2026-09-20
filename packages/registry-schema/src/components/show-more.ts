import { defineComponent } from "../index";

export const showMore = defineComponent({
	slug: "show-more",
	name: "Show More",
	description:
		"Clamps long content to a height and offers an expander only when it overflows.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "collapsedHeight",
			type: "number",
			description: "Height of the clamped state, in pixels.",
			default: 120,
			control: { kind: "number", min: 60, max: 400, step: 10 },
		},
		{
			name: "moreLabel",
			type: "string",
			description: "Expander label when collapsed.",
			default: "Show more",
			control: { kind: "text" },
		},
		{
			name: "lessLabel",
			type: "string",
			description: "Expander label when expanded.",
			default: "Show less",
			control: { kind: "text" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Unchanged; the fade is not motion.",
		behaviour: [
			"A gradient fade at the bottom signals that the text continues. Without it a hard cut reads as the end of the content.",
			"Height is not animated: the jump is honest and an eased expansion of unknown length is worse than none.",
		],
	},
	a11y: {
		keyboard: ["Enter and Space toggle the content"],
		notes: [
			"The control is only rendered when the content actually overflows, so there is never a Show more that does nothing.",
			"aria-expanded points at the clamped region.",
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
			entry: "ShowMore",
			files: [
				{ path: "show-more/show-more.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "ShowMore",
			files: [
				{ path: "show-more/show-more.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["show", "more"],
});
