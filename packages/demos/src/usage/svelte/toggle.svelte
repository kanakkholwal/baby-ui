<script lang="ts">
import { Toggle } from "@baby-ui/svelte";

let pressed = $state(false);
</script>

<Toggle bind:pressed label="Bold">B</Toggle>
