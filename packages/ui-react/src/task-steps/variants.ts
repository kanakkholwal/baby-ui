import { tv, type VariantProps } from "tailwind-variants";

export const taskSteps = tv({
	slots: {
		root: "flex flex-col",
		item: "relative flex",
		connector: "absolute bottom-0 w-px",
		marker:
			"relative z-10 grid shrink-0 place-items-center rounded-full border bg-background",
		icon: "",
		dot: "rounded-full bg-current",
		text: "min-w-0 flex-1",
		label: "",
	},
	variants: {
		size: {
			sm: {
				item: "gap-2",
				connector: "top-5 left-[0.5625rem]",
				marker: "size-4.5",
				icon: "size-2.5",
				dot: "size-1",
				text: "text-xs leading-[1.125rem]",
			},
			md: {
				item: "gap-3",
				connector: "top-6 left-[0.6875rem]",
				marker: "size-5.5",
				icon: "size-3",
				dot: "size-1.5",
				text: "text-sm",
			},
		},
		compact: {
			true: { item: "py-1" },
			false: { item: "py-1.5" },
		},
		status: {
			pending: {
				connector: "bg-border",
				marker: "border-border text-muted-foreground",
				label: "text-muted-foreground",
			},
			active: {
				connector: "bg-border",
				marker: "border-primary text-primary",
				label: "text-foreground",
			},
			done: {
				connector: "bg-[var(--success)]",
				marker: "border-[var(--success)] text-[var(--success)]",
				label: "text-foreground line-through decoration-muted-foreground/40",
			},
			failed: {
				connector: "bg-border",
				marker: "border-[var(--destructive)] text-[var(--destructive)]",
				label: "text-foreground",
			},
		},
	},
	defaultVariants: { size: "md", compact: false, status: "pending" },
});

export type TaskStepsSize = NonNullable<VariantProps<typeof taskSteps>["size"]>;
export type TaskStatus = NonNullable<VariantProps<typeof taskSteps>["status"]>;

/** Screen-reader status words; override per language with `labels`. */
export const TASK_STEP_LABELS: Record<TaskStatus, string> = {
	pending: "Pending",
	active: "In progress",
	done: "Done",
	failed: "Failed",
};
