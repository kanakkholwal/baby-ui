<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { lightbox } from "../variants";
import { getLightbox } from "./context.svelte";

let { children, class: classProp }: { children?: Snippet; class?: string } = $props();

const viewer = getLightbox();
const body = $derived(lightbox({ variant: viewer.variant }).body());
</script>

<div data-slot="lightbox-body" class={cn(body, classProp)}>
	{@render children?.()}
</div>
