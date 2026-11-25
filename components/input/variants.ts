import { tv, type VariantProps } from "tailwind-variants";
import { controlSize, fieldFrame, fieldHalo, fieldText } from "../lib/control";

export const input = tv({
	base: [fieldFrame(), "w-full min-w-0 placeholder:text-muted-foreground"],
	variants: {
		size: {
			sm: [controlSize({ size: "sm" }), fieldText({ size: "sm" }), "px-2.5"],
			default: [controlSize({ size: "default" }), fieldText({ size: "default" }), "px-3"],
			lg: [controlSize({ size: "lg" }), fieldText({ size: "lg" }), "px-3.5"],
			xl: [controlSize({ size: "xl" }), fieldText({ size: "xl" }), "px-4"],
		},
		/** `outline`: focus shows as a crisp 2px edge; `ring`: a 1px edge plus a soft halo. */
		variant: { outline: "", ring: fieldHalo() },
	},
	defaultVariants: { size: "default", variant: "outline" },
});

export type InputSize = NonNullable<VariantProps<typeof input>["size"]>;
export type InputVariant = NonNullable<VariantProps<typeof input>["variant"]>;
