<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { imageComposer } from "../variants";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();
</script>

<div data-slot="image-composer-tools" class={cn(imageComposer().tools(), classProp)}>
	{@render children?.()}
</div>
