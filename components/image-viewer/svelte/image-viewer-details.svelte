<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { imageViewer } from "../variants";
import { getImageViewer } from "./context.svelte";

let { children, class: classProp }: { children?: Snippet; class?: string } = $props();

const viewer = getImageViewer();
const styles = $derived(
	imageViewer({ variant: viewer.variant, panel: viewer.detailsOpen ? "open" : "closed" }),
);
</script>

<div class={styles.detailsWrap()} inert={!viewer.detailsOpen}>
	<aside data-slot="image-viewer-details" class={cn(styles.details(), classProp)}>
		{@render children?.()}
	</aside>
</div>
