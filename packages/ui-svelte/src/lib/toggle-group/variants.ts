import { tv, type VariantProps } from "tailwind-variants";

export const toggleGroupItem = tv({
	base: "inline-flex items-center rounded-lg font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-pressed:bg-foreground/[0.08] aria-pressed:text-foreground disabled:pointer-events-none disabled:opacity-50",
	variants: {
		size: {
			sm: "h-6 px-2 text-[11px]",
			md: "h-7 px-2.5 text-xs",
			lg: "h-9 px-3 text-sm",
			xl: "h-11 px-4 text-base",
		},
	},
	defaultVariants: { size: "md" },
});

export type ToggleGroupSize = NonNullable<VariantProps<typeof toggleGroupItem>["size"]>;
