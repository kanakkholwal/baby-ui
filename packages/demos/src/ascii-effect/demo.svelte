<script lang="ts">
import { AsciiEffect } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof AsciiEffect>>(props));
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<AsciiEffect
		position="absolute"
		src="https://picsum.photos/id/1025/800/600"
		alt="A pug wrapped in a blanket"
		variant={p.variant ?? "image"}
		tone={p.tone ?? "mono"}
		dither={p.dither ?? "floyd-steinberg"}
		fit={p.fit ?? "cover"}
		chars={p.chars || " .:-=+*#%@"}
		fontSize={Number(props.fontSize ?? 10)}
		contrast={Number(props.contrast ?? 1.1)}
		brightness={Number(props.brightness ?? 1.2)}
		invert={props.invert === true}
		speed={Number(props.speed ?? 1)}
	/>
</div>
