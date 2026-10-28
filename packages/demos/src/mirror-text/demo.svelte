<script lang="ts">
import { MirrorText } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof MirrorText>>(props));
</script>

{#key String(props.durationMs ?? "") + String(props.staggerMs ?? "")}
	<MirrorText
		text={p.text || "This is a text"}
		direction={p.direction ?? "up"}
		durationMs={Number(props.durationMs ?? 500)}
		staggerMs={Number(props.staggerMs ?? 67)}
		class="text-4xl font-light uppercase"
	/>
{/key}
