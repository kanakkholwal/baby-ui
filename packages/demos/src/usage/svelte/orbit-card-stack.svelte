<script lang="ts">
import { OrbitCardStack } from "@baby-ui/svelte";

const team = [
	{ name: "Mira Vale", role: "Design", description: "Owns the visual system." },
	{
		name: "Ari Chen",
		role: "Founder",
		description: "Sets the taste bar.",
		href: "/team/ari",
	},
	{ name: "Sana Holt", role: "Engineering", description: "Builds the motion." },
];

let active = $state(1);
</script>

<OrbitCardStack items={team} bind:value={active} />
