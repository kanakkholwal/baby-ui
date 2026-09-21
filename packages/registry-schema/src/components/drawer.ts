import { defineComponent } from "../index";

export const drawer = defineComponent({
	slug: "drawer",
	name: "Drawer",
	description:
		"Draggable sheet on vaul, with snap points, an inset surface and the same rim as Dialog.",
	category: "base",
	status: "stable",
	variants: { direction: ["bottom", "top", "left", "right"] },
	props: [
		{
			name: "open",
			type: "boolean",
			description: "Controlled open state. Bindable in Svelte, `onOpenChange` in React.",
			control: { kind: "none" },
		},
		{
			name: "direction",
			type: '"bottom" | "top" | "left" | "right"',
			description: "Edge the drawer slides from. Vertical drawers show a drag handle.",
			default: "bottom",
			control: { kind: "select", options: ["bottom", "top", "left", "right"] },
		},
		{
			name: "dismissible",
			type: "boolean",
			description: "Escape, backdrop click and drag past the threshold close it.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "snapPoints",
			type: "(number | string)[]",
			description:
				"Fractions of the viewport or lengths the drawer rests at while dragging.",
			control: { kind: "none" },
		},
		{
			name: "shouldScaleBackground",
			type: "boolean",
			description:
				"Scale the page behind the drawer, iOS style. Needs `data-vaul-drawer-wrapper` on the page root.",
			default: false,
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "vaul drops the slide and keeps the fade.",
		behaviour: [
			"Slides in over 500ms on cubic-bezier(0.32, 0.72, 0, 1), the same curve as --ease-drawer, and follows the pointer while dragging.",
			"Releasing past the close threshold finishes the slide out; releasing short snaps back or to the nearest snap point.",
		],
	},
	a11y: {
		keyboard: [
			"Escape closes and returns focus to the trigger",
			"Tab stays inside the drawer while it is open",
		],
		notes: [
			"vaul renders a modal dialog with focus trapped inside and the page behind it inert.",
			"The drag handle is decorative; every close path also exists as a button or key.",
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
			entry: "Drawer",
			files: [
				{ path: "drawer/drawer.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "vaul"],
		},
		svelte: {
			entry: "Drawer",
			files: [
				{ path: "drawer/drawer.svelte", type: "registry:ui" },
				{ path: "drawer/drawer-trigger.svelte", type: "registry:ui" },
				{ path: "drawer/drawer-content.svelte", type: "registry:ui" },
				{ path: "drawer/drawer-header.svelte", type: "registry:ui" },
				{ path: "drawer/drawer-footer.svelte", type: "registry:ui" },
				{ path: "drawer/drawer-title.svelte", type: "registry:ui" },
				{ path: "drawer/drawer-description.svelte", type: "registry:ui" },
				{ path: "drawer/drawer-close.svelte", type: "registry:ui" },
				{ path: "drawer/context.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "vaul-svelte@next", "bits-ui"],
		},
	},
	keywords: ["drawer", "sheet", "bottom sheet", "vaul"],
});
