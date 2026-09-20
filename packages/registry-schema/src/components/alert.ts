import { defineComponent } from "../index";

export const alert = defineComponent({
	slug: "alert",
	name: "Alert",
	description:
		"Inline message composed from Alert, AlertTitle and AlertDescription, with an optional dismiss.",
	category: "base",
	status: "stable",
	variants: { variant: ["info", "success", "warning", "destructive"] },
	props: [
		{
			name: "variant",
			type: '"info" | "success" | "warning" | "destructive"',
			description: "Semantic colour and the role the alert announces with.",
			default: "info",
			control: { kind: "select", options: ["info", "success", "warning", "destructive"] },
		},
		{
			name: "dismissible",
			type: "boolean",
			description: "Show a close button.",
			default: false,
			control: { kind: "boolean" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The alert appears without travel.",
		behaviour: [
			"On mount the alert fades and slides 4px into place over 200ms.",
			"Dismissing is immediate: an alert the user has already read should not hold the layout open.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"destructive and warning render with role=alert so they interrupt; info and success use role=status so they do not.",
			"The icon is aria-hidden; the variant meaning lives in the text.",
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
			entry: "Alert",
			files: [
				{ path: "alert/alert.tsx", type: "registry:ui" },
				{ path: "alert/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "Alert",
			files: [
				{ path: "alert/alert.svelte", type: "registry:ui" },
				{ path: "alert/alert-title.svelte", type: "registry:ui" },
				{ path: "alert/alert-description.svelte", type: "registry:ui" },
				{ path: "alert/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["alert", "callout", "banner", "notice"],
});
