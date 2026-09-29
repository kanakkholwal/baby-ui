<script lang="ts">
import { TextExplodeIMessage } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof TextExplodeIMessage>>(props));
</script>

{#key String(props.durationMs ?? "")}
	<TextExplodeIMessage
		text={p.text || "Big news"}
		mode={p.mode ?? "loop"}
		durationMs={Number(props.durationMs ?? 4000)}
		size={p.size ?? "lg"}
	/>
{/key}
