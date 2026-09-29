<script lang="ts">
import { JitterText } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof JitterText>>(props));
</script>

<JitterText
	text={p.text || "Jitter"}
	durationSeconds={Number(props.durationSeconds ?? 0.6)}
	size={p.size ?? "lg"}
	class="text-foreground"
/>
