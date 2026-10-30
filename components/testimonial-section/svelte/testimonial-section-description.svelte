<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { testimonialSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLParagraphElement> & { children?: Snippet } = $props();
const section = testimonialSectionState();
</script>

<p
	data-slot="testimonial-section-description"
	{...rest}
	class={cn(section.styles.description(), classProp)}
>
	{@render children?.()}
</p>
