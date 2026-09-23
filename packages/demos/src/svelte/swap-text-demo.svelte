<script lang="ts">
import { SwapText, type SwapTextSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<SwapText
	initialText={(props.initialText as string) || "Hover me"}
	finalText={(props.finalText as string) || "Click me"}
	defaultActive={props.defaultActive === true}
	size={(props.size as SwapTextSize) ?? "lg"}
	supportsHover={props.supportsHover !== false}
	disableClick={props.disableClick === true}
	durationMs={Number(props.durationMs ?? 1000)}
/>
