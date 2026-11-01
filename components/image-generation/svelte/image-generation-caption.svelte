<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { imageGenerationState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
const gen = imageGenerationState("ImageGenerationCaption");
</script>

<!-- Below the frame: the status line, then the prompt. -->
<div data-slot="image-generation-caption" class={cn(gen.styles.caption(), classProp)} {...rest}>{@render children?.()}</div>
