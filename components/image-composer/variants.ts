import { tv, type VariantProps } from "tailwind-variants";

export const imageComposer = tv({
	slots: {
		root: "w-full",
		// A small outline of the shape, always 1rem tall; the ratio sets its width.
		outline: "h-4 shrink-0 rounded-[3px] border-[1.5px] border-current",
		label: "max-sm:sr-only",
		tools: "ms-auto flex items-center gap-2",
	},
	variants: {
		// `docked` is the card that sits at the bottom of a page; `inline` has no surface of its own.
		variant: {
			docked: { root: "rounded-2xl bg-card p-2" },
			inline: {},
		},
	},
	defaultVariants: { variant: "docked" },
});

export type ImageComposerVariant = NonNullable<
	VariantProps<typeof imageComposer>["variant"]
>;
