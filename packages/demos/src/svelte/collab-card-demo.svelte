<script lang="ts">
import {
	CollabCard,
	type CollabCardCollaborator,
	type CollabCardTone,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const collaborators: [CollabCardCollaborator, CollabCardCollaborator] = [
	{
		name: "Dylan",
		pill: "bg-chart-4",
		pillText: "text-background",
		cursor: "text-chart-4",
	},
	{
		name: "Evan",
		pill: "bg-chart-2",
		pillText: "text-background",
		cursor: "text-chart-2",
	},
];

const presenceColors = [
	"var(--chart-4)",
	"var(--chart-2)",
	"var(--chart-1)",
	"var(--chart-3)",
];
</script>

<div class="w-full max-w-md">
	<CollabCard
		greeting={(props.greeting as string) || undefined}
		eyebrow={(props.eyebrow as string) || undefined}
		intro={(props.intro as string) || undefined}
		conjunction={(props.conjunction as string) || undefined}
		trailing={(props.trailing as string) || undefined}
		backgroundUrl={(props.backgroundUrl as string) || undefined}
		tone={(props.tone as CollabCardTone) ?? "inverted"}
		{collaborators}
		{presenceColors}
		extraCount={Number(props.extraCount ?? 2)}
	/>
</div>
