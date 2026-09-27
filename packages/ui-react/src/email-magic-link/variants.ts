import { tv, type VariantProps } from "tailwind-variants";

export const emailMagicLink = tv({
	slots: {
		intro: "mt-3",
		codeLabel:
			"m-0 mb-3 text-center font-semibold text-[13px] text-foreground leading-[20px] dark:text-foreground-dark",
		expiry: "mt-4",
	},
	variants: {
		design: {
			classic: {},
			// Centred, with the code in an accent panel as the hero of the email.
			spotlight: { intro: "text-center", expiry: "text-center" },
		},
	},
	defaultVariants: { design: "classic" },
});

export type EmailMagicLinkDesign = NonNullable<
	VariantProps<typeof emailMagicLink>["design"]
>;
