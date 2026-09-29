<script lang="ts">
import { TextRepel } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof TextRepel>>(props));
</script>

<div class="px-6 py-10 font-semibold text-3xl text-foreground tracking-tight">
	<TextRepel
		text={p.text || "Move your cursor here"}
		mode={p.mode ?? "repel"}
		radius={Number(props.radius ?? 120)}
		strength={Number(props.strength ?? 45)}
		size={p.size ?? "inherit"}
	/>
</div>
