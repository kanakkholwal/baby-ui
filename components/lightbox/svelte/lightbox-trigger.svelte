<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { getLightbox } from "./context.svelte";

let {
	children,
	index,
	ref = $bindable(null),
	class: classProp,
	onclick,
	...rest
}: DialogPrimitive.TriggerProps & {
	children?: Snippet;
	/** The picture this opens; the trigger becomes the thumbnail it flies out of. */
	index?: number;
} = $props();

const viewer = getLightbox();

$effect(() => {
	if (index === undefined || !ref) return;
	const at = index;
	viewer.registerThumb(at, ref);
	return () => viewer.registerThumb(at, null);
});
</script>

<!-- Opens the viewer. With an index it opens that picture and is the thumbnail it flies out of. -->
<DialogPrimitive.Trigger
	{...rest}
	bind:ref
	data-slot="lightbox-trigger"
	data-current={viewer.open && index === viewer.index ? "" : undefined}
	onclick={(event) => {
		if (index !== undefined) viewer.setIndex(index);
		onclick?.(event);
	}}
	class={cn("inline-flex data-[current]:[&_img]:opacity-0", classProp)}
>
	{@render children?.()}
</DialogPrimitive.Trigger>
