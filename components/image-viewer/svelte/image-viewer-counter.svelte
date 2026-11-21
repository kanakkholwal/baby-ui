<script lang="ts">
import { cn } from "../../lib/cn";
import { imageViewer } from "../variants";
import { getImageViewer } from "./context.svelte";

let { class: classProp }: { class?: string } = $props();

const viewer = getImageViewer();
const counter = $derived(imageViewer({ variant: viewer.variant }).counter());
</script>

<span data-slot="image-viewer-counter" aria-live="polite" class={cn(counter, classProp)}>
	{viewer.count === 0 ? 0 : viewer.index + 1} of {viewer.count}
</span>
