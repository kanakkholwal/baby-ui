import { tv, type VariantProps } from "tailwind-variants";
import { button } from "../button/variants";
import type { dateField } from "../date-field/variants";

export type TimePickerSize = NonNullable<VariantProps<typeof dateField>["size"]>;

export const timePicker = tv({
	slots: {
		trailing: "ms-auto flex shrink-0 items-center gap-0.5",
		clearButton: [
			button({ variant: "ghost", size: "icon-xs" }),
			"text-muted-foreground hover:text-foreground",
		],
		nowButton: [
			button({ variant: "ghost" }),
			"h-6 rounded-md px-2 font-medium text-[11px] text-muted-foreground hover:text-foreground",
		],
	},
});
