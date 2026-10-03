<script lang="ts">
import { Tabs, TabsList, TabsTrigger } from "@baby-ui/svelte";
import { PMS } from "#lib/pm.js";
import { prefs } from "#lib/preferences.svelte.js";

function choose(next: string) {
	const pm = PMS.find((id) => id === next);
	if (pm) prefs.set("pm", pm);
}
</script>

<Tabs bind:value={() => prefs.pm, choose} variant="segment" size="sm">
	<TabsList aria-label="Package manager">
		{#each PMS as pm (pm)}
			<TabsTrigger value={pm}>{pm}</TabsTrigger>
		{/each}
	</TabsList>
</Tabs>
