import { tv, type VariantProps } from "tailwind-variants";

export const ogNewsletterIssue = tv({
	slots: {
		root: "relative flex h-[630px] w-[1200px] flex-col overflow-hidden bg-background p-[88px] font-sans text-foreground",
		masthead: "flex items-center justify-between gap-10",
		brand: "flex min-w-0 items-center gap-4",
		logo: "h-10 w-10 shrink-0 rounded-xl object-cover",
		publication: "line-clamp-1 font-semibold text-[24px] leading-none tracking-tight",
		issue: "line-clamp-1 shrink-0 font-semibold text-[24px] leading-none tabular-nums",
		headline:
			"mt-auto line-clamp-3 font-bold font-heading text-[92px] leading-[1.02] tracking-[-0.035em]",
		inside: "mt-10 flex min-w-0 items-baseline gap-4",
		insideLabel: "shrink-0 font-semibold text-[22px] uppercase tracking-[0.16em]",
		insideText: "line-clamp-1 text-[28px] text-muted-foreground leading-snug",
	},
	variants: {
		mode: {
			light: {},
			dark: { root: "dark" },
		},
		tone: {
			chart: {
				root: "bg-[color-mix(in_oklch,var(--chart-1)_13%,var(--background))]",
				issue: "text-chart-1",
				insideLabel: "text-chart-1",
			},
			primary: {
				root: "bg-[color-mix(in_oklch,var(--foreground)_8%,var(--background))]",
				issue: "text-foreground",
				insideLabel: "text-foreground",
			},
			neutral: {
				issue: "text-muted-foreground",
				insideLabel: "text-muted-foreground",
			},
		},
	},
	defaultVariants: { mode: "light", tone: "chart" },
});

export type OgNewsletterIssueMode = NonNullable<
	VariantProps<typeof ogNewsletterIssue>["mode"]
>;
export type OgNewsletterIssueTone = NonNullable<
	VariantProps<typeof ogNewsletterIssue>["tone"]
>;
