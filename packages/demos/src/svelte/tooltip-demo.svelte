<script lang="ts">
import { Tooltip, TooltipContent, TooltipTrigger } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const ACTIONS = [
	{
		id: "copy",
		hint: "Copy to clipboard",
		path: "M6 6V4.5A1.5 1.5 0 0 1 7.5 3h4A1.5 1.5 0 0 1 13 4.5v4A1.5 1.5 0 0 1 11.5 10H10M4.5 6h4A1.5 1.5 0 0 1 10 7.5v4A1.5 1.5 0 0 1 8.5 13h-4A1.5 1.5 0 0 1 3 11.5v-4A1.5 1.5 0 0 1 4.5 6",
	},
	{
		id: "share",
		hint: "Copy a public link",
		path: "M8 10.5V3m0 0L5.5 5.5M8 3l2.5 2.5M3.5 10v2A1.5 1.5 0 0 0 5 13.5h6a1.5 1.5 0 0 0 1.5-1.5v-2",
	},
	{
		id: "delete",
		hint: "Move to trash",
		path: "M3.5 4.5h9M6.5 4.5V3h3v1.5M5 4.5l.5 8h5l.5-8",
	},
];

const placement = $derived((props.placement as never) ?? "top");
const delay = $derived(Number(props.delay ?? 400));
</script>

<div class="inline-flex items-center gap-1 rounded-xl border border-border p-1">
	{#each ACTIONS as action (action.id)}
		<Tooltip {placement} {delay}>
			<TooltipTrigger
				class="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
					<path
						d={action.path}
						stroke="currentColor"
						stroke-width="1.3"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</TooltipTrigger>
			<TooltipContent>
				{action.id === "copy" ? (props.label as string) || action.hint : action.hint}
			</TooltipContent>
		</Tooltip>
	{/each}
</div>
