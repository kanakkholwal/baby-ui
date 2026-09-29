<script lang="ts">
import { ScrollVelocity } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ScrollVelocity>>(props));
</script>

<div class="w-full max-w-2xl py-6">
	<ScrollVelocity
		text={p.text || "Scroll to speed me up"}
		layout={p.layout ?? "double"}
		direction={p.direction ?? "left"}
		durationS={Number(props.durationS ?? 30)}
		boost={Number(props.boost ?? 5)}
		size={p.size ?? "md"}
	/>
</div>
