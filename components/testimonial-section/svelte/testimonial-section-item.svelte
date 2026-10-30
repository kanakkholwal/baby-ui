<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLLiAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { testimonialSectionState } from "./context";

let {
	featured = false,
	class: classProp,
	children,
	...rest
}: HTMLLiAttributes & {
	/** A larger quote; in bento it also spans a 2x2 block. */
	featured?: boolean;
	children?: Snippet;
} = $props();
const section = testimonialSectionState();
</script>

<!-- One quote; put a Testimonial inside. -->
<li
	data-slot="testimonial-section-item"
	data-featured={featured}
	{...rest}
	class={cn(section.styles.item(), classProp)}
>
	{@render children?.()}
</li>
