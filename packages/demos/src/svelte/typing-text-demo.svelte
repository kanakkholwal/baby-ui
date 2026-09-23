<script lang="ts">
import { TypingText, type TypingTextSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

{#key String(props.smooth ?? "")}
	<TypingText
		text={(props.text as string) || "Creates a typing effect for given text"}
		delay={Number(props.delay ?? 32)}
		repeat={props.repeat !== false}
		waitMs={Number(props.waitMs ?? 1000)}
		smooth={props.smooth === true}
		fadeDurationMs={Number(props.fadeDurationMs ?? 300)}
		grow={props.grow === true}
		hideCursorOnComplete={props.hideCursorOnComplete === true}
		size={(props.size as TypingTextSize) ?? "md"}
		class="text-foreground"
	/>
{/key}
