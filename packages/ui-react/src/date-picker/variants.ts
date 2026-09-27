import { tv, type VariantProps } from "tailwind-variants";

export const datePicker = tv({
	slots: {
		root: "flex w-full min-w-0 flex-col gap-1.5",
		content: "w-auto p-0",
		icon: "size-4",
	},
	variants: {
		size: {
			sm: { root: "max-w-56" },
			md: { root: "max-w-64" },
			lg: { root: "max-w-72" },
		},
	},
	defaultVariants: { size: "md" },
});

export type DatePickerSize = NonNullable<VariantProps<typeof datePicker>["size"]>;
