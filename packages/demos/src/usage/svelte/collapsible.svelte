<script lang="ts">
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@baby-ui/svelte";

let open = $state(false);
</script>

<Collapsible bind:open>
	<CollapsibleTrigger>Build settings</CollapsibleTrigger>
	<CollapsibleContent>
		Output directory, install command, and node version.
	</CollapsibleContent>
</Collapsible>
