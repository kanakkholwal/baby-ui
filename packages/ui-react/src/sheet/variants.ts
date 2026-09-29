import { tv, type VariantProps } from "tailwind-variants";

/** Slides 250ms in, 200ms out; the backdrop fades on the same curve so both finish together. */
export const sheet = tv({
	slots: {
		backdrop: [
			"fixed inset-0 z-50 bg-black/50 opacity-0 backdrop-blur-[2px]",
			"transition-opacity duration-[var(--duration-panel-exit)] ease-[var(--ease-drawer)]",
			"data-[open]:opacity-100 data-[open]:duration-[var(--duration-overlay)]",
			"starting:data-[open]:opacity-0",
			"motion-reduce:transition-none",
		],
		// Only the closed state translates, so the open state needs no competing utility.
		panel: [
			"fixed z-50 flex flex-col gap-4 overflow-y-auto border-border bg-background p-6",
			"transition-transform duration-[var(--duration-overlay)] ease-[var(--ease-drawer)]",
			"data-[closed]:duration-[var(--duration-panel-exit)]",
			"data-[closed]:data-[side=left]:-translate-x-full",
			"data-[closed]:data-[side=right]:translate-x-full",
			"data-[closed]:data-[side=top]:-translate-y-full",
			"data-[closed]:data-[side=bottom]:translate-y-full",
			"starting:data-[open]:data-[side=left]:-translate-x-full",
			"starting:data-[open]:data-[side=right]:translate-x-full",
			"starting:data-[open]:data-[side=top]:-translate-y-full",
			"starting:data-[open]:data-[side=bottom]:translate-y-full",
			"motion-reduce:transition-none",
		],
	},
	variants: {
		side: {
			left: { panel: "inset-y-0 left-0 h-full w-[min(22rem,100vw)] border-r" },
			right: { panel: "inset-y-0 right-0 h-full w-[min(22rem,100vw)] border-l" },
			top: { panel: "inset-x-0 top-0 w-full max-h-[80vh] border-b" },
			bottom: { panel: "inset-x-0 bottom-0 w-full max-h-[80vh] rounded-t-2xl border-t" },
		},
	},
	defaultVariants: { side: "right" },
});

export type SheetSide = NonNullable<VariantProps<typeof sheet>["side"]>;
