<script lang="ts">
import { Collapsible } from "@baby-ui/svelte";

let open = $state(false);
</script>

<Collapsible bind:open label="Build settings">
	<p class="text-muted-foreground text-sm">Output directory, install command, and node version.</p>
</Collapsible>
