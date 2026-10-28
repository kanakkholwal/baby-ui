<script lang="ts">
import { DraggableMarquee } from "@baby-ui/svelte";

let { logos }: { logos: { src: string; alt: string }[] } = $props();
</script>

<DraggableMarquee pauseOnHover>
	{#each logos as logo (logo.src)}
		<img src={logo.src} alt={logo.alt} class="h-10" />
	{/each}
</DraggableMarquee>
