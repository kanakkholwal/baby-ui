<script lang="ts">
import { HoverCard } from "@baby-ui/svelte";
</script>

<HoverCard>
	{#snippet trigger()}
		<a href="/about">baby-ui</a>
	{/snippet}
	<p class="text-sm">A registry of React and Svelte components built from one spec.</p>
</HoverCard>
