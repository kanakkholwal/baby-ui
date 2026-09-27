import { tv, type VariantProps } from "tailwind-variants";

export const dateRangePicker = tv({
	slots: {
		trigger: [
			"inline-flex w-full min-w-0 items-center gap-2 rounded-lg border border-input bg-background px-3 text-left text-sm",
			"outline-none transition-[box-shadow,border-color] duration-[var(--duration-press)] ease-[var(--ease-out)]",
			"focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
			"data-[placeholder]:text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
		],
		value: "min-w-0 flex-1 truncate tabular-nums",
		content: "flex w-auto max-w-[calc(100vw-2rem)] flex-col p-0 sm:flex-row",
		rail: "flex min-w-0 gap-1 overflow-x-auto border-border border-b p-2 sm:w-36 sm:flex-col sm:overflow-visible sm:border-e sm:border-b-0",
		preset: [
			"shrink-0 whitespace-nowrap rounded-md px-2.5 py-1.5 text-left text-muted-foreground text-sm outline-none",
			"transition-colors duration-100 hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
			"aria-pressed:bg-foreground/[0.06] aria-pressed:text-foreground motion-reduce:transition-none",
		],
		main: "flex min-w-0 flex-col",
		footer: "flex justify-end gap-2 border-border border-t p-2",
	},
	variants: {
		size: {
			sm: { trigger: "h-8 text-xs" },
			md: { trigger: "h-9" },
			lg: { trigger: "h-10" },
		},
	},
	defaultVariants: { size: "md" },
});

export type DateRangePickerSize = NonNullable<
	VariantProps<typeof dateRangePicker>["size"]
>;
