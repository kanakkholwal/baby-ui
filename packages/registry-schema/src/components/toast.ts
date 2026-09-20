import { defineComponent } from "../index";

export const toast = defineComponent({
	slug: "toast",
	name: "Toast",
	description: "Stacked notifications in a live region, dismissible and tone-aware.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "position",
			type: '"bottom-right" | "bottom-center" | "top-right"',
			description: "Corner the stack grows from.",
			default: "bottom-right",
			control: {
				kind: "select",
				options: ["bottom-right", "bottom-center", "top-right"],
			},
		},
		{
			name: "variant",
			type: '"soft" | "solid" | "outline"',
			description: "Surface treatment.",
			default: "soft",
			control: { kind: "select", options: ["soft", "solid", "outline"] },
		},
		{
			name: "max",
			type: "number",
			description: "How many toasts render at once. The rest wait their turn.",
			default: 4,
			control: { kind: "number", min: 1, max: 8, step: 1 },
		},
		{
			name: "toasts",
			type: "ToastItem[]",
			description: "Active notifications. Owned by the caller so dismissal is explicit.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Toasts appear without the rise.",
		behaviour: [
			"A new toast fades and rises 8px over 280ms.",
			"Removal is immediate, so the stack closes up without a gap that invites a mis-click.",
		],
	},
	a11y: {
		keyboard: ["Each toast's dismiss button is reachable by Tab"],
		notes: [
			"The container is aria-live=polite, so a new toast is announced without interrupting.",
			"Toasts are pointer-events-none as a container and auto only on each card, so the stack never blocks clicks on the page behind it.",
			"Nothing auto-dismisses here. A timer that removes content is hostile to anyone reading slowly; the caller decides.",
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
			entry: "Toast",
			files: [
				{ path: "toast/toast.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Toast",
			files: [
				{ path: "toast/toast.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["toast"],
});
