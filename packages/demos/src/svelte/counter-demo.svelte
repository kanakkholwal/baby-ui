<script lang="ts">
import { Counter } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Counter>>(props));
</script>

{#key String(props.direction ?? "up") + String(props.durationMs ?? "")}
	<Counter
		value={Number(props.value ?? 12480)}
		direction={p.direction ?? "up"}
		durationMs={Number(props.durationMs ?? 1200)}
		delayMs={Number(props.delayMs ?? 0)}
		triggerOnView={props.triggerOnView === true}
		size={p.size ?? "md"}
	/>
{/key}
