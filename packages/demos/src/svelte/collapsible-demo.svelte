<script lang="ts">
import { Collapsible } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let open = $state(false);
</script>

<div class="w-80">
	<Collapsible bind:open label={(props.label as string) || "Advanced options"}>
		Build command, install command and the output directory. Changing these rebuilds
		every preview deployment.
	</Collapsible>
</div>
