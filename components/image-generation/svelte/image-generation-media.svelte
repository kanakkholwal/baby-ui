<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { imageGenerationState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
const gen = imageGenerationState("ImageGenerationMedia");
</script>

<!-- The image itself (img, video or canvas); it sharpens from a blur as the status advances. -->
<div data-slot="image-generation-media" data-status={gen.status} aria-hidden="true" class={cn(gen.styles.media(), classProp)} {...rest}>
	{@render children?.()}
</div>
