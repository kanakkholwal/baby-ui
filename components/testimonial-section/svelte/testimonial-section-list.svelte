<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { testimonialSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLUListElement> & { children?: Snippet } = $props();
const section = testimonialSectionState();
</script>

<ul
	data-slot="testimonial-section-list"
	{...rest}
	class={cn(section.styles.list(), classProp)}
>
	{@render children?.()}
</ul>
