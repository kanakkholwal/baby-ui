import { tv, type VariantProps } from "tailwind-variants";

export const textFlip = tv({
	slots: {
		root: "inline-flex items-center gap-[0.3em] font-semibold",
		label: "text-foreground leading-[1.2em]",
		window: "h-[1.2em] overflow-hidden text-primary",
		stack:
			"block translate-y-[calc(var(--flip-step,0)*-1.2em)] transition-[translate] duration-(--duration-overlay) ease-(--ease-out) data-snap:transition-none motion-reduce:transition-none",
		word: "block h-[1.2em] whitespace-nowrap leading-[1.2em]",
		srOnly: "sr-only",
	},
	variants: {
		size: {
			sm: { root: "text-lg" },
			md: { root: "text-2xl" },
			lg: { root: "text-3xl" },
		},
	},
	defaultVariants: { size: "lg" },
});

export type TextFlipSize = NonNullable<VariantProps<typeof textFlip>["size"]>;

/** Stack offset for a move from `from` to `to`; wrapping to 0 rolls onto the duplicate first word. */
export function flipStep(from: number, to: number, count: number): number {
	return count > 1 && to === 0 && from === count - 1 ? count : to;
}
