<script lang="ts">
import { Button, Sheet } from "@baby-ui/svelte";

let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open sheet</Button>

<Sheet bind:open side="right" title="Filters">
	<p class="text-muted-foreground text-sm">Anything can live in the panel.</p>
</Sheet>
