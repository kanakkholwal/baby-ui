<script lang="ts">
import { Conversation, Message } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const turns = [
	{ role: "user" as const, text: "Why does the dock measure the wrong centre?" },
	{
		role: "assistant" as const,
		text: "Because the item's own width grows as it magnifies.",
	},
	{ role: "user" as const, text: "So measure the resting rect instead?" },
	{
		role: "assistant" as const,
		text: "Yes. Cache it on pointerenter and reuse it for the whole gesture.",
	},
	{ role: "user" as const, text: "And on resize?" },
	{
		role: "assistant" as const,
		text: "Invalidate the cache from a ResizeObserver on the dock.",
	},
];
</script>

<div class="w-96 rounded-xl border border-border bg-card/40 p-2">
	<Conversation maxHeight={(props.maxHeight as string) || "16rem"}>
		{#each turns as turn, i (i)}
			<Message role={turn.role} name={turn.role === "user" ? "You" : "Assistant"} showActions={false}>
				{turn.text}
			</Message>
		{/each}
	</Conversation>
</div>
