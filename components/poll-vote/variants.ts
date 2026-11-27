import { tv, type VariantProps } from "tailwind-variants";

export const pollVote = tv({
	slots: {
		root: "flex w-full min-w-0 max-w-xs flex-col gap-2",
		row: "relative isolate flex items-center justify-between gap-3 overflow-hidden rounded-full border px-3 text-start text-sm outline-none transition-[background-color,border-color,scale] duration-(--duration-base) ease-(--ease-ui-out) focus-visible:ring-2 focus-visible:ring-ring/50 motion-reduce:transition-none",
		// A full-width layer scaled from the left to the option's share.
		bar: "-z-10 absolute inset-0 origin-left transition-transform ease-(--ease-ui-out) motion-reduce:transition-none",
		label: "flex min-w-0 items-center gap-2.5",
		text: "truncate",
		// The radio ring: a hairline circle that fills with a pop and draws a check when it is your pick.
		mark: "relative grid size-4 shrink-0 place-items-center rounded-full border transition-colors duration-(--duration-base) ease-(--ease-ui-out) motion-reduce:transition-none",
		markFill: "absolute -inset-px rounded-full bg-primary motion-reduce:transition-none",
		check:
			"relative size-2.5 text-primary-foreground [stroke-dasharray:1] motion-reduce:transition-none",
		percent:
			"shrink-0 transition-[opacity,translate] duration-(--duration-base) ease-(--ease-ui-out) motion-reduce:transition-none",
		total: "px-1 text-muted-foreground text-xs",
	},
	variants: {
		// Row heights are the control ladder's sm, default and lg.
		size: {
			sm: { row: "h-8" },
			default: { row: "h-10" },
			lg: { row: "h-12" },
		},
		// Whether the viewer has answered: rows are inert pills before, bars and shares after.
		voted: {
			true: { bar: "duration-(--duration-slow)", percent: "translate-x-0 opacity-100" },
			false: {
				row: "hover:bg-muted/60",
				bar: "scale-x-0 duration-(--duration-base)",
				percent: "translate-x-1.5 opacity-0",
			},
		},
		mine: {
			true: {
				row: "border-primary/40 font-medium text-foreground",
				bar: "bg-primary/15",
				percent: "text-primary",
				mark: "border-primary",
				markFill:
					"scale-100 opacity-100 transition-[scale,opacity] duration-(--duration-base) ease-(--ease-spring)",
				check:
					"opacity-100 transition-[stroke-dashoffset,opacity] delay-75 duration-(--duration-base) ease-(--ease-ui-out) [stroke-dashoffset:0]",
			},
			false: {
				row: "border-border text-foreground active:scale-[0.98]",
				bar: "bg-muted",
				percent: "text-muted-foreground",
				mark: "border-muted-foreground/40",
				markFill:
					"scale-0 opacity-0 transition-[scale,opacity] duration-(--duration-fast) ease-(--ease-ui-out)",
				check:
					"opacity-0 transition-[stroke-dashoffset,opacity] duration-(--duration-instant) [stroke-dashoffset:1]",
			},
		},
	},
	defaultVariants: { size: "default", voted: false, mine: false },
});

export type PollVoteSize = NonNullable<VariantProps<typeof pollVote>["size"]>;

export type PollOption = {
	/** Unique key for the choice, passed to `onValueChange` on a vote. */
	id: string;
	/** Text on the choice's row. */
	label: string;
	/** Votes before the viewer's; their vote adds 1 to the share. */
	votes: number;
};

export type PollVoteLabels = {
	poll: string;
	/** `{label}` and `{percent}` fill in. */
	percent: string;
	/** `{label}` fills in. */
	voted: string;
	/** `{count}` fills in. */
	votes: string;
};

export const POLL_VOTE_LABELS: PollVoteLabels = {
	poll: "Poll",
	percent: "{label}, {percent}%",
	voted: "You voted for {label}",
	votes: "{count} votes",
};

/** Fills `{name}` placeholders in a label. */
export function fillLabel(template: string, values: Record<string, string | number>) {
	return template.replace(/\{(\w+)\}/g, (match, key: string) =>
		String(values[key] ?? match),
	);
}

/** Each option's share of the votes, 0 to 100, counting the viewer's pick. */
export function pollShare(
	options: readonly PollOption[],
	value: string | null,
	id: string,
) {
	const base = options.reduce((sum, option) => sum + option.votes, 0);
	const total = base + (value === null ? 0 : 1);
	const own = options.find((option) => option.id === id);
	return total === 0 || !own ? 0 : ((own.votes + (id === value ? 1 : 0)) / total) * 100;
}
