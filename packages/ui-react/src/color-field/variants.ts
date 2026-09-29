import { tv, type VariantProps } from "tailwind-variants";

/** Sizes follow InputGroup; the swatch grows with the field and squishes when pressed. */
export const colorField = tv({
	slots: {
		// Sized to its content, a swatch plus "#RRGGBB", not the InputGroup's full width.
		root: "w-fit",
		trigger:
			"grid place-items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none",
		swatch: [
			"block shrink-0 rounded-md ring-1 ring-foreground/10 ring-inset",
			"transition-[scale,background-color] duration-150 ease-[var(--ease-out)] active:scale-[var(--press-scale-icon)] motion-reduce:transition-none",
		],
		input: "w-[10ch] flex-none font-mono uppercase tabular-nums",
		content: "w-auto border-0 bg-transparent p-0 shadow-2xl",
	},
	variants: {
		size: {
			sm: { swatch: "size-4" },
			md: { swatch: "size-5" },
			lg: { swatch: "size-6" },
		},
	},
	defaultVariants: { size: "md" },
});

export type ColorFieldSize = NonNullable<VariantProps<typeof colorField>["size"]>;
