import { tv, type VariantProps } from "tailwind-variants";

export const thinkingState = tv({
	slots: {
		row: "flex min-h-7 w-full items-center gap-2 rounded-md px-1.5 py-0.5 text-left",
		label: "min-w-0 truncate text-xs",
	},
	variants: {
		variant: {
			steps: { label: "font-medium text-foreground" },
			reasoning: {
				label: "whitespace-normal font-normal text-muted-foreground leading-relaxed",
			},
			search: { label: "font-medium text-foreground" },
			coding: { label: "font-medium text-foreground" },
		},
	},
	defaultVariants: { variant: "steps" },
});

export type ThinkingStateVariant = NonNullable<
	VariantProps<typeof thinkingState>["variant"]
>;
