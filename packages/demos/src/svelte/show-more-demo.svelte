<script lang="ts">
import { ShowMore } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ShowMore>>(props));
</script>

<div class="w-full max-w-80">
	<ShowMore
		lines={Number(props.lines ?? 3)}
		maxHeight={Number(props.maxHeight ?? 320)}
		moreLabel={p.moreLabel || "Show more"}
		lessLabel={p.lessLabel || "Show less"}
	>
		<p>Components here are copied into your project rather than installed, which means you own the source and can change anything. The registry only decides what the first version looks like. Every port satisfies the same ComponentSpec, so the React and Svelte builds behave identically even though neither is generated from the other.</p>
	</ShowMore>
</div>
