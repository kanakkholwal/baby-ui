import { defineComponent } from "../index";

export const breadcrumb = defineComponent({
	slug: "breadcrumb",
	name: "Breadcrumb",
	description:
		"Trail to the current page that collapses its middle when it runs out of room.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "collapsed",
			type: "boolean",
			description:
				"Demo only: whether the middle of the trail is replaced with BreadcrumbEllipsis.",
			default: true,
			control: { kind: "boolean" },
		},
	],
	a11y: {
		keyboard: [],
		notes: [
			"A nav labelled Breadcrumb wrapping an ordered list, so the order is conveyed rather than implied by the separators.",
			"The last item is aria-current=page and is not a link, because it goes nowhere.",
			"Separators are aria-hidden; they are punctuation, not content.",
			"Part names and data-slot values match shadcn/ui, so this replaces an existing breadcrumb without touching call sites.",
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
				{ path: "breadcrumb/breadcrumb-list.svelte", type: "registry:ui" },
				{ path: "breadcrumb/breadcrumb-item.svelte", type: "registry:ui" },
				{ path: "breadcrumb/breadcrumb-link.svelte", type: "registry:ui" },
				{ path: "breadcrumb/breadcrumb-page.svelte", type: "registry:ui" },
				{ path: "breadcrumb/breadcrumb-separator.svelte", type: "registry:ui" },
				{ path: "breadcrumb/breadcrumb-ellipsis.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["breadcrumb", "navigation", "trail"],
});
