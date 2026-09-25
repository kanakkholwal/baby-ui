import { tv, type VariantProps } from "tailwind-variants";

// Closed state is `data-closed` in Base UI and `data-state=closed` in bits-ui; both are listed
// so this file stays byte-identical across ports.
export const fullscreenNav = tv({
	slots: {
		popup: [
			"fixed inset-0 z-50 flex flex-col bg-background outline-none",
			"transition-[opacity,visibility,translate] duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
			"starting:opacity-0 data-[closed]:invisible data-[closed]:opacity-0 data-[closed]:duration-[var(--duration-exit)]",
			"data-[state=closed]:invisible data-[state=closed]:opacity-0 data-[state=closed]:duration-[var(--duration-exit)]",
			"motion-reduce:transition-[opacity,visibility]",
		],
		header: "flex h-14 items-center justify-between px-4 md:px-6",
		title: "font-semibold text-foreground text-sm",
		close:
			"grid size-9 place-items-center rounded-2xl border border-border text-muted-foreground transition-colors hover:text-foreground",
		nav: "flex flex-1 flex-col justify-center gap-2 px-6 pb-20",
		// Each link cascades on an inline delay, driven by its own `data-state`.
		link: [
			"font-heading font-semibold text-4xl text-foreground tracking-tight hover:text-muted-foreground sm:text-5xl",
			"transition-[opacity,translate] duration-[var(--duration-drawer)] ease-[var(--ease-out)]",
			"starting:translate-y-[0.3em] starting:opacity-0",
			"data-[state=closed]:translate-y-[0.3em] data-[state=closed]:opacity-0 data-[state=closed]:delay-0 data-[state=closed]:duration-[var(--duration-exit)]",
			"motion-reduce:transition-opacity motion-reduce:starting:translate-y-0 motion-reduce:data-[state=closed]:translate-y-0",
		],
	},
	variants: {
		/** Fade dissolves the panel in place; slide drops it from the top edge and lifts it back. */
		variant: {
			fade: {},
			slide: {
				popup: [
					"duration-[var(--duration-drawer)] ease-[var(--ease-drawer)]",
					"starting:-translate-y-full data-[closed]:-translate-y-full data-[state=closed]:-translate-y-full",
					"motion-reduce:starting:translate-y-0 motion-reduce:data-[closed]:translate-y-0 motion-reduce:data-[state=closed]:translate-y-0",
				],
			},
		},
	},
	defaultVariants: { variant: "fade" },
});

export type FullscreenNavVariant = NonNullable<
	VariantProps<typeof fullscreenNav>["variant"]
>;
