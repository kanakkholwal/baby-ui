import { tv, type VariantProps } from "tailwind-variants";

export const middleTruncation = tv({
	// text-ellipsis covers the frame before the first measure, and any subpixel rounding after it.
	base: "block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap",
	variants: {
		variant: {
			default: "",
			code: "font-mono text-sm tabular-nums",
		},
	},
	defaultVariants: { variant: "default" },
});

export type MiddleTruncationVariant = NonNullable<
	VariantProps<typeof middleTruncation>["variant"]
>;
