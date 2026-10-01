import { tv } from "tailwind-variants";

export type { DialogVariant } from "../dialog/variants";

/** Command's flat mode is edge-to-edge (matches shadcn's cmdk convention), unlike
 * Dialog's padded flat surface, so it keeps its own panel/body padding. */
export const commandFrame = tv({
	slots: {
		// Opened from the keyboard many times a day, so it appears at once; only closing fades.
		popup: [
			"fixed top-[14vh] left-1/2 z-50 -translate-x-1/2 outline-none transition-opacity duration-0",
			"data-[closed]:opacity-0 data-[closed]:duration-[var(--duration-exit)] data-[closed]:ease-[var(--ease-out)]",
			"data-[state=closed]:opacity-0 data-[state=closed]:duration-[var(--duration-exit)] data-[state=closed]:ease-[var(--ease-out)]",
			"flex max-h-[min(30rem,70dvh)] w-[min(36rem,calc(100vw-2rem))] flex-col overflow-hidden",
			"motion-reduce:transition-none",
		],
		panel: "rounded-2xl border border-border bg-background shadow-2xl",
		// cmdk writes data-selected="true"/"false"; bits-ui writes a bare attribute.
		item: [
			"relative flex w-full cursor-default select-none items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-muted-foreground text-sm outline-none",
			"transition-[color,scale] [transition-duration:100ms,250ms] ease-[var(--ease-out-quart)] active:scale-[var(--press-scale-row)] motion-reduce:transition-none",
			'data-[selected=""]:text-foreground data-[selected=true]:text-foreground',
			'data-[disabled=""]:pointer-events-none data-[disabled=""]:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
		],
		// One marker for the active row. It snaps: arrow keys repeat too fast for motion to help.
		marker: "pointer-events-none absolute top-0 left-0 rounded-md bg-foreground/[0.06]",
		header: "flex items-center justify-between gap-3 px-3.5",
		body: "",
	},
	variants: {
		variant: {
			framed: { panel: "p-1", header: "pt-1.5 pb-2", body: "rounded-[11px] bg-card" },
			default: { panel: "p-0", body: "bg-popover" },
		},
	},
	defaultVariants: { variant: "default" },
});
