<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { imageViewer } from "../variants";
import { getImageViewer } from "./context.svelte";

let { children, class: classProp }: { children?: Snippet; class?: string } = $props();

const viewer = getImageViewer();
const toolbar = $derived(imageViewer({ variant: viewer.variant }).toolbar());
</script>

<div data-slot="image-viewer-toolbar" class={cn(toolbar, classProp)}>
	{@render children?.()}
</div>
