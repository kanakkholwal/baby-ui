import { tv, type VariantProps } from "tailwind-variants";

/** A field like Input whose label is the drag handle; `data-scrubbing` marks a drag in both ports. */
export const scrubField = tv({
	slots: {
		root: [
			"group/scrub inline-flex min-w-0 items-stretch overflow-hidden rounded-lg border border-input bg-background text-foreground",
			"transition-[border-color,box-shadow,background-color] duration-[var(--duration-press)] ease-[var(--ease-out)] motion-reduce:transition-none",
			"hover:border-border-strong focus-within:border-ring focus-within:ring-2 focus-within:ring-ring",
			"data-[scrubbing]:border-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		],
		// Cursor, tint and the double chevron all say "drag me"; it turns primary mid-drag.
		label: [
			"flex shrink-0 cursor-ew-resize touch-none select-none items-center gap-1 border-input border-e font-medium text-muted-foreground outline-none",
			"transition-colors duration-(--duration-fast) hover:bg-foreground/[0.06] hover:text-foreground focus-visible:bg-foreground/[0.06] focus-visible:text-foreground",
			"group-data-[scrubbing]/scrub:bg-primary/10 group-data-[scrubbing]/scrub:text-primary motion-reduce:transition-none",
		],
		grip: "size-3 shrink-0 opacity-60",
		input: "w-full min-w-0 flex-1 bg-transparent tabular-nums outline-none",
		suffix: "flex shrink-0 items-center text-muted-foreground",
	},
	variants: {
		size: {
			sm: { root: "h-8 w-28 text-xs", label: "px-2", input: "px-2", suffix: "pe-2" },
			md: {
				root: "h-9 w-32 text-sm",
				label: "px-2.5",
				input: "px-2.5",
				suffix: "pe-2.5",
			},
			lg: { root: "h-10 w-36 text-sm", label: "px-3", input: "px-3", suffix: "pe-3" },
		},
		/** `edited` marks a value changed from its default; the caller decides when. */
		tone: {
			default: {},
			edited: { root: "border-primary/60 bg-primary/5" },
		},
	},
	defaultVariants: { size: "md", tone: "default" },
});

export type ScrubFieldSize = NonNullable<VariantProps<typeof scrubField>["size"]>;
export type ScrubFieldTone = NonNullable<VariantProps<typeof scrubField>["tone"]>;

/** Snaps to the step grid, rounded to the step's decimals so 0.1 steps stay clean. */
export function snapToStep(value: number, step: number): number {
	const decimals = (String(step).split(".")[1] ?? "").length;
	return Number((Math.round(value / step) * step).toFixed(decimals));
}
