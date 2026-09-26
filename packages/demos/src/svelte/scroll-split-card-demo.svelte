<script lang="ts">
import {
	ScrollSplitCard,
	type ScrollSplitCardSize,
	type ScrollSplitCardTone,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const CARDS = [
	{ title: "Plan", description: "Map the journey before a single pixel moves." },
	{ title: "Build", description: "Ship small, measured steps behind real data." },
	{ title: "Grow", description: "Tune what works and retire what does not." },
];
</script>

<ScrollSplitCard
	image="https://picsum.photos/id/1018/1200/600"
	imageAlt="Mountain valley under a clear sky"
	cards={CARDS}
	tone={(props.tone as ScrollSplitCardTone) ?? "card"}
	size={(props.size as ScrollSplitCardSize) ?? "md"}
	hint={(props.hint as string) ?? "Scroll down"}
	endLabel={(props.endLabel as string) ?? "So cool, right?"}
/>
