<script lang="ts">
import { CollabCard, type CollabCardCollaborator } from "@baby-ui/svelte";

const collaborators: [CollabCardCollaborator, CollabCardCollaborator] = [
	{ name: "Dylan", pill: "bg-[#A259FF]", cursor: "text-[#A259FF]" },
	{ name: "Evan", pill: "bg-[#FF7262]", cursor: "text-[#FF7262]" },
];

const presenceColors = ["#A259FF", "#FF7262", "#1ABCFE"];
</script>

<CollabCard {collaborators} {presenceColors} extraCount={1} />
