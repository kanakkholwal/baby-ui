import { defineComponent } from "../index";

export const breadcrumb = defineComponent({
	slug: "breadcrumb",
	name: "Breadcrumb",
	description:
		"Trail of ancestor links that collapses the middle when it runs out of room.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "items",
			type: "{ href?: string; label: string }[]",
			description: "Trail, root first. The last item is the current page.",
			control: { kind: "none" },
		},
		{
			name: "maxVisible",
			type: "number",
			description: "Items shown before the middle collapses behind an ellipsis.",
			default: 4,
			control: { kind: "number", min: 2, max: 8, step: 1 },
		},
	],
	a11y: {
		keyboard: [],
		notes: [
			"A nav labelled Breadcrumb wrapping an ordered list, so the order is conveyed rather than implied by the separators.",
			"The last item is aria-current=page and is not a link, because it goes nowhere.",
			"Separators are aria-hidden; they are punctuation, not content.",
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
			entry: "Breadcrumb",
			files: [
				{ path: "breadcrumb/breadcrumb.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Breadcrumb",
			files: [
				{ path: "breadcrumb/breadcrumb.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["breadcrumb", "navigation", "trail"],
});
