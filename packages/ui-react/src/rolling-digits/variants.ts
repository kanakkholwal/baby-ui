import { tv, type VariantProps } from "tailwind-variants";

export const rollingDigits = tv({
	slots: {
		root: "inline-flex items-center tabular-nums",
		cells: "inline-flex items-center gap-0.5",
		cell: "inline-grid grid-cols-[1fr]",
		clip: "min-w-0 overflow-hidden",
		digit:
			"relative isolate grid min-h-[1em] min-w-[1ch] place-items-center overflow-hidden leading-none [&>*]:col-start-1 [&>*]:row-start-1",
		glyph: "[backface-visibility:hidden]",
		srOnly: "sr-only",
	},
	variants: {
		direction: {
			dynamic: {},
			up: {},
			down: {},
		},
		size: {
			inherit: {},
			sm: { root: "text-2xl" },
			md: { root: "text-4xl" },
			lg: { root: "text-6xl" },
		},
	},
	defaultVariants: { direction: "dynamic", size: "inherit" },
});

export type RollingDigitsDirection = NonNullable<
	VariantProps<typeof rollingDigits>["direction"]
>;
export type RollingDigitsSize = NonNullable<VariantProps<typeof rollingDigits>["size"]>;
