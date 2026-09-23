<script lang="ts">
import { JumpingText, type JumpingTextMode, type JumpingTextSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

{#key String(props.stepMs ?? "") + String(props.durationMs ?? "")}
	<JumpingText
		text={(props.text as string) || "This is a jumping text effect"}
		mode={(props.mode as JumpingTextMode) ?? "word"}
		stepMs={Number(props.stepMs ?? 60)}
		durationMs={Number(props.durationMs ?? 500)}
		size={(props.size as JumpingTextSize) ?? "md"}
		class="text-foreground"
	/>
{/key}
