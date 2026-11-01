<script lang="ts">
import { cn } from "../../lib/cn";
import {
	IMAGE_GENERATION_ICONS,
	IMAGE_GENERATION_STATUS_TEXT,
	type ImageGenerationPhase,
} from "../variants";
import { imageGenerationState } from "./context";

let {
	labels,
	class: classProp,
}: {
	/** Replaces the line shown for any status, e.g. `{ generating: "Painting" }`. */
	labels?: Partial<Record<ImageGenerationPhase, string>>;
	class?: string;
} = $props();
const gen = imageGenerationState("ImageGenerationStatus");
const text = $derived(labels?.[gen.status] ?? IMAGE_GENERATION_STATUS_TEXT[gen.status]);
</script>

<div data-slot="image-generation-status" data-status={gen.status} aria-live="polite" class={cn(gen.styles.status(), classProp)}>
	<span aria-hidden="true" class={gen.styles.mark()}>
		{#if gen.status === "complete" || gen.status === "error"}
			<svg viewBox="0 0 24 24" class={gen.styles.icon()}>
				<path d={gen.status === "complete" ? IMAGE_GENERATION_ICONS.check : IMAGE_GENERATION_ICONS.alert} />
			</svg>
		{:else}
			<span class={gen.styles.spinner()}><span></span><span class="opacity-55"></span><span class="opacity-55"></span><span></span></span>
		{/if}
	</span>
	{#key text}
		<span class={gen.styles.statusText()}>{text}</span>
	{/key}
</div>
