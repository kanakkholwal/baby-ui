import { tv, type VariantProps } from "tailwind-variants";

export const emailPasswordReset = tv({
	slots: {
		prompt: "",
		action: "mt-8",
		reassurance: "mt-4",
	},
	variants: {
		design: {
			classic: {},
			// A tinted hero panel, a centred prompt, a full-width button and a footer band.
			hero: {
				prompt:
					"m-0 mt-10 text-center font-semibold text-[20px] text-foreground leading-[28px] dark:text-foreground-dark",
				action: "mt-6",
				reassurance: "mt-6 text-center",
			},
		},
	},
	defaultVariants: { design: "classic" },
});

export type EmailPasswordResetDesign = NonNullable<
	VariantProps<typeof emailPasswordReset>["design"]
>;
