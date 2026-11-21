import { tv, type VariantProps } from "tailwind-variants";

export const liveTranscript = tv({
	slots: {
		root: "flex min-w-0 flex-col gap-3",
		body: [
			"max-h-40 overflow-y-auto text-pretty text-sm leading-6 [scrollbar-width:none]",
			// Older lines fade out at the top once the text outgrows the box.
			"data-[overflowing]:[mask-image:linear-gradient(to_bottom,transparent,#000_1.5rem)]",
		],
		committed: "text-foreground",
		tentative:
			"text-muted-foreground transition-colors duration-(--duration-base) motion-reduce:transition-none",
		placeholder: "text-muted-foreground",
		status: "flex items-center gap-2 text-muted-foreground text-sm",
		dot: "size-1.5 shrink-0 rounded-full bg-current motion-safe:animate-pulse",
		notice: "flex items-start gap-2 rounded-xl px-3 py-2 text-pretty text-sm",
	},
	variants: {
		variant: {
			card: { root: "rounded-2xl bg-card p-4" },
			plain: {},
		},
		tone: {
			info: { notice: "bg-info/10 text-info-strong" },
			warning: { notice: "bg-warning/10 text-warning-strong" },
			destructive: { notice: "bg-destructive/10 text-destructive-strong" },
		},
	},
	defaultVariants: { variant: "card", tone: "info" },
});

export type LiveTranscriptVariant = NonNullable<
	VariantProps<typeof liveTranscript>["variant"]
>;
export type LiveTranscriptTone = NonNullable<VariantProps<typeof liveTranscript>["tone"]>;
