import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { carousel as carouselVariants } from "./variants";

const SIZES = ["sm", "default", "lg"];
const VARIANTS = ["default", "peek", "flat", "inset", "showcase"];
const PROJECTIONS = ["linear", "concave", "convex"];

export const carousel = defineComponent({
	slug: "carousel",
	name: "Carousel",
	description:
		"Slides browsed by drag, flick, trackpad swipe or keys. Compose content, arrows, dots and thumbnails; neighbours can peek in.",
	category: "base",
	status: "stable",
	variants: variantsOf(carouselVariants, ["projection", "variant", "size"]),
	props: [
		{
			name: "label",
			type: "string",
			description:
				'Names the carousel for assistive technology, e.g. "From the Harbour suites".',
			required: true,
			control: { kind: "none" },
		},
		{
			name: "projection",
			type: PROJECTIONS.map((v) => `"${v}"`).join(" | "),
			description:
				"Linear is the standard track; concave and convex project the same slides and controls onto cylindrical geometry.",
			default: "linear",
			control: { kind: "select", options: PROJECTIONS },
		},
		{
			name: "visibleItems",
			type: "number",
			description:
				"Most slides shown across a cylindrical projection; fewer when the container is too narrow for them not to overlap.",
			default: 5,
			control: { kind: "number", min: 3, max: 9, step: 2 },
		},
		{
			name: "minScale",
			type: "number",
			description: "Scale at the farthest point of a cylindrical projection.",
			default: 0.58,
			control: { kind: "number", min: 0.35, max: 0.85, step: 0.05 },
		},
		{
			name: "arc",
			type: "number",
			description: "Vertical cylinder depth in pixels; omitted for a responsive default.",
			default: 64,
			control: { kind: "number", min: 0, max: 120, step: 8 },
		},
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"`default` is one full-width slide with arrows over its edges. `peek` scales and dims neighbours, `flat` keeps them at full size, `inset` floats the dots over the slide, and `showcase` presents large media with pill controls.",
			default: "default",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "loop",
			type: "boolean",
			description: "Arrows and keys wrap from the last slide to the first and back.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description:
				"Control and thumbnail size; for `peek`, `flat` and `showcase` also the slide width, a share of the carousel capped at 260, 340 or 480px.",
			default: "default",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "slideSize",
			type: "string",
			description:
				"Width of one slide as a CSS length; overrides `size`. Use `cqw` for a share of the carousel.",
			control: { kind: "none" },
		},
		{
			name: "index",
			type: "number",
			description:
				"Active slide. Controlled with onIndexChange; bindable in Svelte. `defaultIndex` sets the uncontrolled start.",
			control: { kind: "none" },
		},
		{
			name: "interval",
			type: "number",
			description:
				"Milliseconds per slide while `autoplay` is on; rotation pauses on hover, keyboard focus, drag, off screen and in background tabs.",
			control: { kind: "number", min: 0, max: 10000, step: 500 },
		},
		{
			name: "autoplay",
			type: "boolean",
			description:
				"Starts rotating on mount. Off by default, so motion begins with the viewer.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "labels",
			type: "Partial<CarouselLabels>",
			description:
				"Copy for the groups and buttons: slides, chooseSlide, thumbnails, previous, next.",
			control: { kind: "none" },
		},
		{
			name: "slideLabel",
			type: "(index: number, count: number) => string",
			description: 'Names each slide and its indicator. Defaults to "2 of 5".',
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Slides jump instead of gliding and rotation never starts.",
		behaviour: [
			"The track follows the pointer 1:1 once a press moves 6px horizontally; a vertical move hands the gesture to the page scroll.",
			"Release lands where the flick's momentum would carry the track; any flick faster than 360px/s moves at least one slide.",
			"Past either end the track rubber-bands and springs back on release.",
			"With `peek`, neighbours scale to 0.9 and dim to 50% per step of distance, read every frame from the track position.",
			"Concave and convex projections derive x, y and scale from that same continuous, wrapping track position, so drag, keys, autoplay and controls never fork into a second state model.",
			"The active dot widens from 6px to a 16px pill as the track nears it, and drains left to right while rotation runs. The selected thumbnail scrolls to the centre of its strip.",
		],
	},
	a11y: {
		role: "region",
		keyboard: [
			{
				keys: ["Arrow Left", "Arrow Right"],
				action: "Move to the previous or next slide",
			},
			{ keys: ["Home", "End"], action: "Jump to the first or last slide" },
			{
				keys: ["Tab"],
				action: "Moves from the slides to the indicators, thumbnails and arrows",
			},
		],
		notes: [
			"The root is a region with aria-roledescription carousel; each slide is a labelled tabpanel driven by the indicator tablist.",
			"Off-screen slides are inert, so focus and screen readers stay on the active slide.",
			"Manual moves are announced in a polite live region; rotation stays silent.",
			"Rotation pauses on hover, keyboard focus and drag, and only runs while `autoplay` is true.",
		],
	},
	guidance: {
		when: [
			"A short, ordered set of peers (products, rooms, case studies) where the neighbours hint that there is more.",
			"Galleries browsed by drag, flick, trackpad swipe or keys.",
			"Rotating highlights, provided the viewer can always pause them.",
		],
		whenNot: [
			{ text: "Content everyone must see: most people never reach slide three." },
			{
				text: "A list of logos or tags that should scroll on its own.",
				use: "logo-carousel",
			},
			{
				text: "A labelled list of many items picked from a wheel.",
				use: "wheel-carousel",
			},
		],
		responsive: [
			"Slide width is a share of the carousel's own width (container query units), so it fits a sidebar as well as a full page.",
			"Arrows overlay the slide edges at any width; dots keep a 24px hit area. Thumbnails scroll sideways when they overflow.",
		],
		performance: [
			"Every slide stays mounted; transforms are written straight to the DOM without re-rendering slides.",
			"Rotation stops while the carousel is off screen or the tab is hidden.",
		],
		ai: [
			"Compose Carousel > CarouselContent > CarouselItem, then add CarouselPrevious, CarouselNext, CarouselDots or CarouselThumbs (one CarouselThumb per slide) as siblings of the content; give the Carousel a `label` that names the set.",
			'Use `projection="concave"` or `projection="convex"` for short visual sets; reduce `slideSize` so neighbouring choices remain legible.',
			"Keep slides to roughly three to seven. Past that, a grid with filters serves people better.",
			"Leave `autoplay` off unless the user asked for rotation; drive it from your own state (a toggle, a visibility rule) with `interval` set.",
		],
	},
	licenseOrigin: {
		source: "arc and sv-chanhdai",
		url: "https://uiarc.dev",
		license: "MIT",
		copyright: "Copyright (c) 2026 Elia Kuratli and Sikandar Bhide",
	},
	impl: {
		react: {
			entry: "Carousel",
		},
		svelte: {
			entry: "Carousel",
		},
	},
	keywords: ["carousel", "slider", "gallery", "slides", "swipe"],
});
