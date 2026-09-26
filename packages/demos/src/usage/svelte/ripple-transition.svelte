<script lang="ts">
import { RippleTransition } from "@baby-ui/svelte";

const images = [
	{ src: "/photos/valley.jpg", alt: "Mountain valley" },
	{ src: "/photos/forest.jpg", alt: "Forest path" },
];
let index = $state(0);
</script>

<RippleTransition {images} bind:value={index} />
