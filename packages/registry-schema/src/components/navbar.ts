import { defineComponent } from "../index.js";

export const navbar = defineComponent({
	slug: "navbar",
	name: "Navbar",
	description:
		"Production site header with a scroll-aware surface, an active-link indicator that slides, and a mobile sheet.",
	category: "boilerplate",
	status: "beta",

	props: [
		{
			name: "links",
			type: "{ href: string; label: string }[]",
			description: "Primary navigation items, in order.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "active",
			type: "string",
			description: "href of the current page. Drives the sliding indicator.",
			control: { kind: "none" },
		},
		{
			name: "sticky",
			type: "boolean",
			description: "Pin to the top and swap to a blurred surface once scrolled.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "blur",
			type: "boolean",
			description:
				"Use a translucent blurred surface rather than a solid one when scrolled.",
			default: true,
			control: { kind: "boolean" },
		},
	],

	motion: {
		springs: ["snappy"],
		reducedMotion:
			"The indicator jumps between links instead of sliding, and the mobile sheet fades without travel.",
		behaviour: [
			"The header is transparent at the top of the page and gains a border and blurred surface once scrolled past 8px.",
			"The active indicator slides between links under the snappy spring rather than fading out and in.",
			"The indicator is measured from the active link's box, so it tracks font loading and resize.",
			"The mobile sheet slides up from the bottom edge and traps focus while open.",
		],
	},

	a11y: {
		role: "navigation",
		keyboard: [
			"Tab moves through links in DOM order",
			"Escape closes the mobile sheet and returns focus to its trigger",
		],
		notes: [
			"The current page link carries aria-current=page, which is what the indicator reflects.",
			"The sheet sets aria-modal and hides the rest of the page from assistive tech while open.",
		],
	},

	impl: {
		react: {
			entry: "Navbar",
			files: [
				{ path: "navbar/navbar.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Navbar",
			files: [
				{ path: "navbar/navbar.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},

	keywords: ["navbar", "header", "navigation", "saas", "mobile menu"],
});
