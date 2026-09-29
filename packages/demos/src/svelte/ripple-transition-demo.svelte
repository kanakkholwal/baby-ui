<script lang="ts">
import { RippleTransition } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof RippleTransition>>(props));

const IMAGES = [
	{
		src: "https://picsum.photos/id/1018/1200/900",
		alt: "Mountain valley under a clear sky",
	},
	{ src: "https://picsum.photos/id/1043/1200/900", alt: "Forest path in soft light" },
	{ src: "https://picsum.photos/id/1036/1200/900", alt: "Snowy peaks at dusk" },
];
</script>

<RippleTransition
	images={IMAGES}
	duration={Number(props.duration ?? 1200)}
	rings={p.rings ?? "single"}
	radius={p.radius ?? "xl"}
	label={p.label ?? "Show next image"}
	class="max-w-xl"
/>
