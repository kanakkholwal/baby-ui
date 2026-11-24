import { tv, type VariantProps } from "tailwind-variants";

export const typography = tv({
	variants: {
		variant: {
			h1: "font-heading text-4xl font-semibold tracking-tight",
			h2: "font-heading text-3xl font-semibold tracking-tight",
			h3: "font-heading text-2xl font-semibold tracking-tight",
			h4: "font-heading text-xl font-semibold tracking-tight",
			h5: "font-heading text-lg font-semibold tracking-tight",
			h6: "font-heading text-base font-semibold tracking-tight",
			body: "text-base leading-7",
			"body-sm": "text-sm leading-6",
			"body-xs": "text-xs leading-5",
			lead: "text-lg text-muted-foreground leading-relaxed",
			small: "text-sm leading-6",
			muted: "text-sm leading-6 text-muted-foreground",
			code: "rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm",
		},
	},
	defaultVariants: { variant: "body" },
});

export type TypographyVariant = NonNullable<VariantProps<typeof typography>["variant"]>;

/** Default tag per variant; overridden by the `as` prop. */
export const TYPOGRAPHY_TAG: Record<TypographyVariant, string> = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
	body: "p",
	"body-sm": "p",
	"body-xs": "p",
	lead: "p",
	small: "p",
	muted: "p",
	code: "code",
};
