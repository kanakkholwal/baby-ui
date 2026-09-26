<script lang="ts">
import { MacKeyboard } from "@baby-ui/svelte";

let pressed = $state<string[]>([]);
</script>

<MacKeyboard bind:pressed />
