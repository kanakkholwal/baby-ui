<script lang="ts">
import { Badge, RecommendationCard, type RecommendationOption } from "@baby-ui/svelte";

let { props: _props = {} }: { props?: Record<string, unknown> } = $props();
</script>

{#snippet highBody()}
	Reorder waffle cones from <Badge variant="secondary">Cone King</Badge> with lead time
	<Badge variant="success">7 days</Badge>
{/snippet}

{#snippet reviewBody()}
	Switch vanilla to <Badge variant="secondary">Vanilla Madagascar</Badge> for peak season.
{/snippet}

{#snippet noneBody()}
	Fall back to a <span class="font-medium text-foreground">full restock</span> across every SKU.
{/snippet}

<RecommendationCard
	title="Want me to place this restock order?"
	options={[
		{
			key: "high",
			body: highBody,
			short: "Reorder from Cone King · 7-day lead",
			signal: 3,
			tone: "var(--success)",
			label: "High confidence",
			cta: "Accept",
			ctaVariant: "default",
		},
		{
			key: "review",
			body: reviewBody,
			short: "Switch to Vanilla Madagascar",
			signal: 2,
			tone: "var(--warning)",
			label: "Needs review",
			cta: "Configure",
			ctaVariant: "secondary",
		},
		{
			key: "none",
			body: noneBody,
			short: "Full restock across every SKU",
			signal: 0,
			tone: "var(--muted-foreground)",
			label: "No signal",
			cta: "Accept full restock",
			ctaVariant: "secondary",
		},
	] as RecommendationOption[]}
/>
