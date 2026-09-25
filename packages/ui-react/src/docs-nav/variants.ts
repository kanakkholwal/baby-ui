import { tv, type VariantProps } from "tailwind-variants";

export const docsNav = tv({
	slots: {
		root: "flex flex-col gap-5",
		// pl-1.5: the trigger's chevron (14px) and gap (8px) land the label on the rows' pl-7.
		trigger:
			"mb-2 w-full justify-start gap-1.5 pr-3 pl-1.5 font-semibold text-[11px] text-muted-foreground uppercase tracking-wider hover:text-foreground",
		count:
			"inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground/[0.06] px-1 font-medium text-[10px] text-muted-foreground tabular-nums",
		content: "px-0 pb-0",
		list: "relative",
		pill: "pointer-events-none absolute right-0 rounded-md bg-foreground/[0.06] transition-[transform,height] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
		row: "relative",
		marker:
			"pointer-events-none absolute duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
		rail: "pointer-events-none absolute top-1/2 bottom-0 left-3 border-foreground/20 border-l",
		link: "relative z-[1] flex items-center justify-between gap-2 py-1.5 pr-3 pl-7 text-sm outline-none transition-[color,opacity] duration-150 focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset motion-reduce:transition-none",
		label: "truncate",
		badge: "rounded border border-border px-1 py-px text-[10px] text-muted-foreground",
	},
	variants: {
		connector: {
			tick: {
				pill: "left-0",
				marker:
					"top-1/2 left-1 h-px -translate-y-1/2 transition-[width,background-color]",
			},
			curve: {
				pill: "left-5",
				marker:
					"top-0 left-3 h-1/2 rounded-bl-[7px] border-b border-l transition-[width,border-color]",
			},
		},
		state: {
			rest: { link: "text-foreground/70 hover:text-foreground" },
			dimmed: { link: "text-foreground/70 opacity-60" },
			hovered: { link: "text-foreground" },
			active: { link: "font-medium text-foreground" },
		},
	},
	compoundVariants: [
		{
			connector: "tick",
			state: ["rest", "dimmed", "hovered"],
			class: { marker: "bg-foreground/35" },
		},
		{ connector: "tick", state: "active", class: { marker: "bg-foreground" } },
		{
			connector: "curve",
			state: ["rest", "dimmed"],
			class: { marker: "border-foreground/20" },
		},
		{ connector: "curve", state: "hovered", class: { marker: "border-foreground/50" } },
		{ connector: "curve", state: "active", class: { marker: "border-foreground" } },
	],
	defaultVariants: { connector: "tick", state: "rest" },
});

export type DocsNavConnector = NonNullable<VariantProps<typeof docsNav>["connector"]>;
export type DocsNavRowState = NonNullable<VariantProps<typeof docsNav>["state"]>;

/** Marker length in px per connector and row state: it grows on hover and is longest when active. */
export const MARKER_WIDTH: Record<DocsNavConnector, Record<DocsNavRowState, number>> = {
	tick: { rest: 10, dimmed: 10, hovered: 16, active: 20 },
	curve: { rest: 10, dimmed: 10, hovered: 12, active: 14 },
};

export function rowState(
	active: boolean,
	hovered: boolean,
	anyHovered: boolean,
): DocsNavRowState {
	if (active) return "active";
	if (hovered) return "hovered";
	return anyHovered ? "dimmed" : "rest";
}
