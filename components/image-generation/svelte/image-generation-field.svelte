<script lang="ts">
import { cn } from "../../lib/cn";
import { createDitherField } from "../dither";
import { isGenerating } from "../variants";
import { imageGenerationState } from "./context";

let { class: classProp }: { class?: string } = $props();
const gen = imageGenerationState("ImageGenerationField");
let canvas = $state<HTMLCanvasElement>();

// One field per mount; the status only starts and stops its drift.
let field = $state.raw<ReturnType<typeof createDitherField>>();
$effect(() => {
	if (!canvas) return;
	const created = createDitherField(canvas);
	field = created;
	return () => created.destroy();
});
$effect(() => {
	field?.setRunning(isGenerating(gen.status));
});
</script>

<!-- The dot field that stands in for the image while it is made, fading as it sharpens. -->
<canvas bind:this={canvas} data-slot="image-generation-field" data-status={gen.status} aria-hidden="true" class={cn(gen.styles.field(), classProp)}></canvas>
