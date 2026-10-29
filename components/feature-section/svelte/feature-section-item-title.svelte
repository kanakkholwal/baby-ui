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

<h3
	data-slot="feature-section-item-title"
	{...rest}
	class={cn(section.styles.itemTitle(), classProp)}
>
	{@render children?.()}
</h3>
