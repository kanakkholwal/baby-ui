<script lang="ts">
import { cn } from "../../lib/cn";
import { lightbox } from "../variants";
import { getLightbox } from "./context.svelte";

let { class: classProp }: { class?: string } = $props();

const viewer = getLightbox();
const counter = $derived(lightbox({ variant: viewer.variant }).counter());
</script>

<span data-slot="lightbox-counter" aria-live="polite" class={cn(counter, classProp)}>
	{viewer.count === 0 ? 0 : viewer.index + 1} of {viewer.count}
</span>
