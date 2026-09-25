<script lang="ts">
import { Button, ShowcaseGrid, ShowcasePanel } from "@baby-ui/svelte";
</script>

<ShowcaseGrid>
	<ShowcasePanel span={7}>
		{#snippet actions()}<Button size="sm">Open</Button>{/snippet}
		Charts
	</ShowcasePanel>
	<ShowcasePanel span={5}>Agents</ShowcasePanel>
	<ShowcasePanel>Blocks</ShowcasePanel>
</ShowcaseGrid>
