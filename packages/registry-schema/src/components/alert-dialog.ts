import { defineComponent } from "../index";

export const alertDialog = defineComponent({
	slug: "alert-dialog",
	name: "Alert Dialog",
	description:
		"Blocking confirmation with the safe action focused and the destructive one styled.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "open",
			type: "boolean",
			description: "Whether the dialog is shown. Bindable.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "title",
			type: "string",
			description: "What is about to happen.",
			default: "Delete this project?",
			control: { kind: "text" },
		},
		{
			name: "description",
			type: "string",
			description: "The consequence, stated plainly.",
			default: "This removes every deployment and cannot be undone.",
			control: { kind: "text" },
		},
		{
			name: "confirmLabel",
			type: "string",
			description: "Label for the confirming action.",
			default: "Delete",
			control: { kind: "text" },
		},
		{
			name: "destructive",
			type: "boolean",
			description: "Style the confirm action as destructive.",
			default: true,
			control: { kind: "boolean" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The panel appears at full size.",
		behaviour: [
			"Same entry as the modal, because it is the same surface with a narrower job.",
		],
	},
	a11y: {
		role: "alertdialog",
		keyboard: ["Escape cancels", "Focus starts on the cancel button"],
		notes: [
			"role=alertdialog, so assistive tech announces it as an interruption rather than a passive dialog.",
			"Focus lands on cancel, never on the destructive action. A confirmation that focuses Delete turns a reflexive Enter into data loss.",
			"aria-describedby points at the consequence, so it is read with the title.",
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
			entry: "AlertDialog",
			files: [
				{ path: "alert-dialog/alert-dialog.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "AlertDialog",
			files: [
				{ path: "alert-dialog/alert-dialog.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["alert", "dialog"],
});
