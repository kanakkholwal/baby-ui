import { defineComponent } from "../index";

const SIZES = ["sm", "md", "lg"];

export const sidebarNav = defineComponent({
	slug: "sidebar-nav",
	name: "Sidebar Nav",
	description:
		"A collapsible workspace sidebar: switcher, primary nav, searchable recents, and a footer action.",
	category: "advanced",
	status: "stable",
	variants: { size: SIZES },
	props: [
		{
			name: "workspace",
			type: "SidebarWorkspace",
			description: "The current workspace's name and monogram.",
			control: { kind: "none" },
		},
		{
			name: "navItems",
			type: "SidebarNavItem[]",
			description: 'Primary nav rows shown under "New chat".',
			control: { kind: "none" },
		},
		{
			name: "recents",
			type: "SidebarRecent[]",
			description: "The searchable recent-chats list.",
			control: { kind: "none" },
		},
		{
			name: "workspaceActions",
			type: "SidebarWorkspaceAction[]",
			description:
				"Extra actions in the workspace switcher's menu, below the workspace itself.",
			control: { kind: "none" },
		},
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description: "Expanded width.",
			default: "md",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "collapsed",
			type: "boolean",
			description:
				"Whether the sidebar is collapsed to its icon rail. Two-way bindable in Svelte.",
			default: false,
			control: { kind: "boolean" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The collapse width transition and every label's fade/slide both drop to an instant change.",
		behaviour: [
			"Collapsing keeps every icon's x-position fixed; only the labels fade and slide out, so nothing reflows.",
			"Hovering a nav or recents row glides a highlight to it, measured from the row's own layout rather than a fixed track.",
		],
	},
	a11y: {
		keyboard: [
			"Tab reaches the workspace switcher, every nav row, search and the footer action",
		],
		notes: [
			"Collapsed controls are `aria-hidden` and removed from the tab order rather than left focusable but invisible.",
			"The workspace switcher composes the real DropdownMenu, so its own keyboard and focus handling isn't reimplemented here.",
		],
	},
	licenseOrigin: {
		source: "beUI",
		url: "https://beui.dev",
		license: "MIT",
		copyright: "Copyright (c) 2026 beUI",
	},
	impl: {
		react: {
			entry: "SidebarNav",
			files: [
				{ path: "sidebar-nav/sidebar-nav.tsx", type: "registry:ui" },
				{ path: "sidebar-nav/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["dropdown-menu"],
		},
		svelte: {
			entry: "SidebarNav",
			files: [
				{ path: "sidebar-nav/sidebar-nav.svelte", type: "registry:ui" },
				{ path: "sidebar-nav/types.ts", type: "registry:ui" },
				{ path: "sidebar-nav/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["dropdown-menu"],
		},
	},
	keywords: ["sidebar", "navigation", "workspace", "chat"],
});
