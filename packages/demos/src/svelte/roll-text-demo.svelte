<script lang="ts">
import { type RollStagger, RollText, type RollTextSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<RollText
	text={(props.text as string) || "Roll on hover"}
	groupHover={props.groupHover === true}
	disabled={props.disabled === true}
	stagger={(props.stagger as RollStagger) ?? "none"}
	staggerMs={Number(props.staggerMs ?? 32)}
	durationMs={Number(props.durationMs ?? 450)}
	size={(props.size as RollTextSize) ?? "md"}
	class="text-2xl font-semibold text-foreground"
/>
