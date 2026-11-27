<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { lightbox } from "../variants";
import { getLightbox } from "./context.svelte";

let { children, class: classProp }: { children?: Snippet; class?: string } = $props();

const viewer = getLightbox();
const toolbar = $derived(lightbox({ variant: viewer.variant }).toolbar());
</script>

<div data-slot="lightbox-toolbar" class={cn(toolbar, classProp)}>
	{@render children?.()}
</div>
