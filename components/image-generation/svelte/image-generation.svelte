<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import {
	type ImageGenerationPhase,
	type ImageGenerationVariant,
	imageGeneration,
	isGenerating,
} from "../variants";
import { setImageGeneration } from "./context";

let {
	status = "generating",
	variant = "compact",
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & {
	/** Where the image is. Drive it from your generation request. */
	status?: ImageGenerationPhase;
	variant?: ImageGenerationVariant;
} = $props();

const styles = $derived(imageGeneration({ variant }));
setImageGeneration({
	get status() {
		return status;
	},
	get styles() {
		return styles;
	},
});
</script>

<div
	data-slot="image-generation"
	data-status={status}
	data-variant={variant}
	aria-busy={isGenerating(status)}
	class={cn(styles.root(), classProp)}
	{...rest}
>
	{@render children?.()}
</div>
