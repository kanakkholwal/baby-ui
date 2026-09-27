import { tv, type VariantProps } from "tailwind-variants";

export const creditCardInput = tv({
	slots: {
		root: "grid w-full min-w-0 gap-4",
		row: "grid grid-cols-2 gap-4",
		number: "font-mono tabular-nums tracking-wide",
		short: "font-mono tabular-nums",
		mark: [
			"inline-flex h-5 min-w-9 items-center justify-center rounded-[5px] border border-border px-1",
			"font-semibold text-[9px] text-foreground tracking-wider transition-opacity duration-[var(--duration-press)] ease-[var(--ease-out)] motion-reduce:transition-none",
		],
	},
	variants: {
		layout: {
			stacked: {},
			// One row once the container is wide enough; stacks below that.
			inline: {
				root: "@container @lg:grid-cols-[minmax(0,1fr)_minmax(0,7rem)_minmax(0,6rem)]",
				row: "@lg:contents",
			},
		},
	},
	defaultVariants: { layout: "stacked" },
});

export type CreditCardInputLayout = NonNullable<
	VariantProps<typeof creditCardInput>["layout"]
>;
