<script lang="ts">
import { TextTransition, type TextTransitionVariant } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

{#key (props.variant as string) + String(props.durationMs ?? "") + String(props.staggerMs ?? "")}
	<TextTransition
		text={(props.text as string) || "Ship it in seconds"}
		variant={(props.variant as TextTransitionVariant) ?? "blur-out-up"}
		durationMs={Number(props.durationMs ?? 560)}
		staggerMs={Number(props.staggerMs ?? 28)}
		class="text-3xl font-semibold text-foreground"
	/>
{/key}
