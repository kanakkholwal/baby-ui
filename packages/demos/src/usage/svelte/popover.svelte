<script lang="ts">
import { Popover } from "@baby-ui/svelte";

let open = $state(false);
</script>

<Popover bind:open placement="bottom-start">
	{#snippet trigger()}
		Filters
	{/snippet}
	<p class="text-sm">Anything you put here is positioned against the trigger.</p>
</Popover>
