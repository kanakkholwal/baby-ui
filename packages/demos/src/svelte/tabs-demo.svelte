<script lang="ts">
import { Tabs } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state("overview");

const tabs = [
	{ id: "overview", label: "Overview" },
	{ id: "activity", label: "Activity" },
	{ id: "settings", label: "Settings" },
];

const copy: Record<string, string> = {
	overview: "Deployment health, traffic and recent errors at a glance.",
	activity: "Every deploy, who triggered it and how long it took.",
	settings: "Build command, environment variables and domains.",
};
</script>

<div class="w-96">
	<Tabs {tabs} bind:value variant={(props.variant as "pill" | "underline") ?? "pill"}>
		{#snippet panel(active)}
			<p class="text-muted-foreground text-sm">{copy[active]}</p>
		{/snippet}
	</Tabs>
</div>
