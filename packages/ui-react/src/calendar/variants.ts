import { tv, type VariantProps } from "tailwind-variants";

/** Class contract shared by Calendar and RangeCalendar in both ports. `--cell-size` sets the grid. */
export const calendar = tv({
	slots: {
		root: "group/calendar w-fit rounded-lg bg-background p-3 in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
		months: "relative flex flex-col gap-4 md:flex-row",
		month: "flex w-full flex-col gap-4",
		nav: "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
		navButton:
			"size-(--cell-size) select-none p-0 hover:scale-100 disabled:opacity-50 aria-disabled:opacity-50 rtl:rotate-180",
		header:
			"flex h-(--cell-size) w-full items-center justify-center gap-1.5 px-(--cell-size) font-medium text-sm",
		heading: "select-none font-medium text-sm",
		grid: "flex w-full border-collapse flex-col",
		gridRow: "flex w-full",
		headCell:
			"flex w-(--cell-size) flex-1 select-none items-center justify-center font-normal text-[0.8rem] text-muted-foreground",
		cell: "relative size-(--cell-size) flex-1 p-0 text-center text-sm focus-within:z-20",
		dropdown:
			"relative flex rounded-md border border-input has-focus:border-ring has-focus:ring-2 has-focus:ring-ring/30",
		dropdownLabel:
			"flex h-(--cell-size) select-none items-center gap-1 rounded-md ps-2 pe-1 font-medium text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
		// Selected days fill with primary; today is outlined, not filled, so it never reads as chosen.
		day: [
			"flex size-(--cell-size) w-full select-none flex-col items-center justify-center gap-1 whitespace-nowrap rounded-md p-0 font-normal text-sm leading-none tabular-nums",
			"outline-none transition-colors duration-100 hover:bg-foreground/[0.06]",
			"focus-visible:ring-2 focus-visible:ring-ring",
			"data-[today]:ring-1 data-[today]:ring-border-strong data-[today]:ring-inset",
			"data-[outside-month]:text-muted-foreground",
			"data-[disabled]:pointer-events-none data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
			"data-[unavailable]:text-muted-foreground data-[unavailable]:line-through",
			"data-[selected]:not-data-[range-middle]:bg-primary data-[selected]:not-data-[range-middle]:text-primary-foreground",
			"data-[selected]:not-data-[range-middle]:hover:bg-primary/90",
			"motion-reduce:transition-none",
		],
		// The range track is a foreground tint: bg-muted equals card and popover, so it would vanish there.
		rangeCell: [
			"[&:has([data-range-middle])]:bg-foreground/[0.06]",
			"[&:has([data-range-start])]:rounded-s-md [&:has([data-range-start])]:bg-foreground/[0.06]",
			"[&:has([data-range-end])]:rounded-e-md [&:has([data-range-end])]:bg-foreground/[0.06]",
			"first:[&:has([data-range-middle])]:rounded-s-md last:[&:has([data-range-middle])]:rounded-e-md",
		],
		rangeDay: "data-[range-middle]:rounded-none data-[range-middle]:text-foreground",
	},
	variants: {
		size: {
			sm: { root: "[--cell-size:--spacing(7)]" },
			md: { root: "[--cell-size:--spacing(8)]" },
			lg: { root: "[--cell-size:--spacing(10)]" },
		},
	},
	defaultVariants: { size: "md" },
});

export type CalendarSize = NonNullable<VariantProps<typeof calendar>["size"]>;
export type CalendarCaptionLayout =
	| "label"
	| "dropdown"
	| "dropdown-months"
	| "dropdown-years";
