<script lang="ts">
import { ScrollArea } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ScrollArea>>(props));

const regions = [
	"Amsterdam",
	"Bengaluru",
	"Cape Town",
	"Dublin",
	"Frankfurt",
	"Hong Kong",
	"Johannesburg",
	"London",
	"Mumbai",
	"Paris",
	"São Paulo",
	"Singapore",
	"Sydney",
	"Tokyo",
	"Toronto",
	"Washington DC",
];
</script>

<div class="w-64 rounded-xl border border-border bg-card p-1">
	<ScrollArea maxHeight={p.maxHeight || "12rem"}>
		<ul class="flex flex-col">
			{#each regions as region (region)}
				<li class="rounded-lg px-3 py-2 text-foreground text-sm hover:bg-foreground/[0.04]">
					{region}
				</li>
			{/each}
		</ul>
	</ScrollArea>
</div>
