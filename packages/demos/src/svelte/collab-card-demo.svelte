<script lang="ts">
import {
	CollabCard,
	type CollabCardCollaborator,
	type CollabCardTone,
} from "@baby-ui/svelte";
import { avatar } from "../data/media";

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
const presenceAvatars = [12, 32, 47, 5].map(avatar);
</script>

<div class="w-full max-w-md">
	<CollabCard
		greeting={(props.greeting as string) || undefined}
		eyebrow={(props.eyebrow as string) || undefined}
		intro={(props.intro as string) || undefined}
		conjunction={(props.conjunction as string) || undefined}
		trailing={(props.trailing as string) || undefined}
		backgroundUrl={(props.backgroundUrl as string) || "https://picsum.photos/id/1043/800/500"}
		tone={(props.tone as CollabCardTone) ?? "inverted"}
		{collaborators}
		{presenceColors}
		{presenceAvatars}
		extraCount={Number(props.extraCount ?? 2)}
	/>
</div>
