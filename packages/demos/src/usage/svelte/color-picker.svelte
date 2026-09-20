<script lang="ts">
import { ColorPicker } from "@baby-ui/svelte";

let value = $state("#7dd3fc");
</script>

<ColorPicker bind:value format="hsl" label="Accent" />
