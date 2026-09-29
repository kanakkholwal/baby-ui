<script lang="ts">
import { Typewriter } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Typewriter>>(props));
</script>

<Typewriter
	text="Typing like a person, typos and all."
	durationMs={Number(props.durationMs ?? 3000)}
	loop={p.loop ?? true}
	cursor={p.cursor ?? "bar"}
	class="font-mono text-foreground text-xl"
/>
