<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { featureSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLHeadingElement> & { children?: Snippet } = $props();
const section = featureSectionState();
</script>

<h2
	data-slot="feature-section-title"
	id={section.titleId}
	{...rest}
	class={cn(section.styles.title(), classProp)}
>
	{@render children?.()}
</h2>
