<script lang="ts">
import { Typewriter, type TypewriterCursor } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<Typewriter
	text="Typing like a person, typos and all."
	durationMs={Number(props.durationMs ?? 3000)}
	loop={Boolean(props.loop ?? true)}
	cursor={(props.cursor as TypewriterCursor) ?? "bar"}
	class="font-mono text-foreground text-xl"
/>
