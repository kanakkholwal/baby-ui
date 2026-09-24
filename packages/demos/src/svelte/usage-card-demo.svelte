<script lang="ts">
import { UsageCard, type UsageCardLayout } from "@baby-ui/svelte";
import { GOALS, GOALS_CONFIG } from "../data/channels";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="w-full max-w-sm">
	<UsageCard
		title="Today's rings"
		description="Move, exercise and stand goals"
		data={GOALS}
		config={GOALS_CONFIG}
		layout={(props.layout as UsageCardLayout) ?? "side"}
	/>
</div>
