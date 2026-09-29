import { tv, type VariantProps } from "tailwind-variants";

/** Class contract shared by Calendar and RangeCalendar in both ports. `--cell-size` sets the grid. */
export const calendar = tv({
	slots: {
		root: "group/calendar w-fit rounded-lg bg-background p-3 in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
		months: "relative flex flex-col gap-4 md:flex-row",
		month: "flex w-full flex-col gap-4",
		// The month reads from the start edge, prev/next sit together at the end.
		nav: "absolute end-0 top-0 z-10 flex h-(--cell-size) items-center gap-0.5",
		navButton:
			"size-7 select-none rounded-full p-0 text-muted-foreground hover:text-foreground disabled:opacity-50 aria-disabled:opacity-50 rtl:rotate-180",
		header:
			"flex h-(--cell-size) w-full items-center justify-start gap-1 ps-1.5 pe-16 font-medium text-sm",
		heading: "select-none font-medium text-foreground text-sm",
		grid: "calendar-weeks-in flex w-full border-collapse flex-col",
		gridRow: "flex w-full",
		headCell:
			"flex w-(--cell-size) flex-1 select-none items-center justify-center font-medium text-muted-foreground text-xs",
		cell: "relative size-(--cell-size) flex-1 p-0 text-center text-sm focus-within:z-20",
		// Borderless: a label with a chevron that tints on hover.
		dropdown:
			"relative flex rounded-md transition-colors hover:bg-foreground/[0.06] has-focus-visible:ring-2 has-focus-visible:ring-ring",
		dropdownLabel:
			"flex h-7 select-none items-center gap-1 rounded-md ps-1.5 pe-1 font-medium text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
		// Cells are round and squish on press; today is a soft primary tint, selected a fill.
		day: [
			"flex size-(--cell-size) w-full select-none flex-col items-center justify-center gap-1 whitespace-nowrap rounded-full p-0 font-medium text-sm leading-none tabular-nums",
			"outline-none transition-[color,background-color,scale] [transition-duration:100ms,100ms,250ms] ease-[var(--ease-out)] hover:bg-foreground/[0.06]",
			"active:scale-95 focus-visible:ring-2 focus-visible:ring-ring motion-reduce:active:scale-100",
			"data-[today]:bg-primary/10 data-[today]:text-primary data-[today]:hover:bg-primary/15",
			"data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50",
			"data-[disabled]:pointer-events-none data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
			"data-[unavailable]:text-muted-foreground data-[unavailable]:line-through",
			"data-[selected]:not-data-[range-middle]:bg-primary data-[selected]:not-data-[range-middle]:text-primary-foreground",
			"data-[selected]:not-data-[range-middle]:hover:bg-primary-hover",
			"motion-reduce:transition-none",
		],
		// The range track is a foreground tint: bg-muted equals card and popover, so it would vanish there.
		rangeCell: [
			"[&:has([data-range-middle])]:bg-foreground/[0.06]",
			"[&:has([data-range-start])]:rounded-s-full [&:has([data-range-start])]:bg-foreground/[0.06]",
			"[&:has([data-range-end])]:rounded-e-full [&:has([data-range-end])]:bg-foreground/[0.06]",
			"first:[&:has([data-range-middle])]:rounded-s-full last:[&:has([data-range-middle])]:rounded-e-full",
		],
		rangeDay:
			"data-[range-middle]:rounded-none data-[range-middle]:bg-transparent data-[range-middle]:text-foreground",
	},
	variants: {
		size: {
			sm: { root: "[--cell-size:--spacing(8)]" },
			md: { root: "[--cell-size:--spacing(9)]" },
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
