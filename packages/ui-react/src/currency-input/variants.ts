import { tv, type VariantProps } from "tailwind-variants";

export const currencyInput = tv({
	slots: {
		root: "w-full min-w-0",
		control: "text-right font-mono tabular-nums",
		symbol: "min-w-4 text-foreground",
		code: "font-mono text-xs uppercase",
	},
	variants: {
		size: { sm: {}, md: {}, lg: {} },
		// Which currency marks show: the symbol before the amount, the code after it, or both.
		affix: { symbol: {}, code: {}, both: {} },
	},
	defaultVariants: { size: "md", affix: "both" },
});

export type CurrencyInputSize = NonNullable<VariantProps<typeof currencyInput>["size"]>;
export type CurrencyInputAffix = NonNullable<VariantProps<typeof currencyInput>["affix"]>;
