import { tv, type VariantProps } from "tailwind-variants";

export const artGallery = tv({
	slots: {
		root: "relative isolate h-96 w-full cursor-grab touch-none select-none overflow-hidden rounded-xl border-border bg-background text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing",
		canvas:
			"absolute inset-0 size-full transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
		status: "absolute inset-0 grid place-items-center",
		hint: "pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-muted-foreground/70 uppercase tracking-[0.2em]",
		fallback:
			"grid h-full auto-rows-max grid-cols-2 gap-3 overflow-auto p-3 sm:grid-cols-3",
		fallbackImage: "aspect-square w-full rounded-md object-cover",
		fallbackCaption: "mt-1 flex justify-between gap-2 font-mono text-[10px] uppercase",
	},
	variants: {
		lens: {
			flat: {},
			barrel: {},
		},
	},
	defaultVariants: { lens: "barrel" },
});

export type ArtGalleryLens = NonNullable<VariantProps<typeof artGallery>["lens"]>;

/** Barrel distortion strength per lens, fed to the shader. */
export const LENS_STRENGTH: Record<ArtGalleryLens, number> = { flat: 0, barrel: 0.08 };
