import { tv, type VariantProps } from "tailwind-variants";

export const diffRow = tv({
	slots: {
		row: "",
		label: "font-medium tabular-nums transition-colors duration-200",
		detail: "transition-colors duration-200",
		mark: "text-white",
	},
	variants: {
		change: {
			removed: {
				row: "bg-destructive/10",
				label: "text-destructive",
				detail: "text-destructive line-through decoration-destructive/50",
				mark: "bg-destructive",
			},
			added: {
				row: "bg-success/10",
				label: "text-success",
				detail: "text-success",
				mark: "bg-success",
			},
		},
	},
	defaultVariants: { change: "removed" },
});

export type DiffRowChange = NonNullable<VariantProps<typeof diffRow>["change"]>;
