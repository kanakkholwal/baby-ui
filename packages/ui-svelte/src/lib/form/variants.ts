import { tv, type VariantProps } from "tailwind-variants";

export const form = tv({
	slots: {
		item: "flex flex-col gap-2",
		label:
			"data-[fs-error]:text-[color-mix(in_oklch,var(--destructive)_75%,var(--foreground))]",
		legend:
			"font-medium text-foreground text-sm leading-none data-[fs-error]:text-[color-mix(in_oklch,var(--destructive)_75%,var(--foreground))]",
		description: "text-muted-foreground text-sm",
		errors:
			"font-medium text-[color-mix(in_oklch,var(--destructive)_75%,var(--foreground))] text-sm",
	},
	variants: {
		spacing: {
			compact: { item: "gap-1.5" },
			comfortable: { item: "gap-2" },
		},
	},
	defaultVariants: { spacing: "comfortable" },
});

export type FormSpacing = NonNullable<VariantProps<typeof form>["spacing"]>;
