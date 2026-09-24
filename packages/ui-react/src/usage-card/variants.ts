import { tv, type VariantProps } from "tailwind-variants";

export const usageCard = tv({
	slots: {
		root: "w-full gap-0 overflow-hidden py-0",
		header: "px-5 pt-4 pb-1",
		title: "font-medium text-foreground text-sm",
		description: "mt-0.5 text-muted-foreground text-xs",
		body: "flex gap-6 px-5 pb-5",
		ring: "w-full shrink-0",
		legend: "min-w-0 flex-1 gap-2.5",
	},
	variants: {
		layout: {
			side: {
				body: "flex-row items-center",
				ring: "max-w-36",
				legend: "flex-col items-start",
			},
			stacked: {
				body: "flex-col items-center",
				ring: "max-w-52",
				legend: "justify-center",
			},
		},
	},
	defaultVariants: { layout: "side" },
});

export type UsageCardLayout = NonNullable<VariantProps<typeof usageCard>["layout"]>;
