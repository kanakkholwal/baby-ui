import { defineComponent } from "../index";

const BKLIT = {
	source: "bklit-ui",
	url: "https://github.com/bklit/bklit-ui",
	license: "MIT",
	copyright: "Copyright (c) 2026 uixmat",
};

export const chart = defineComponent({
	slug: "chart",
	name: "Chart",
	description:
		"Chart base: container, config, grid, axes, tooltip and legend on d3 and SVG, shared by every chart.",
	category: "charts",
	status: "alpha",
	props: [
		{
			name: "config",
			type: "ChartConfig",
			description:
				"Series labels and colours, keyed by data key. Same shape as shadcn's.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "aspect",
			type: '"video" | "wide" | "square" | "auto"',
			description: "Container aspect ratio. `auto` fills a parent with its own height.",
			default: "video",
			control: { kind: "select", options: ["video", "wide", "square", "auto"] },
		},
		{
			name: "locale",
			type: "string",
			description: "BCP 47 locale for dates and numbers. Defaults to the reader's own.",
			default: "auto",
			control: { kind: "select", options: ["auto", "en-GB", "de-DE", "ja-JP", "ar-EG"] },
		},
		{
			name: "title",
			type: "string",
			description: "Accessible name; also the caption of the screen-reader data table.",
			default: "Chart",
			control: { kind: "none" },
		},
		{
			name: "description",
			type: "string",
			description: "Replaces the generated screen-reader summary.",
			control: { kind: "none" },
		},
		{
			name: "hiddenSeries",
			type: "string[]",
			description:
				"Series switched off in the legend. Controlled with onHiddenSeriesChange; bindable in Svelte.",
			control: { kind: "none" },
		},
		{
			name: "indicator",
			type: '"dot" | "line" | "dashed"',
			description: "ChartTooltipContent: series marker beside each row.",
			default: "dot",
			control: { kind: "select", options: ["dot", "line", "dashed"] },
		},
		{
			name: "datePill",
			type: "boolean",
			description: "ChartTooltip: date ticker that rolls under the crosshair.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "variant",
			type: '"dashed" | "dotted" | "solid"',
			description: "CartesianGrid: line pattern.",
			default: "dashed",
			control: { kind: "select", options: ["dashed", "dotted", "solid"] },
		},
		{
			name: "align",
			type: '"start" | "center" | "end"',
			description: "ChartLegendContent alignment.",
			default: "center",
			control: { kind: "select", options: ["start", "center", "end"] },
		},
		{
			name: "status",
			type: '"loading" | "ready"',
			description:
				"On the chart root. Ready to loading conceals the series and retweens the grid; back replays the reveal.",
			default: "ready",
			control: { kind: "select", options: ["ready", "loading"] },
		},
		{
			name: "activeIndex",
			type: "number | null",
			description:
				"On the chart root: the datum under the pointer or keyboard. Controlled with onActiveIndexChange; bindable in Svelte.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"Reveal, domain tweens and morphs settle on their end state at once; crosshair, dots and panel jump instead of springing.",
		behaviour: [
			"Series reveal left to right through a clip over 1100ms on cubic-bezier(0.85, 0, 0.15, 1); the next phase starts when the clip finishes, not on a timer.",
			"Data and visibility changes tween the y-domain over 500ms on the same curve; moves under 2% of the span snap.",
			"Crosshair and dots follow on a 300/30 spring, the panel on 100/20, and the panel enters at scale 0.85 with a 20px slide on a 300/25 spring.",
			"The date pill rolls its month and day stacks on a 400/35 spring.",
			"Keyboard moves jump instead of springing.",
		],
	},
	a11y: {
		role: "group",
		keyboard: [
			"Tab focuses the plot",
			"Arrow Left and Right move between data points",
			"Page Up and Page Down move a tenth of the data",
			"Home and End jump to the first and last point",
			"Escape clears the active point",
		],
		notes: [
			"The plot is a focusable group with aria-roledescription, named by title and described by a generated summary.",
			"Every chart ships a visually hidden data table, and keyboard moves announce the active point in a polite live region.",
			"Legend entries are real toggles (aria-pressed), so hiding a series works from the keyboard and colour is never the only cue.",
		],
	},
	licenseOrigin: BKLIT,
	impl: {
		react: {
			entry: "ChartContainer",
			files: [
				{ path: "chart/chart.tsx", type: "registry:ui" },
				{ path: "chart/time-series.tsx", type: "registry:ui" },
				{ path: "chart/axes.tsx", type: "registry:ui" },
				{ path: "chart/tooltip.tsx", type: "registry:ui" },
				{ path: "chart/core.ts", type: "registry:ui" },
				{ path: "chart/motion.ts", type: "registry:ui" },
				{ path: "chart/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: [
				"clsx",
				"tailwind-merge",
				"tailwind-variants",
				"d3-array",
				"d3-scale",
				"d3-shape",
			],
			registryDependencies: ["toggle"],
		},
		svelte: {
			entry: "ChartContainer",
			files: [
				{ path: "chart/chart-container.svelte", type: "registry:ui" },
				{ path: "chart/chart-style.svelte", type: "registry:ui" },
				{ path: "chart/chart-legend.svelte", type: "registry:ui" },
				{ path: "chart/chart-legend-content.svelte", type: "registry:ui" },
				{ path: "chart/time-series-chart.svelte", type: "registry:ui" },
				{ path: "chart/cartesian-grid.svelte", type: "registry:ui" },
				{ path: "chart/x-axis.svelte", type: "registry:ui" },
				{ path: "chart/y-axis.svelte", type: "registry:ui" },
				{ path: "chart/chart-tooltip.svelte", type: "registry:ui" },
				{ path: "chart/chart-tooltip-dot.svelte", type: "registry:ui" },
				{ path: "chart/chart-tooltip-layer.svelte", type: "registry:ui" },
				{ path: "chart/chart-tooltip-content.svelte", type: "registry:ui" },
				{ path: "chart/context.ts", type: "registry:ui" },
				{ path: "chart/follow.svelte.ts", type: "registry:ui" },
				{ path: "chart/core.ts", type: "registry:ui" },
				{ path: "chart/motion.ts", type: "registry:ui" },
				{ path: "chart/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: [
				"clsx",
				"tailwind-merge",
				"tailwind-variants",
				"d3-array",
				"d3-scale",
				"d3-shape",
			],
			registryDependencies: ["toggle"],
		},
	},
	keywords: ["chart", "graph", "data", "visualization", "tooltip", "legend", "axis"],
});

export const lineChart = defineComponent({
	slug: "line-chart",
	name: "Line Chart",
	description:
		"Time series as lines that reveal, morph on new data and dim around the pointer.",
	category: "charts",
	status: "alpha",
	props: [
		{
			name: "data",
			type: "Record<string, unknown>[]",
			description: "Rows with a date under xKey and one number per series.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "curve",
			type: '"natural" | "monotone" | "linear" | "step"',
			description: "Line: interpolation between points.",
			default: "natural",
			control: { kind: "select", options: ["natural", "monotone", "linear", "step"] },
		},
		{
			name: "variant",
			type: '"solid" | "dashed"',
			description: "Line: stroke pattern.",
			default: "solid",
			control: { kind: "select", options: ["solid", "dashed"] },
		},
		{
			name: "strokeWidth",
			type: "number",
			description: "Line: stroke width in pixels.",
			default: 2.5,
			control: { kind: "number", min: 1, max: 6, step: 0.5 },
		},
		{
			name: "fadeEdges",
			type: 'boolean | "left" | "right"',
			description: "Line: fade the stroke into the plot edges.",
			default: "both",
			control: { kind: "select", options: ["both", "left", "right", "none"] },
		},
		{
			name: "status",
			type: '"loading" | "ready"',
			description:
				"Loading conceals the lines and retweens the grid; ready replays the reveal.",
			default: "ready",
			control: { kind: "select", options: ["ready", "loading"] },
		},
		{
			name: "xKey",
			type: "string",
			description: "Key holding each row's date.",
			default: "date",
			control: { kind: "none" },
		},
		{
			name: "animate",
			type: "boolean",
			description: "Turn off every chart animation, not just under reduced motion.",
			default: true,
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Lines appear in place and new data swaps without a morph.",
		behaviour: [
			"New data morphs the line over 500ms on cubic-bezier(0.85, 0, 0.15, 1), point by point by date; new points grow out of their neighbour.",
			"While the pointer is on the plot every line dims to 30% over 400ms; hovering a legend entry dims the others the same way.",
		],
	},
	a11y: {
		keyboard: ["Inherits the chart plot's keyboard model"],
		notes: [
			"Each Line registers its series, so the summary, table and live region list it.",
		],
	},
	licenseOrigin: BKLIT,
	impl: {
		react: {
			entry: "LineChart",
			files: [
				{ path: "line-chart/line-chart.tsx", type: "registry:ui" },
				{ path: "line-chart/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants", "d3-shape"],
			registryDependencies: ["chart"],
		},
		svelte: {
			entry: "LineChart",
			files: [
				{ path: "line-chart/line-chart.svelte", type: "registry:ui" },
				{ path: "line-chart/line.svelte", type: "registry:ui" },
				{ path: "line-chart/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants", "d3-shape"],
			registryDependencies: ["chart"],
		},
	},
	keywords: ["line", "chart", "time series", "trend"],
});
