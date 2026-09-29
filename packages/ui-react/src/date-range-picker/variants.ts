import { tv, type VariantProps } from "tailwind-variants";
import type { dateField } from "../date-field/variants";

/** The popover's layout; the field itself is DateField's `dateField` contract. */
export const dateRangePicker = tv({
	slots: {
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
});

export type DateRangePickerSize = NonNullable<VariantProps<typeof dateField>["size"]>;
