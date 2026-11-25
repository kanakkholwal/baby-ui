import { defineComponent } from "@baby-ui/registry-schema";

export const scrollArea = defineComponent({
	slug: "scroll-area",
	name: "Scroll Area",
	description:
		"Scroll container with edge fades that appear only when there is more to see.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "maxHeight",
			type: "string",
			description: "CSS max-height for the viewport.",
			default: "16rem",
			control: { kind: "text" },
		},
		{
			name: "scrollbar",
			type: '"auto" | "hover" | "scroll" | "hidden"',
			description:
				"`auto` always shows the bar; `hover` shows it on hover, focus or while scrolling; `scroll` only while scrolling; `hidden` removes the bar and its gutter.",
			default: "auto",
			control: { kind: "select", options: ["auto", "hover", "scroll", "hidden"] },
		},
		{
			name: "gutter",
			type: '"overlay" | "reserve"',
			description:
				"`overlay` lets the bar sit over the content; `reserve` pads the content so the bar never overlaps it.",
			default: "overlay",
			control: { kind: "select", options: ["overlay", "reserve"] },
		},
		{
			name: "orientation",
			type: '"vertical" | "horizontal" | "both"',
			description:
				"The scroll axis. Vertical uses `maxHeight`; horizontal scrolls sideways; both scrolls either way.",
			default: "vertical",
			control: { kind: "select", options: ["vertical", "horizontal", "both"] },
		},
		{
			name: "fadeSize",
			type: "number",
			description:
				"Length in px over which a `mask` fade ramps in while the content scrolls toward that edge.",
			default: 32,
			control: { kind: "number", min: 8, max: 80, step: 4 },
		},
		{
			name: "fadeOffset",
			type: "number",
			description: "Px the content must scroll before a fade starts.",
			default: 0,
			control: { kind: "number", min: 0, max: 80, step: 4 },
		},
		{
			name: "fade",
			type: '"mask" | "blur" | "none"',
			description:
				"How a clipped end reads. `mask` fades the content out, `blur` softens it, `none` cuts it. Ends appear only when content is clipped there.",
			default: "mask",
			control: { kind: "select", options: ["mask", "blur", "none"] },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Unchanged; the fades are not motion.",
		behaviour: [
			"Each edge fades only while content is clipped there, so a short list has no false edge. With `both`, all four edges fade and intersect at the corners.",
			"A fade grows with the scroll position over `fadeSize` px instead of switching on, so it is already right at first scroll and reverses with it. Right-to-left boxes swap the horizontal edges.",
			"Nested regions contain overscroll, so a wheel or trackpad gesture does not move the page behind a sidebar or panel.",
		],
	},
	a11y: {
		keyboard: [
			{
				keys: ["Arrow keys", "Page Up", "Page Down"],
				action: "Scrolls the region natively",
			},
		],
		notes: [
			"The viewport still scrolls via real overflow, so keyboard scrolling, momentum and screen-reader virtual cursors all keep working. `scrollbar=hidden` changes only the visual affordance and reserved gutter.",
			"Positioning, drag-to-scroll and auto-hide are delegated to Base UI (React) and bits-ui (Svelte); this component only owns the classes and data-slots.",
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
			entry: "ScrollArea",
		},
		svelte: {
			entry: "ScrollArea",
		},
	},
	keywords: ["scroll", "area"],
});
