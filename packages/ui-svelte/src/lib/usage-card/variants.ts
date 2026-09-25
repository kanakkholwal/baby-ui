import { tv, type VariantProps } from "tailwind-variants";

export const usageCard = tv({
	slots: {
		root: "w-full gap-0 overflow-hidden py-0",
		header: "px-5 pt-4 pb-1",
		title: "font-medium text-foreground text-sm",
		description: "mt-0.5 text-muted-foreground text-xs",
		body: "px-5 pb-5",
		// Overrides ChartContainer's own root: flex-direction only, so its flex-1/aspect sizing
		// chain to RingChart's plot stays intact (a wrapper div around RingChart breaks it).
		chart: "",
		// aspect-square is self-sizing from width alone, so RingChart renders even if the flex
		// row above never resolves a height.
		plot: "aspect-square shrink-0",
		legend: "min-w-0 flex-1 gap-2.5",
	},
	variants: {
		layout: {
			side: {
				chart: "flex-row items-center",
				plot: "max-w-36",
				legend: "flex-col items-start",
			},
			stacked: {
				chart: "flex-col items-center",
				plot: "mx-auto max-w-52",
				legend: "justify-center",
			},
		},
	},
	defaultVariants: { layout: "side" },
});

export type UsageCardLayout = NonNullable<VariantProps<typeof usageCard>["layout"]>;
