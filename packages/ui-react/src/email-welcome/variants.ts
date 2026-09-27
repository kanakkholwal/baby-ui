import { tv, type VariantProps } from "tailwind-variants";

export const emailWelcome = tv({
	slots: {
		heroImage: "mb-8 w-full rounded-lg",
		eyebrow:
			"m-0 mb-3 font-semibold text-[13px] text-muted-foreground leading-[20px] dark:text-muted-foreground-dark",
		intro: "mt-3",
		steps: "mt-8",
		stepIndex: "w-[40px] align-top",
		stepBadge:
			"m-0 h-[26px] w-[26px] rounded-full bg-accent-soft text-center font-semibold text-[13px] text-foreground leading-[26px] dark:bg-accent-soft-dark dark:text-foreground-dark",
		stepTitle:
			"m-0 font-semibold text-[15px] text-foreground leading-[24px] dark:text-foreground-dark",
		stepBody:
			"m-0 mb-5 text-[14px] text-muted-foreground leading-[22px] dark:text-muted-foreground-dark",
		action: "mt-3",
		helpLink: "text-foreground underline dark:text-foreground-dark",
	},
	variants: {
		design: {
			classic: {},
			// Barebones-style: separate cards on the page, a centred opening card with a hero image.
			stacked: {
				eyebrow: "text-center",
				intro: "text-center",
				steps: "mt-6",
				action: "mt-8 text-center",
			},
		},
		density: {
			comfortable: {},
			compact: { steps: "mt-6", stepBody: "mb-3" },
		},
	},
	defaultVariants: { design: "classic", density: "comfortable" },
});

export type EmailWelcomeDesign = NonNullable<VariantProps<typeof emailWelcome>["design"]>;
export type EmailWelcomeDensity = NonNullable<
	VariantProps<typeof emailWelcome>["density"]
>;
