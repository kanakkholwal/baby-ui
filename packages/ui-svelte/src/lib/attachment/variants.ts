import { tv, type VariantProps } from "tailwind-variants";

export const attachment = tv({
	slots: {
		root: "flex w-full items-center gap-3 rounded-xl border border-border bg-card p-2.5",
		meta: "mt-0.5 text-xs text-muted-foreground",
	},
	variants: {
		status: {
			uploading: {},
			ready: {},
			error: {
				root: "border-[color-mix(in_oklch,var(--destructive)_35%,transparent)]",
				meta: "text-destructive",
			},
		},
	},
	defaultVariants: { status: "ready" },
});

export type AttachmentStatus = NonNullable<VariantProps<typeof attachment>["status"]>;
