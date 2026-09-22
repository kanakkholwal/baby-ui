import { tv, type VariantProps } from "tailwind-variants";

export const taskRows = tv({
	slots: {
		root: "flex w-full flex-col",
		item: "self-stretch overflow-hidden transition-[border-radius,background-color] duration-300 hover:bg-muted",
	},
	variants: {
		variant: {
			capsules: { root: "gap-2", item: "rounded-2xl bg-card shadow-xs" },
			list: {
				root: "gap-0 self-start overflow-hidden rounded-2xl bg-card shadow-xs",
				item: "border-border border-b last:border-0",
			},
		},
	},
	defaultVariants: { variant: "capsules" },
});

export type TaskRowsVariant = NonNullable<VariantProps<typeof taskRows>["variant"]>;
