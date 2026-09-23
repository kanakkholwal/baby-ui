<script lang="ts">
import { ScrubField } from "@baby-ui/svelte";

let width = $state(324);
</script>

<ScrubField label="W" value={width} onValueChange={(v) => (width = v)} min={40} max={999} />
