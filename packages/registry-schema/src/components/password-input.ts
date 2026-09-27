import { defineComponent } from "../index.ts";

export const passwordInput = defineComponent({
	slug: "password-input",
	name: "Password Input",
	description:
		"Password field with a show/hide toggle, a Caps Lock warning and an optional strength meter and rules checklist.",
	category: "base",
	status: "beta",
	variants: { size: ["sm", "md", "lg"], feedback: ["both", "meter", "checklist"] },
	props: [
		{
			name: "value",
			type: "string",
			description:
				"The password. Bindable in Svelte; pair with `onValueChange` in React.",
			control: { kind: "none" },
		},
		{
			name: "rules",
			type: "PasswordRule[]",
			description:
				"`{ id, label, test(value) }` entries that drive the meter and checklist. Omit for a sign-in field. `defaultPasswordRules()` returns a common set.",
			control: { kind: "none" },
		},
		{
			name: "feedback",
			type: '"both" | "meter" | "checklist"',
			description: "Which strength feedback shows when `rules` are given.",
			default: "both",
			control: { kind: "select", options: ["both", "meter", "checklist"] },
		},
		{
			name: "size",
			type: '"sm" | "md" | "lg"',
			description: "Field height.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg"] },
		},
		{
			name: "autocomplete",
			type: "string",
			description:
				'Defaults to "new-password" when `rules` are given, otherwise "current-password", so password managers offer the right action.',
			control: { kind: "none" },
		},
		{
			name: "labels",
			type: "Partial<PasswordLabels>",
			description: "Toggle, Caps Lock and strength wording.",
			control: { kind: "none" },
		},
	],
	a11y: {
		keyboard: ["Tab moves between the field and the show/hide toggle."],
		notes: [
			"The toggle is a real button with aria-pressed and a label that says what it will do.",
			"The strength level is announced politely as it changes; each rule reads as met or not met.",
			"The Caps Lock warning only shows while the field has focus.",
		],
	},
	impl: {
		react: {
			entry: "PasswordInput",
			files: [
				{ path: "password-input/password-input.tsx", type: "registry:ui" },
				{ path: "password-input/core.ts", type: "registry:ui" },
				{ path: "password-input/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["input-group"],
		},
		svelte: {
			entry: "PasswordInput",
			files: [
				{ path: "password-input/password-input.svelte", type: "registry:ui" },
				{ path: "password-input/core.ts", type: "registry:ui" },
				{ path: "password-input/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["input-group"],
		},
	},
	keywords: [
		"password",
		"show password",
		"strength meter",
		"caps lock",
		"sign up",
		"form",
	],
});
