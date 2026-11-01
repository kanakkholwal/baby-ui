<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { imageGenerationState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLParagraphElement> = $props();
const gen = imageGenerationState("ImageGenerationPrompt");
</script>

<p data-slot="image-generation-prompt" class={cn(gen.styles.prompt(), classProp)} {...rest}>“{@render children?.()}”</p>
