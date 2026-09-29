<script lang="ts">
import { StaggeredLetter } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof StaggeredLetter>>(props));
</script>

{#key String(props.delayMs ?? "") + String(props.durationMs ?? "")}
	<StaggeredLetter
		text={p.text || "Baby UI"}
		applyMask={p.applyMask ?? false}
		delayMs={Number(props.delayMs ?? 90)}
		durationMs={Number(props.durationMs ?? 500)}
		direction={p.direction ?? "drop"}
	/>
{/key}
