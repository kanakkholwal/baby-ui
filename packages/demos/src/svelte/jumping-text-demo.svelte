<script lang="ts">
import { JumpingText } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof JumpingText>>(props));
</script>

{#key String(props.stepMs ?? "") + String(props.durationMs ?? "")}
	<JumpingText
		text={p.text || "This is a jumping text effect"}
		mode={p.mode ?? "word"}
		stepMs={Number(props.stepMs ?? 60)}
		durationMs={Number(props.durationMs ?? 500)}
		size={p.size ?? "md"}
		class="text-foreground"
	/>
{/key}
