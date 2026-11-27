<script lang="ts">
import { cn } from "../../lib/cn";
import { lightbox } from "../variants";
import { getLightbox } from "./context.svelte";

let { class: classProp }: { class?: string } = $props();

const viewer = getLightbox();
const styles = $derived(lightbox({ variant: viewer.variant }));
let strip = $state<HTMLDivElement>();

$effect(() => {
	void viewer.index;
	const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
	strip?.querySelector('[aria-selected="true"]')?.scrollIntoView({
		inline: "center",
		block: "nearest",
		behavior: reduced ? "auto" : "smooth",
	});
});
</script>

<div
	bind:this={strip}
	data-slot="lightbox-filmstrip"
	role="tablist"
	aria-label="Pictures"
	class={cn(styles.filmstrip(), classProp)}
>
	{#each viewer.images as item, i (item.src)}
		<button
			type="button"
			role="tab"
			aria-selected={i === viewer.index}
			aria-label={`Picture ${i + 1}: ${item.alt}`}
			class={lightbox({ variant: viewer.variant, active: i === viewer.index }).thumb()}
			style:aspect-ratio={item.width && item.height ? item.width / item.height : 4 / 3}
			onclick={() => viewer.setIndex(i)}
		>
			<img src={item.thumbnail ?? item.src} alt="" draggable="false" class="size-full object-cover" />
		</button>
	{/each}
</div>
