import { tv, type VariantProps } from "tailwind-variants";

export const downloadCard = tv({
	slots: {
		root: "flex min-w-0 flex-col",
		header: "flex items-center gap-3",
		icon: "grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary [&_svg]:size-[1.125rem]",
		text: "min-w-0 flex-1",
		title: "truncate font-medium text-sm",
		detail: "truncate text-muted-foreground text-sm",
		percent: "text-muted-foreground text-sm tabular-nums",
		footer: "flex items-center justify-between gap-3 text-muted-foreground text-sm",
		stats: "min-w-0 truncate tabular-nums",
	},
	variants: {
		// `compact` drops the surface for use inside a card that already names the file.
		variant: {
			default: { root: "gap-3 rounded-2xl bg-card p-4" },
			compact: { root: "gap-2" },
			// The icon wears the progress as a ring that fills clockwise, so the bar can be dropped.
			ring: {
				root: "gap-3 rounded-2xl bg-card p-4",
				icon: "relative size-11 rounded-full bg-transparent [background:conic-gradient(var(--primary)_var(--dl-progress,0%),color-mix(in_oklch,var(--primary)_15%,transparent)_0)] transition-[background] duration-(--duration-base) before:absolute before:inset-[3px] before:rounded-full before:bg-card [&_svg]:relative",
			},
		},
		// A pause at 100% reads as work: the icon breathes while the file is being checked.
		phase: {
			downloading: {},
			checking: { icon: "motion-safe:animate-pulse" },
		},
	},
	defaultVariants: { variant: "default", phase: "downloading" },
});

export type DownloadCardVariant = NonNullable<
	VariantProps<typeof downloadCard>["variant"]
>;
export type DownloadCardPhase = NonNullable<VariantProps<typeof downloadCard>["phase"]>;
