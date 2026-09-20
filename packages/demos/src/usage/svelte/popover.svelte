<script lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from "@baby-ui/svelte";

let open = $state(false);
</script>

<Popover bind:open placement="bottom-start">
	<PopoverTrigger>Filters</PopoverTrigger>
	<PopoverContent>
		<p class="text-sm">Anything you put here is positioned against the trigger.</p>
	</PopoverContent>
</Popover>
