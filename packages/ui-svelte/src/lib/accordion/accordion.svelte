<script lang="ts">
import { cn } from "../lib/cn";
import AccordionItem from "./accordion-item.svelte";

type Item = { id: string; title: string; content: string };

let {
	items,
	multiple = false,
	collapsible = true,
	class: classProp,
}: {
	items: Item[];
	multiple?: boolean;
	collapsible?: boolean;
	class?: string;
} = $props();

let open = $state<string[]>([]);

function toggle(id: string) {
	const isOpen = open.includes(id);
	if (multiple) {
		open = isOpen ? open.filter((x) => x !== id) : [...open, id];
		return;
	}
	if (isOpen) open = collapsible ? [] : open;
	else open = [id];
}
</script>

<div class={cn("divide-y divide-border overflow-hidden rounded-xl border border-border", classProp)}>
	{#each items as item (item.id)}
		<AccordionItem
			title={item.title}
			content={item.content}
			open={open.includes(item.id)}
			ontoggle={() => toggle(item.id)}
		/>
	{/each}
</div>
