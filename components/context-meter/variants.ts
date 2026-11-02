import { tv, type VariantProps } from "tailwind-variants";

export const contextMeter = tv({
	slots: {
		root: "group/meter w-full text-sm",
		header: "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3",
		icon: "row-span-2 grid size-8 shrink-0 place-items-center text-muted-foreground [&_svg]:size-4",
		title: "col-start-2 m-0 truncate font-medium text-base text-foreground",
		subtitle: "col-start-2 m-0 truncate text-muted-foreground text-xs",
		percent:
			"col-start-3 row-span-2 row-start-1 shrink-0 font-medium text-2xl text-foreground tabular-nums tracking-tight transition-colors duration-(--duration-base) group-data-[warn]/meter:text-warning-strong group-data-[compact]/meter:text-destructive-strong",
		body: "flex flex-col",
		summary: "flex items-baseline justify-between gap-3 px-5 pt-4",
		used: "font-medium font-mono text-base text-foreground tabular-nums",
		of: "text-muted-foreground text-xs",
		left: "font-mono text-muted-foreground text-xs tabular-nums",
		bar: "relative mx-5 mt-1 mb-2 flex h-6 items-center gap-1",
		segment: [
			// A 24px hit row; the 8px bar is drawn by ::after in the segment colour.
			"relative block h-full min-w-1 cursor-default rounded-full border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-ring",
			"after:absolute after:inset-x-0 after:top-1/2 after:h-2 after:-translate-y-1/2 after:rounded-full after:bg-(--segment) after:content-[''] hover:brightness-110 active:scale-y-[var(--press-scale)]",
			"transition-[width,opacity,scale,filter] duration-(--duration-slow) ease-(--ease-ui-out) motion-reduce:transition-none",
			// Chart-style focus: one source lights up, the rest step back.
			"group-data-[active]/meter:opacity-30 data-[active]:opacity-100",
		],
		track: "h-2 min-w-0 flex-1 rounded-full bg-muted",
		threshold: "absolute top-1 bottom-1 w-px bg-foreground/50",
		list: "m-0 flex list-none flex-col border-border border-t p-0 py-1.5",
		row: "flex min-h-11 items-center gap-3 px-5 transition-opacity duration-(--duration-fast) ease-(--ease-ui-out) group-data-[active]/meter:opacity-45 data-[active]:opacity-100 motion-reduce:transition-none",
		dot: "size-2 shrink-0 rounded-full",
		label: "min-w-0 truncate text-foreground",
		detail: "min-w-0 flex-1 truncate text-muted-foreground text-xs",
		value: "w-14 shrink-0 text-end font-mono text-muted-foreground text-xs tabular-nums",
		trailing: "flex w-20 shrink-0 justify-end",
		pinned:
			"inline-flex items-center gap-1 text-muted-foreground text-xs [&_svg]:size-3.5",
		action: "h-7 rounded-full px-2.5 text-xs",
		footer:
			"flex min-h-14 items-center justify-between gap-3 border-border border-t px-5 py-2.5",
		note: "m-0 text-muted-foreground text-xs",
		compact: "rounded-full",
		tipTitle: "block font-medium",
		tipMeta: "block tabular-nums opacity-80",
	},
	variants: {
		/** `framed` holds the meter in a card rim under its header; `plain` drops the chrome. */
		variant: {
			framed: {
				root: "rounded-2xl border border-border bg-card p-1",
				header: "px-4 pt-3 pb-3.5",
				body: "rounded-[11px] border border-border bg-background",
			},
			plain: {
				header: "pb-1",
				summary: "px-0",
				bar: "mx-0",
				row: "px-0",
				footer: "px-0",
			},
		},
	},
	defaultVariants: { variant: "framed" },
});

export type ContextMeterVariant = NonNullable<
	VariantProps<typeof contextMeter>["variant"]
>;

export type ContextSegment = {
	id: string;
	label: string;
	/** Tokens this source takes. */
	value: number;
	/** A note beside the label, e.g. "14 tools". */
	detail?: string;
	/** Pinned sources stay through a compaction and show a lock. */
	pinned?: boolean;
	/** A row action such as "Clear" or "Unpin"; it calls the meter's `onAction`. */
	action?: string;
	/** 1 to 5 picks a chart colour; any CSS colour also works. */
	color?: 1 | 2 | 3 | 4 | 5 | (string & {});
};

/** 139000 reads "139k", 3200 "3.2k", 900 "900". */
export function formatTokens(value: number) {
	if (value < 1000) return String(Math.round(value));
	const k = value / 1000;
	return `${k >= 100 ? Math.round(k) : Number(k.toFixed(1))}k`;
}

export const segmentColor = (segment: ContextSegment, index: number) => {
	const c = segment.color ?? (index % 5) + 1;
	return typeof c === "number" ? `var(--chart-${c})` : c;
};

/** Stroke paths on a 24px grid. */
export const CONTEXT_METER_ICONS = {
	layers:
		"M12 3.5 3.5 8l8.5 4.5L20.5 8 12 3.5ZM3.5 12l8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5",
	lock: "M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z",
	compact: "M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7",
} as const;
