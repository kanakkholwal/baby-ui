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
const orientation = $derived(p.orientation ?? "vertical");
</script>

<div class="w-64 rounded-xl bg-card p-1">
	<ScrollArea
		maxHeight={p.maxHeight || "12rem"}
		scrollbar={p.scrollbar ?? "auto"}
		gutter={p.gutter ?? "overlay"}
		{orientation}
		fade={p.fade ?? "mask"}
		fadeSize={p.fadeSize ?? 32}
		fadeOffset={p.fadeOffset ?? 0}
		class="rounded-[calc(var(--radius-xl)-0.25rem)]"
	>
		<ul class={orientation === "horizontal" ? "flex w-max" : orientation === "both" ? "grid w-max grid-cols-4" : "flex flex-col"}>
			{#each regions as region (region)}
				<li class="shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-foreground text-sm hover:bg-foreground/[0.04]">
					{region}
				</li>
			{/each}
		</ul>
	</ScrollArea>
</div>
