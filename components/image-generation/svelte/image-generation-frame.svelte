<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { imageGenerationState } from "./context";

let {
	label,
	aspectRatio = "1 / 1",
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & {
	/** What the image is, read in place of it: the prompt, or a description once it is ready. */
	label: string;
	/** Reserved before the image exists, so nothing jumps when it lands. */
	aspectRatio?: string;
} = $props();
const gen = imageGenerationState("ImageGenerationFrame");
</script>

<div
	data-slot="image-generation-frame"
	data-status={gen.status}
	role="img"
	aria-label={label}
	style:aspect-ratio={aspectRatio}
	class={cn(gen.styles.frame(), classProp)}
	{...rest}
>
	{@render children?.()}
</div>
