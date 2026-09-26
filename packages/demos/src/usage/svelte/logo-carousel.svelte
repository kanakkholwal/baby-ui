<script lang="ts">
import { LogoCarousel } from "@baby-ui/svelte";

let { logos }: { logos: { src: string; alt: string }[] } = $props();
</script>

{#snippet logo(item: unknown)}
	{@const entry = item as { src: string; alt: string }}
	<img src={entry.src} alt={entry.alt} class="h-8 w-24 object-contain" />
{/snippet}

<LogoCarousel items={logos} {logo} columnCount={4} />
