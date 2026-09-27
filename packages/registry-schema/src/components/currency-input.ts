import { defineComponent } from "../index";

export const currencyInput = defineComponent({
	slug: "currency-input",
	name: "Currency Input",
	description:
		"Money field that groups and formats by locale and currency as you type, with the value kept in minor units.",
	category: "base",
	status: "beta",
	variants: { size: ["sm", "md", "lg"], affix: ["both", "symbol", "code"] },
	props: [
		{
			name: "value",
			type: "number | null",
			description:
				"Minor units (cents for USD, yen for JPY), so no floating-point drift; null when empty. Bindable in Svelte.",
			control: { kind: "none" },
		},
		{
			name: "currency",
			type: "string",
			description:
				'ISO 4217 code, e.g. "USD". Sets the symbol and how many decimals are allowed.',
			default: "USD",
			control: { kind: "select", options: ["USD", "EUR", "GBP", "JPY", "INR", "KWD"] },
		},
		{
			name: "locale",
			type: "string",
			description:
				"BCP 47 locale for grouping and the decimal mark. Defaults to the browser's.",
			default: "en-US",
			control: { kind: "select", options: ["en-US", "de-DE", "fr-FR", "en-IN", "ja-JP"] },
		},
		{
			name: "min",
			type: "number",
			description:
				"Lower bound in minor units; out-of-range values are flagged with aria-invalid, not clamped.",
			control: { kind: "none" },
		},
		{
			name: "max",
			type: "number",
			description: "Upper bound in minor units.",
			control: { kind: "none" },
		},
		{
			name: "affix",
			type: '"both" | "symbol" | "code"',
			description:
				"Which currency marks show: the symbol before the amount, the code after it, or both.",
			default: "both",
			control: { kind: "select", options: ["both", "symbol", "code"] },
		},
		{
			name: "size",
			type: '"sm" | "md" | "lg"',
			description: "Field height.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg"] },
		},
	],
	a11y: {
		keyboard: [],
		notes: [
			"Uses inputmode=decimal for a number keyboard on phones.",
			"While focused the field keeps a half-typed decimal like 12.; it formats fully on blur.",
			"The symbol is decorative; the currency code stays as visible text.",
		],
	},
	impl: {
		react: {
			entry: "CurrencyInput",
			files: [
				{ path: "currency-input/currency-input.tsx", type: "registry:ui" },
				{ path: "currency-input/core.ts", type: "registry:ui" },
				{ path: "currency-input/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["input-group"],
		},
		svelte: {
			entry: "CurrencyInput",
			files: [
				{ path: "currency-input/currency-input.svelte", type: "registry:ui" },
				{ path: "currency-input/core.ts", type: "registry:ui" },
				{ path: "currency-input/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["input-group"],
		},
	},
	keywords: ["currency", "money", "amount", "price", "intl", "number format"],
});
