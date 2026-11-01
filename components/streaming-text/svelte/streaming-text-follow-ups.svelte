<script lang="ts">
import { cn } from "../../lib/cn";
import { streamingTextState } from "./context";

let {
	items,
	onSelect,
	label = "Follow-ups",
	class: classProp,
}: {
	items: string[];
	onSelect: (text: string, index: number) => void;
	label?: string;
	class?: string;
} = $props();
const ctx = streamingTextState("StreamingTextFollowUps");
const s = $derived(ctx.styles);
</script>

<!-- Suggested next prompts, shown once the answer settles. -->
{#if items.length}
	<div data-slot="streaming-text-follow-ups" class={cn(s.followUps(), classProp)}>
		<p class={s.followUpsLabel()}>{label}</p>
		<ul class={s.followUpList()}>
			{#each items as item, i (item)}
				<li>
					<button type="button" onclick={() => onSelect(item, i)} class={s.followUp()}>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-3 shrink-0 text-muted-foreground">
							<path d="M9 10l-5 5 5 5" />
							<path d="M20 4v7a4 4 0 0 1-4 4H4" />
						</svg>
						{item}
					</button>
				</li>
			{/each}
		</ul>
	</div>
{/if}
