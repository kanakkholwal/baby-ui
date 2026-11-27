<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { lightbox } from "../variants";
import { getLightbox } from "./context.svelte";

let { children, class: classProp }: { children?: Snippet; class?: string } = $props();

const viewer = getLightbox();
const styles = $derived(
	lightbox({ variant: viewer.variant, panel: viewer.detailsOpen ? "open" : "closed" }),
);
</script>

<div class={styles.detailsWrap()} inert={!viewer.detailsOpen}>
	<aside data-slot="lightbox-details" class={cn(styles.details(), classProp)}>
		{@render children?.()}
	</aside>
</div>
