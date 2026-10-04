import type { Icon } from "@baby-ui/icons";
import { IconBackground, IconChartBar, IconPhoto } from "@baby-ui/icons";

/** A studio listed on /studio; more join this list as they ship. */
export type Studio = {
	slug: string;
	name: string;
	description: string;
	href: string;
	icon: Icon;
	/** What the /studio card shows live: a component filling it, or a framed demo. */
	preview: { kind: "component" | "demo"; slug: string };
	/** Search copy: the page title, the phrases people search, and what the tool does. */
	seo: {
		title: string;
		description: string;
		keywords: string[];
		features: string[];
		steps: string[];
	};
};

export const STUDIOS: Studio[] = [
	{
		slug: "background",
		name: "Background studio",
		description:
			"Tune any animated background, see it behind real content at hero, card and phone sizes, then copy the code.",
		href: "/studio/background",
		icon: IconBackground,
		preview: { kind: "component", slug: "aurora-flow" },
		seo: {
			title: "Animated background generator for React & Svelte",
			description:
				"Free animated background generator: tune gradient, aurora, WebGL and pattern backgrounds live, preview them behind real content, and copy React or Svelte code.",
			keywords: [
				"animated background generator",
				"gradient background generator",
				"css background generator",
				"aurora background",
				"webgl background",
				"react background component",
				"svelte background component",
				"tailwind background",
			],
			features: [
				"Every animated background in Baby UI, with live thumbnails",
				"Preview behind a hero, content or call-to-action layout",
				"Hero, full-screen, card and phone frames",
				"Remix and shuffle for quick ideas, shareable links",
				"Copy the React or Svelte code with only the props you changed",
			],
			steps: [
				"Pick a background from the scene library.",
				"Tune its colours, speed and shape with the dials.",
				"Check it behind sample content at each size.",
				"Copy the code or share the link.",
			],
		},
	},
	{
		slug: "chart",
		name: "Chart studio",
		description:
			"Every chart in the kit: edit or paste data for eight of them, tune every option on all, and copy the code.",
		href: "/studio/chart",
		icon: IconChartBar,
		preview: { kind: "demo", slug: "area-chart" },
		seo: {
			title: "Chart maker for React & Svelte",
			description:
				"Free online chart maker: paste CSV or edit data for area, line, bar, pie, radar and more, tune every option, and copy accessible React or Svelte chart code.",
			keywords: [
				"chart maker",
				"online chart generator",
				"csv to chart",
				"react chart component",
				"svelte chart component",
				"d3 charts",
				"bar chart generator",
				"line chart generator",
			],
			features: [
				"Area, line, bar, scatter, pie, funnel, ring and radar with editable data",
				"Paste CSV straight from a spreadsheet",
				"Every chart option as a live control",
				"Wide, card and phone frames",
				"Code with your data inline, for React or Svelte",
			],
			steps: [
				"Choose a chart type.",
				"Edit the table or paste CSV.",
				"Tune axes, colours, legend and motion.",
				"Copy the code with your data included.",
			],
		},
	},
	{
		slug: "og",
		name: "OG image studio",
		description:
			"Tune any OG template or build a card from scratch on a free canvas, then download the PNG or copy the code.",
		href: "/studio/og",
		icon: IconPhoto,
		preview: { kind: "demo", slug: "og-blog-post" },
		seo: {
			title: "Free OG image generator: design Open Graph images online",
			description:
				"Free Open Graph image generator: start from 40+ templates or a blank 1200x630 canvas, add text, shapes and images, download the PNG, and copy React or Svelte code.",
			keywords: [
				"og image generator",
				"open graph image generator",
				"social share image maker",
				"twitter card image",
				"og image template",
				"1200x630 image maker",
				"dynamic og image react",
				"svelte og image",
			],
			features: [
				"40+ Open Graph templates with every prop editable",
				"Free canvas: text, shapes, images, snapping, undo",
				"Layouts to start from, including Pro designs",
				"Renders the real 1200x630 PNG in your browser",
				"Copy Tailwind-only React or Svelte code to render on your server",
			],
			steps: [
				"Pick a template, or start a canvas from a layout.",
				"Edit the text, colours, images and layout.",
				"Switch on Rendered PNG to see the exact output.",
				"Download the PNG or copy the code.",
			],
		},
	},
];
