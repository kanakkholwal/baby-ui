import { tv, type VariantProps } from "tailwind-variants";

const ROW_IN =
	"transition-[opacity,translate] duration-(--duration-base) ease-(--ease-ui-out) starting:translate-y-1.5 starting:opacity-0 motion-reduce:transition-none";

export const agentActivity = tv({
	slots: {
		root: "w-full text-sm",
		status: "flex h-7 min-w-0 items-center font-medium text-muted-foreground",
		trigger: [
			"group/trigger -mx-1.5 flex h-7 min-w-0 max-w-full items-center gap-1.5 rounded-md px-1.5 text-left font-medium text-muted-foreground outline-none",
			"transition-colors duration-(--duration-fast) ease-(--ease-ui-out) hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
		],
		summary: "min-w-0 truncate",
		chevron:
			"size-3.5 shrink-0 fill-none stroke-current opacity-70 transition-transform duration-(--duration-dropdown) ease-(--ease-ui-out) [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] group-data-[panel-open]/trigger:rotate-180 group-data-[state=open]/trigger:rotate-180 motion-reduce:transition-none",
		panel: [
			"invisible grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,visibility] duration-(--duration-collapse) ease-(--ease-ui-out) motion-reduce:transition-none",
			"data-[open]:visible data-[open]:grid-rows-[1fr] data-[open]:opacity-100 data-[state=open]:visible data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100",
		],
		clip: "min-h-0 overflow-hidden",
		viewport: [
			"overflow-y-hidden [scrollbar-width:none] transition-[height] duration-(--duration-slow) ease-(--ease-ui-out) motion-reduce:transition-none",
			"data-[scroll]:overflow-y-auto",
			// Only a capped viewport fades its edges; the live one only fades the top, where rows leave.
			"data-[capped]:[mask-image:linear-gradient(to_bottom,transparent,black_12px,black_calc(100%-12px),transparent)]",
			"data-[capped]:data-[working]:[mask-image:linear-gradient(to_bottom,transparent,black_12px)]",
		],
		list: "m-0 flex list-none flex-col gap-0.5 p-0 py-2 transition-transform duration-(--duration-slow) ease-(--ease-ui-out) motion-reduce:transition-none",
		row: [
			"flex min-h-7 min-w-0 items-start gap-2.5 rounded-md px-1.5 py-1 leading-5",
			ROW_IN,
		],
		icon: "mt-0.5 grid size-4 shrink-0 place-items-center text-muted-foreground/70 [&_svg]:size-4 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round] [&_svg]:[stroke-width:1.7]",
		label:
			"min-w-0 flex-1 text-foreground/90 data-[status=pending]:text-muted-foreground/60",
		meta: "shrink-0 text-muted-foreground/60 tabular-nums",
		pulse:
			"relative grid size-3 place-items-center before:absolute before:inset-0 before:animate-pulse before:rounded-full before:bg-foreground/15 after:size-1.5 after:rounded-full after:bg-foreground/60 motion-reduce:before:animate-none",
		text: ["px-1.5 py-1 text-muted-foreground leading-5", ROW_IN],
		search: ["flex flex-col gap-0.5", ROW_IN],
		results: "flex flex-col gap-0.5 ps-4",
		result: [
			"flex min-h-7 min-w-0 items-center gap-2 rounded-md px-1.5 py-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring",
			"transition-[background-color,scale,opacity,translate] duration-(--duration-fast) ease-(--ease-ui-out) starting:translate-y-1.5 starting:opacity-0 motion-reduce:transition-none",
			"data-[link]:hover:bg-muted data-[link]:active:scale-(--press-scale)",
		],
		resultIcon:
			"grid size-4 shrink-0 place-items-center text-muted-foreground [&_img]:size-3.5 [&_img]:rounded-sm [&_svg]:size-3.5 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:[stroke-width:2]",
		resultTitle: "min-w-0 truncate font-medium text-foreground/90",
		resultDomain: "min-w-0 shrink-[2] truncate text-muted-foreground/60",
		more: ["px-1.5 py-1 ps-8 text-muted-foreground/60", ROW_IN],
		action: "shrink-0 font-medium text-foreground/90",
		target:
			"min-w-0 flex-1 truncate rounded-md bg-muted px-2 py-0.5 font-mono text-muted-foreground text-xs leading-5",
		diff: "flex shrink-0 items-center gap-2 font-mono text-xs tabular-nums leading-6",
		added: "text-success-strong",
		removed: "text-destructive",
	},
	variants: {
		/** `plain` sits inline in a chat turn; `card` frames the run on a card surface. */
		variant: {
			plain: {},
			card: {
				root: "rounded-xl border border-border bg-card px-3 py-1.5",
				trigger: "mx-0",
			},
		},
	},
	defaultVariants: { variant: "plain" },
});

export type AgentActivityVariant = NonNullable<
	VariantProps<typeof agentActivity>["variant"]
>;
export type AgentActivityStatus = "working" | "complete";
export type AgentActivityStepStatus = "pending" | "active" | "done";
export type AgentActivityAction = "read" | "edit" | "run" | (string & {});

/** "45s", "2m", "2m 5s": for a summary such as `Worked for ${formatDuration(s)}`. */
export function formatDuration(seconds: number) {
	const total = Math.max(0, Math.round(seconds));
	if (total < 60) return `${total}s`;
	const minutes = Math.floor(total / 60);
	const rest = total % 60;
	return rest ? `${minutes}m ${rest}s` : `${minutes}m`;
}

/** Stroke paths on a 24px grid. */
export const AGENT_ACTIVITY_ICONS = {
	chevron: "m6 9 6 6 6-6",
	check: "m5 12.5 4.5 4.5L19 7.5",
	circle: "M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z",
	search: "m20 20-4.2-4.2M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z",
	globe:
		"M12 21a9 9 0 1 0 0-18m0 18a9 9 0 1 1 0-18m0 18c2.2-2.4 3.4-5.6 3.4-9S14.2 5.4 12 3m0 18c-2.2-2.4-3.4-5.6-3.4-9S9.8 5.4 12 3M3.5 12h17",
	read: "M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8M14 3.5 18.5 8M14 3.5V8h4.5M9 13h6M9 16.5h4",
	edit: "M4.5 19.5h4l10-10a2.8 2.8 0 0 0-4-4l-10 10v4ZM13.5 7l3.5 3.5",
	run: "M4 6.5a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11ZM8 9.5l2.5 2.5L8 14.5M12.5 15h3.5",
	tool: "M14.7 6.3a4 4 0 0 0-5.4 5.4l-5.1 5.1a1.8 1.8 0 1 0 2.5 2.5l5.1-5.1a4 4 0 0 0 5.4-5.4L14.6 11.4l-2.5-.5-.5-2.5 3.1-3.1Z",
} as const;

export const actionIcon = (action: AgentActivityAction) =>
	action === "read"
		? AGENT_ACTIVITY_ICONS.read
		: action === "edit" || action === "write"
			? AGENT_ACTIVITY_ICONS.edit
			: action === "run"
				? AGENT_ACTIVITY_ICONS.run
				: AGENT_ACTIVITY_ICONS.tool;
