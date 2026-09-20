import { defineComponent } from "../index";

export const question = defineComponent({
	slug: "question",
	name: "Question",
	description: "Inline clarifying question with single or multiple choice answers.",
	category: "agents",
	status: "beta",
	props: [
		{
			name: "question",
			type: "string",
			description: "What is being asked.",
			default: "Which runtime should this target?",
			control: { kind: "text" },
		},
		{
			name: "options",
			type: "QuestionOption[]",
			description: "Available answers.",
			control: { kind: "none" },
		},
		{
			name: "multiple",
			type: "boolean",
			description: "Allow more than one answer, with an explicit submit.",
			default: false,
			control: { kind: "boolean" },
		},
	],
	a11y: {
		keyboard: ["Tab reaches each option", "Enter and Space select"],
		notes: [
			"Answering is announced through a live region, so the state change is not silent.",
			"Once answered, unchosen options are disabled rather than removed, so the question still reads as a question afterwards.",
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
			entry: "Question",
			files: [
				{ path: "question/question.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Question",
			files: [
				{ path: "question/question.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["question"],
});
