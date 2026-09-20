<script lang="ts">
import { Tabs } from "@baby-ui/svelte";

let value = $state("overview");
const tabs = [
	{ id: "overview", label: "Overview" },
	{ id: "activity", label: "Activity" },
	{ id: "settings", label: "Settings" },
];
</script>

<Tabs bind:value {tabs}>
	{#snippet panel(active)}
		<p class="text-muted-foreground text-sm">Showing {active}.</p>
	{/snippet}
</Tabs>
