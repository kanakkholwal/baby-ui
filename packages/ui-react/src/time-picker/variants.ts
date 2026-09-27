import { tv, type VariantProps } from "tailwind-variants";

export const timePicker = tv({
	slots: {
		root: [
			"inline-flex w-fit items-center gap-0.5 rounded-lg border border-input bg-background px-2 text-sm tabular-nums",
			"transition-[box-shadow,border-color] duration-[var(--duration-press)] ease-[var(--ease-out)] motion-reduce:transition-none",
			"has-[[role=spinbutton]:focus-visible]:border-ring has-[[role=spinbutton]:focus-visible]:ring-2 has-[[role=spinbutton]:focus-visible]:ring-ring",
			"aria-disabled:opacity-50 [&>svg]:me-1 [&>svg]:size-4 [&>svg]:text-muted-foreground",
		],
		segment: [
			"min-w-[2ch] cursor-default select-none rounded px-0.5 text-center outline-none caret-transparent",
			"focus:bg-primary focus:text-primary-foreground data-[empty]:text-muted-foreground",
		],
		separator: "text-muted-foreground",
		period: "ms-1",
	},
	variants: {
		size: {
			sm: { root: "h-8 text-xs" },
			md: { root: "h-9" },
			lg: { root: "h-10" },
		},
	},
	defaultVariants: { size: "md" },
});

export type TimePickerSize = NonNullable<VariantProps<typeof timePicker>["size"]>;
