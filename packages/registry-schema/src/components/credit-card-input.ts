import { defineComponent } from "../index.ts";

export const creditCardInput = defineComponent({
	slug: "credit-card-input",
	name: "Credit Card Input",
	description:
		"Card number, expiry and CVC fields that group digits as you type, detect the brand and validate with Luhn.",
	category: "base",
	status: "beta",
	variants: { layout: ["stacked", "inline"], size: ["sm", "md", "lg"] },
	props: [
		{
			name: "value",
			type: "{ number: string; expiry: string; cvc: string }",
			description:
				'Digits only; `expiry` is "MMYY". Bindable in Svelte; pair with `onValueChange` in React.',
			control: { kind: "none" },
		},
		{
			name: "onValueChange",
			type: "(value: CardValue, validity: CardValidity) => void",
			description: "Receives the new value and `{ brand, number, expiry, cvc, valid }`.",
			control: { kind: "none" },
		},
		{
			name: "layout",
			type: '"stacked" | "inline"',
			description:
				"`inline` puts all three fields on one row once the container is wide enough.",
			default: "stacked",
			control: { kind: "select", options: ["stacked", "inline"] },
		},
		{
			name: "size",
			type: '"sm" | "md" | "lg"',
			description: "Field height.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg"] },
		},
		{
			name: "now",
			type: "Date",
			description: "Reference date for the expiry check. Defaults to the current date.",
			control: { kind: "none" },
		},
		{
			name: "labels",
			type: "Partial<CreditCardLabels>",
			description: "Field labels and error messages.",
			control: { kind: "none" },
		},
	],
	a11y: {
		keyboard: ["Backspace over a space or slash deletes the digit before it."],
		notes: [
			"Each field has a visible label; errors use role=alert and are tied to the field with aria-describedby.",
			"Errors wait until the field loses focus, so a half-typed number is never flagged.",
			"The detected brand is announced politely; the badge is our own wordmark, not a network logo.",
			"Autofill works through cc-number, cc-exp and cc-csc, with a numeric keyboard on phones.",
		],
	},
	impl: {
		react: {
			entry: "CreditCardInput",
			files: [
				{ path: "credit-card-input/credit-card-input.tsx", type: "registry:ui" },
				{ path: "credit-card-input/core.ts", type: "registry:ui" },
				{ path: "credit-card-input/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["field", "input", "input-group"],
		},
		svelte: {
			entry: "CreditCardInput",
			files: [
				{ path: "credit-card-input/credit-card-input.svelte", type: "registry:ui" },
				{ path: "credit-card-input/core.ts", type: "registry:ui" },
				{ path: "credit-card-input/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["field", "input", "input-group"],
		},
	},
	keywords: [
		"credit card",
		"payment",
		"card number",
		"checkout",
		"luhn",
		"expiry",
		"cvc",
	],
});
