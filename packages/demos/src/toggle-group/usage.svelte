<script lang="ts">
import { ToggleGroup, ToggleGroupItem } from "@baby-ui/svelte";

let value = $state<string | string[]>("left");
</script>

<ToggleGroup bind:value type="single" label="Alignment">
	<ToggleGroupItem value="left">Left</ToggleGroupItem>
	<ToggleGroupItem value="center">Center</ToggleGroupItem>
	<ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>
