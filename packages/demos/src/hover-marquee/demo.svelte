<script lang="ts">
import { HoverMarquee } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof HoverMarquee>>(props));
const titles = [
	"Quarterly planning notes with the whole design team",
	"Why the checkout flow drops users on the payment step",
	"Short title",
];
</script>

<ul class="grid w-full max-w-64 grid-cols-[minmax(0,1fr)] gap-1">
	{#each titles as title (title)}
		<li class="rounded-md px-2 py-1.5 text-sm hover:bg-foreground/[0.06]">
			<HoverMarquee text={p.text ?? title} variant={p.variant} pixelsPerSecond={p.pixelsPerSecond} />
		</li>
	{/each}
</ul>
