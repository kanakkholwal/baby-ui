import { tv, type VariantProps } from "tailwind-variants";

export const emailVerify = tv({
	slots: {
		subheading: "mt-2 text-center",
		intro: "mt-3",
		action: "mt-8",
		fallback: "mt-6",
		notice: "mt-10",
		helpList: "mt-3",
	},
	variants: {
		design: {
			classic: {},
			// Parkadler-style: centred header, title and button, a security panel and a help block.
			centered: { intro: "mt-8", action: "text-center" },
		},
	},
	defaultVariants: { design: "classic" },
});

export type EmailVerifyDesign = NonNullable<VariantProps<typeof emailVerify>["design"]>;
