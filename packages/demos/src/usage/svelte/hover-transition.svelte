<script lang="ts">
import { HoverTransition } from "@baby-ui/svelte";
</script>

<HoverTransition effect="ripple" direction="bottom-left" class="aspect-square w-64">
	<div class="grid size-full place-items-center bg-muted">Before</div>
	{#snippet hoverContent()}
		<div class="grid size-full place-items-center bg-primary">After</div>
	{/snippet}
</HoverTransition>
