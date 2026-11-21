import { tv, type VariantProps } from "tailwind-variants";
import type { BadgeVariant } from "../badge/variants";

export const transcriptRow = tv({
	slots: {
		root: "flex min-w-0 flex-col gap-2.5 transition-colors duration-(--duration-fast) ease-(--ease-ui-out) motion-reduce:transition-none",
		header: "flex items-center justify-between gap-3",
		title: "min-w-0 truncate font-medium",
		actions: "flex shrink-0 items-center gap-1.5",
		text: "text-pretty text-sm leading-6",
		error: "text-destructive-strong text-sm",
	},
	variants: {
		variant: {
			card: { root: "rounded-2xl bg-card p-4 hover:bg-muted/60" },
			plain: {},
		},
		// Which stage a file job is in; history rows have none. The badge and actions follow it.
		status: {
			queued: {},
			running: {},
			done: {},
			failed: {},
		},
		// Clamps long transcripts in a list; the full text is one click away.
		clamp: {
			true: { text: "line-clamp-3" },
			false: {},
		},
	},
	defaultVariants: { variant: "card", clamp: false },
});

export type TranscriptRowVariant = NonNullable<
	VariantProps<typeof transcriptRow>["variant"]
>;

export type TranscriptRowStatus = NonNullable<
	VariantProps<typeof transcriptRow>["status"]
>;

/** The badge each job status wears; `variant` is a Badge variant. */
export const STATUS_BADGE: Record<
	TranscriptRowStatus,
	{ label: string; variant: BadgeVariant }
> = {
	queued: { label: "Waiting", variant: "secondary" },
	running: { label: "Transcribing", variant: "info" },
	done: { label: "Done", variant: "success" },
	failed: { label: "Failed", variant: "destructive" },
};
