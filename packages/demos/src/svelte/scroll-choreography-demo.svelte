<script lang="ts">
import {
	ScrollChoreography,
	type ScrollChoreographySize,
	type ScrollChoreographyVariant,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const IMAGES = {
	topLeft: {
		src: "https://picsum.photos/id/1015/800/540",
		alt: "River winding through a canyon",
	},
	topRight: {
		src: "https://picsum.photos/id/1036/1600/1000",
		alt: "Snowy forest at dusk",
	},
	bottomLeft: {
		src: "https://picsum.photos/id/1043/800/540",
		alt: "Autumn leaves on a lake",
	},
	bottomRight: {
		src: "https://picsum.photos/id/1039/800/540",
		alt: "Waterfall in a green gorge",
	},
};
</script>

<ScrollChoreography
	images={IMAGES}
	variant={(props.variant as ScrollChoreographyVariant) ?? "expand"}
	size={(props.size as ScrollChoreographySize) ?? "md"}
/>
