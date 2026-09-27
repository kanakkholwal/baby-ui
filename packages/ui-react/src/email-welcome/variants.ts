import { tv, type VariantProps } from "tailwind-variants";

export const emailWelcome = tv({
	slots: {
		intro: "mt-3",
		steps: "mt-8",
		stepIndex: "w-[40px] align-top",
		stepBadge:
			"m-0 h-[24px] w-[24px] rounded-full border border-border border-solid text-center font-semibold text-[12px] text-muted-foreground leading-[24px] dark:border-border-dark dark:text-muted-foreground-dark",
		stepTitle:
			"m-0 font-semibold text-[15px] text-foreground leading-[24px] dark:text-foreground-dark",
		stepBody:
			"m-0 mb-5 text-[14px] text-muted-foreground leading-[22px] dark:text-muted-foreground-dark",
		action: "mt-3",
		helpLink: "text-foreground underline dark:text-foreground-dark",
	},
	variants: {
		density: {
			comfortable: {},
			compact: { steps: "mt-6", stepBody: "mb-3" },
		},
	},
	defaultVariants: { density: "comfortable" },
});

export type EmailWelcomeDensity = NonNullable<
	VariantProps<typeof emailWelcome>["density"]
>;
