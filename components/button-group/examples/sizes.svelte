<script lang="ts">
import { Button } from "@baby-ui/components/svelte/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "@baby-ui/components/svelte/button-group";

const SIZES = ["xs", "sm", "default", "lg", "xl"] as const;
</script>

<div class="flex flex-col items-start gap-3">
	{#each SIZES as size (size)}
		<ButtonGroup aria-label="{size} group">
			<Button variant="secondary" {size} roundness="soft">First</Button>
			<ButtonGroupSeparator />
			<Button variant="secondary" {size} roundness="soft">Second</Button>
			<ButtonGroupSeparator />
			<Button variant="secondary" {size} roundness="soft">Third</Button>
		</ButtonGroup>
	{/each}
</div>
