<script lang="ts">
import { LayeredStack } from "@baby-ui/svelte";

const items = [
	{ src: "/photos/1.jpg", alt: "Harbour at dawn" },
	{ src: "/photos/2.jpg", alt: "Pine ridge" },
	{ src: "/photos/3.jpg", alt: "Desert road" },
	{ src: "/photos/4.jpg", alt: "City lights" },
];

let open = $state(false);
</script>

<LayeredStack {items} bind:open columns="4" />
