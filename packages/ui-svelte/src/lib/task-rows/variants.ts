import { tv, type VariantProps } from "tailwind-variants";

export const taskRows = tv({
	slots: {
		root: "flex w-full flex-col",
		item: "self-stretch overflow-hidden transition-[border-radius,background-color] duration-300 hover:bg-muted",
		statusDot:
			"pop-in flex size-5.5 shrink-0 items-center justify-center rounded-full text-white",
	},
	variants: {
		variant: {
			capsules: { root: "gap-2", item: "rounded-2xl bg-card shadow-xs" },
			list: {
				root: "gap-0 self-start overflow-hidden rounded-2xl bg-card shadow-xs",
				item: "border-border border-b last:border-0",
			},
		},
		tone: {
			destructive: { statusDot: "bg-destructive" },
			success: { statusDot: "bg-success" },
		},
	},
	defaultVariants: { variant: "capsules", tone: "success" },
});

export type TaskRowsVariant = NonNullable<VariantProps<typeof taskRows>["variant"]>;
export type TaskRowsTone = NonNullable<VariantProps<typeof taskRows>["tone"]>;
