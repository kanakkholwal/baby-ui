<script lang="ts">
import { CollabCard, type CollabCardCollaborator } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const collaborators: [CollabCardCollaborator, CollabCardCollaborator] = [
	{
		name: "Dylan",
		pill: "bg-[#A259FF]",
		pillText: "text-white",
		cursor: "text-[#A259FF]",
	},
	{
		name: "Evan",
		pill: "bg-[#FF7262]",
		pillText: "text-white",
		cursor: "text-[#FF7262]",
	},
];

const presenceColors = ["#A259FF", "#FF7262", "#1ABCFE", "#0ACF83"];
</script>

<div class="w-full max-w-md">
	<CollabCard
		greeting={(props.greeting as string) || undefined}
		eyebrow={(props.eyebrow as string) || undefined}
		intro={(props.intro as string) || undefined}
		conjunction={(props.conjunction as string) || undefined}
		trailing={(props.trailing as string) || undefined}
		backgroundUrl={(props.backgroundUrl as string) || undefined}
		{collaborators}
		{presenceColors}
		extraCount={Number(props.extraCount ?? 2)}
	/>
</div>
