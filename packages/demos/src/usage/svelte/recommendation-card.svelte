<script lang="ts">
import { RecommendationCard, type RecommendationOption } from "@baby-ui/svelte";
</script>

{#snippet body()}
	Reorder waffle cones from Cone King with a 7-day lead time.
{/snippet}

<RecommendationCard
	title="Want me to place this restock order?"
	options={[
		{
			key: "high",
			body,
			short: "Reorder from Cone King · 7-day lead",
			signal: 3,
			tone: "var(--success)",
			label: "High confidence",
			cta: "Accept",
			ctaVariant: "default",
		},
	] as RecommendationOption[]}
/>
