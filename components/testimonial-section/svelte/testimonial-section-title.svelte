<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { testimonialSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLHeadingElement> & { children?: Snippet } = $props();
const section = testimonialSectionState();
</script>

<h2
	data-slot="testimonial-section-title"
	id={section.titleId}
	{...rest}
	class={cn(section.styles.title(), classProp)}
>
	{@render children?.()}
</h2>
