<script lang="ts">
import { cn } from "../lib/cn";
import { type JumpingTextMode, type JumpingTextSize, jumpingText } from "./variants";

let {
	text,
	mode = "word",
	stepMs: stepMsProp,
	durationMs = 500,
	size = "md",
	class: classProp,
}: {
	text: string;
	mode?: JumpingTextMode;
	stepMs?: number;
	durationMs?: number;
	size?: JumpingTextSize;
	class?: string;
} = $props();

const SPLIT = {
	word: (t: string) => t.split(/(?:\b)/u),
	character: (t: string) => t.split(/(?:)/u),
};

const nodes = $derived(SPLIT[mode](text));
const stepMs = $derived(stepMsProp ?? (mode === "word" ? 50 : 10));
</script>

<div data-slot="jumping-text" class={cn(jumpingText({ size }), classProp)}>
	{#key text}
		{#each nodes as node, index (index)}
			<span
				class="jump-in inline-block origin-center"
				style="animation-delay: {index * stepMs}ms; --jump-duration: {durationMs}ms;"
			>
				{node === " " ? " " : node}
			</span>
		{/each}
	{/key}
	<span class="sr-only">{text}</span>
</div>
