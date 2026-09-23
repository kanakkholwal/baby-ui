import { tv, type VariantProps } from "tailwind-variants";

export const tool = tv({
	slots: {
		root: "overflow-hidden rounded-xl border border-border bg-card/40",
		icon: "grid size-4 shrink-0 place-items-center",
		label: "shrink-0 text-[11px]",
	},
	variants: {
		status: {
			pending: { icon: "text-muted-foreground", label: "text-muted-foreground" },
			running: { icon: "text-primary", label: "text-primary" },
			done: { icon: "text-success", label: "text-success" },
			error: { icon: "text-destructive", label: "text-destructive" },
		},
	},
	defaultVariants: { status: "running" },
});

export type ToolState = NonNullable<VariantProps<typeof tool>["status"]>;
