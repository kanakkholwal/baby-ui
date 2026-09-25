import { defineComponent } from "../index";

const BKLIT = {
	source: "bklit-ui",
	url: "https://github.com/bklit/bklit-ui",
	license: "MIT",
	copyright: "Copyright (c) 2026 uixmat",
};

export const statCard = defineComponent({
	slug: "stat-card",
	name: "Stat Card",
	description:
		"A KPI card whose headline, caption and trend follow the point under the chart.",
	category: "blocks",
	status: "stable",
	props: [
		{
			name: "data",
			type: "Record<string, unknown>[]",
			description: "Rows with a date under xKey and a number under dataKey.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "value",
			type: "number",
			description: "Headline at rest, e.g. the period average.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "trend",
			type: "number",
			description:
				"Change over the period in percent. Hovering shows the change from the previous row.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "chart",
			type: '"area" | "line"',
			description: "Chart under the headline.",
			default: "area",
			control: { kind: "select", options: ["area", "line"] },
		},
		{
			name: "size",
			type: '"sm" | "md" | "lg"',
			description: "Chart height.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg"] },
		},
		{
			name: "activeIndex",
			type: "number | null",
			description:
				"The row driving the headline. Controlled with onActiveIndexChange; bindable in Svelte.",
			control: { kind: "none" },
		},
		{
			name: "formatValue",
			type: "(value: number) => string",
			description: "Headline format, e.g. currency. Defaults to locale integers.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The headline swaps without counting; the chart settles instantly.",
		behaviour: [
			"The headline counts to the hovered value over 400ms and back to the resting value when the pointer leaves.",
			"The chart keeps the area or line chart's own reveal and hover motion.",
		],
	},
	a11y: {
		keyboard: ["Inherits the chart plot's keyboard model"],
		notes: [
			"The trend badge pairs its colour with an arrow and a signed percentage, so direction never rests on colour alone.",
		],
	},
	licenseOrigin: BKLIT,
	impl: {
		react: {
			entry: "StatCard",
			files: [
				{ path: "stat-card/stat-card.tsx", type: "registry:ui" },
				{ path: "stat-card/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: [
				"chart",
				"area-chart",
				"line-chart",
				"card",
				"badge",
				"counter",
			],
		},
		svelte: {
			entry: "StatCard",
			files: [
				{ path: "stat-card/stat-card.svelte", type: "registry:ui" },
				{ path: "stat-card/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: [
				"chart",
				"area-chart",
				"line-chart",
				"card",
				"badge",
				"counter",
			],
		},
	},
	keywords: ["stat", "kpi", "metric", "card", "dashboard"],
});

export const statCardMap = defineComponent({
	slug: "stat-card-map",
	name: "Stat Card Map",
	description:
		"A KPI card over a choropleth; the headline follows the region under the pointer.",
	category: "blocks",
	status: "stable",
	props: [
		{
			name: "geo",
			type: "FeatureCollection",
			description: "Boundaries to draw. Bring your own; nothing is fetched.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "values",
			type: "Record<string, number>",
			description: "Value per feature key.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "trends",
			type: "Record<string, number>",
			description:
				"Optional change per feature key; the card trend shows when a region has none.",
			control: { kind: "none" },
		},
		{
			name: "projection",
			type: '"equalEarth" | "naturalEarth" | "mercator"',
			description: "Map projection.",
			default: "equalEarth",
			control: { kind: "select", options: ["equalEarth", "naturalEarth", "mercator"] },
		},
		{
			name: "size",
			type: '"sm" | "md" | "lg"',
			description: "Map height.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg"] },
		},
		{
			name: "activeIndex",
			type: "number | null",
			description:
				"The region driving the headline. Controlled with onActiveIndexChange; bindable in Svelte.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The headline swaps without counting; the map settles instantly.",
		behaviour: [
			"The headline counts to the hovered region's value over 400ms and back when the pointer leaves.",
		],
	},
	a11y: {
		keyboard: ["Inherits the choropleth's keyboard model"],
		notes: ["The trend badge pairs its colour with an arrow and a signed percentage."],
	},
	licenseOrigin: BKLIT,
	impl: {
		react: {
			entry: "StatCardMap",
			files: [
				{ path: "stat-card-map/stat-card-map.tsx", type: "registry:ui" },
				{ path: "stat-card-map/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["chart", "choropleth-chart", "card", "badge", "counter"],
		},
		svelte: {
			entry: "StatCardMap",
			files: [
				{ path: "stat-card-map/stat-card-map.svelte", type: "registry:ui" },
				{ path: "stat-card-map/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["chart", "choropleth-chart", "card", "badge", "counter"],
		},
	},
	keywords: ["stat", "kpi", "map", "choropleth", "card"],
});
