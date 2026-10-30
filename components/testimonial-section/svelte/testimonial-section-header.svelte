<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { testimonialSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
const section = testimonialSectionState();
</script>

<div
	data-slot="testimonial-section-header"
	{...rest}
	class={cn(section.styles.header(), classProp)}
>
	{@render children?.()}
</div>
