import { tv, type VariantProps } from "tailwind-variants";

export const streamingText = tv({
	slots: {
		root: "flex w-full flex-col",
		text: "text-foreground text-sm leading-relaxed",
	},
	variants: {
		layout: {
			inline: { root: "" },
			card: { root: "rounded-xl border border-border bg-card p-4" },
		},
	},
	defaultVariants: { layout: "inline" },
});

export type StreamingTextLayout = NonNullable<
	VariantProps<typeof streamingText>["layout"]
>;
