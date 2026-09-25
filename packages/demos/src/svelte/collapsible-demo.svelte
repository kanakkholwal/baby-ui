<script lang="ts">
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let open = $state(false);

$effect(() => {
	open = Boolean(props.open);
});
</script>

<div class="w-full max-w-80">
	<Collapsible bind:open>
		<CollapsibleTrigger>Advanced options</CollapsibleTrigger>
		<CollapsibleContent>
			Build command, install command and the output directory. Changing these rebuilds every
			preview deployment.
		</CollapsibleContent>
	</Collapsible>
</div>
