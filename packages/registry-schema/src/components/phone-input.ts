import { defineComponent } from "../index.ts";

export const phoneInput = defineComponent({
	slug: "phone-input",
	name: "Phone Input",
	description:
		"Phone number field with a searchable country picker, per-country grouping as you type and an E.164 value.",
	category: "base",
	status: "beta",
	variants: { size: ["sm", "md", "lg"] },
	props: [
		{
			name: "value",
			type: "string",
			description:
				'E.164, e.g. "+14155552671"; empty while nothing is typed. Bindable in Svelte; pair with `onValueChange` in React.',
			control: { kind: "none" },
		},
		{
			name: "country",
			type: "string",
			description:
				"ISO 3166 alpha-2 code, kept apart from the value because some dial codes are shared (+1 is the US and Canada).",
			default: "US",
			control: {
				kind: "select",
				options: ["US", "GB", "IN", "DE", "FR", "JP", "BR", "AU"],
			},
		},
		{
			name: "countries",
			type: "PhoneCountry[]",
			description:
				'Regions offered, each `{ iso, name, dial, pattern }` where "#" in `pattern` is a digit. Defaults to 22 common ones.',
			control: { kind: "none" },
		},
		{
			name: "size",
			type: '"sm" | "md" | "lg"',
			description: "Field height.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg"] },
		},
		{
			name: "labels",
			type: "Partial<PhoneLabels>",
			description: "Picker and field wording.",
			control: { kind: "none" },
		},
	],
	a11y: {
		keyboard: [
			"Enter or Space on the picker button opens the country list.",
			"Arrow keys move through countries; typing filters by name or dial code.",
		],
		notes: [
			"The picker button names the current country and dial code; flags are decorative.",
			"Choosing a country returns focus to the number field.",
			"Pasting a full international number keeps only the national part for the chosen country.",
		],
	},
	impl: {
		react: {
			entry: "PhoneInput",
			files: [
				{ path: "phone-input/phone-input.tsx", type: "registry:ui" },
				{ path: "phone-input/core.ts", type: "registry:ui" },
				{ path: "phone-input/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["combobox", "command", "input"],
		},
		svelte: {
			entry: "PhoneInput",
			files: [
				{ path: "phone-input/phone-input.svelte", type: "registry:ui" },
				{ path: "phone-input/core.ts", type: "registry:ui" },
				{ path: "phone-input/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["combobox", "command", "input"],
		},
	},
	keywords: ["phone", "telephone", "country code", "e164", "international", "form"],
});
