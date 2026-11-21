<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { imageViewer } from "../variants";
import { getImageViewer } from "./context.svelte";

let { children, class: classProp }: { children?: Snippet; class?: string } = $props();

const viewer = getImageViewer();
const body = $derived(imageViewer({ variant: viewer.variant }).body());
</script>

<div data-slot="image-viewer-body" class={cn(body, classProp)}>
	{@render children?.()}
</div>
