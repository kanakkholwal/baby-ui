<script lang="ts">
import { TextTransition } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof TextTransition>>(props));
</script>

{#key (p.variant ?? "blur-out-up") + String(props.durationMs ?? "") + String(props.staggerMs ?? "")}
	<TextTransition
		text={p.text || "Ship it in seconds"}
		variant={p.variant ?? "blur-out-up"}
		durationMs={Number(props.durationMs ?? 560)}
		staggerMs={Number(props.staggerMs ?? 28)}
		class="text-3xl font-semibold text-foreground"
	/>
{/key}
