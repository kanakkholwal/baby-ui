<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { imageGenerationState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLSpanElement> = $props();
const gen = imageGenerationState("ImageGenerationBadge");
</script>

<!-- A corner label on the frame, such as the resolution or the model. -->
<span data-slot="image-generation-badge" class={cn(gen.styles.badge(), classProp)} {...rest}>{@render children?.()}</span>
