<script lang="ts">
import { Composer } from "@baby-ui/svelte";

let value = $state("");
</script>

<Composer bind:value placeholder="Ask anything…" onSubmit={(text) => console.log(text)} />
