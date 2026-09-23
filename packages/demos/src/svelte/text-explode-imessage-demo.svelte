<script lang="ts">
import {
	TextExplodeIMessage,
	type TextExplodeIMessageMode,
	type TextExplodeIMessageSize,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

{#key String(props.durationMs ?? "")}
	<TextExplodeIMessage
		text={(props.text as string) || "Big news"}
		mode={(props.mode as TextExplodeIMessageMode) ?? "loop"}
		durationMs={Number(props.durationMs ?? 4000)}
		size={(props.size as TextExplodeIMessageSize) ?? "lg"}
	/>
{/key}
