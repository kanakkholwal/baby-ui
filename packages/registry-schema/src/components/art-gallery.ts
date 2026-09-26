import { defineComponent } from "../index";

export const artGallery = defineComponent({
	slug: "art-gallery",
	name: "Art Gallery",
	description:
		"An endless grid of framed images seen through a lens; drag to pan and it pulls back while you move.",
	category: "advanced",
	status: "stable",
	variants: { lens: ["flat", "barrel"] },
	props: [
		{
			name: "items",
			type: "ArtGalleryItem[]",
			description:
				"src, title, optional caption and alt. Tiles repeat endlessly; remote images need CORS headers.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "lens",
			type: '"flat" | "barrel"',
			description:
				"`barrel` bulges the centre and fades the edges; `flat` is a plain grid.",
			default: "barrel",
			control: { kind: "select", options: ["flat", "barrel"] },
		},
		{
			name: "cellSize",
			type: "number",
			description: "Cell size in world units; the view is 2 units tall.",
			default: 0.75,
			control: { kind: "number", min: 0.4, max: 1.5, step: 0.05 },
		},
		{
			name: "dragZoom",
			type: "number",
			description: "How far the view pulls back while dragging; 1 disables it.",
			default: 1.25,
			control: { kind: "number", min: 1, max: 2, step: 0.05 },
		},
		{
			name: "showHint",
			type: "boolean",
			description: "Show the drag hint.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "labels",
			type: "Partial<ArtGalleryLabels>",
			description: "label (accessible name), hint and loading text.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Panning is immediate and the view never pulls back.",
		behaviour: [
			"Dragging pans the grid 1:1 with the pointer; the view eases after it and pulls back to `dragZoom` while the pointer is down.",
			"Arrow keys pan by one cell. It draws only while something is moving, so an idle gallery costs nothing.",
			"Colours come from the theme: background, grid lines and captions repaint when light or dark changes.",
			"Without WebGL it falls back to a plain scrolling grid of the same images.",
		],
	},
	a11y: {
		keyboard: ["Tab focuses the gallery", "Arrow keys pan by one cell"],
		notes: [
			'A labelled region with aria-roledescription="gallery" and a visually hidden list of every title.',
			"aria-busy is set while the images load.",
		],
	},
	impl: {
		react: {
			entry: "ArtGallery",
			files: [
				{ path: "art-gallery/art-gallery.tsx", type: "registry:ui" },
				{ path: "art-gallery/gallery.ts", type: "registry:ui" },
				{ path: "art-gallery/labels.ts", type: "registry:ui" },
				{ path: "art-gallery/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["spinner"],
		},
		svelte: {
			entry: "ArtGallery",
			files: [
				{ path: "art-gallery/art-gallery.svelte", type: "registry:ui" },
				{ path: "art-gallery/gallery.ts", type: "registry:ui" },
				{ path: "art-gallery/labels.ts", type: "registry:ui" },
				{ path: "art-gallery/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["spinner"],
		},
	},
	keywords: [
		"gallery",
		"webgl",
		"grid",
		"drag",
		"lens",
		"images",
		"portfolio",
		"infinite",
	],
});
