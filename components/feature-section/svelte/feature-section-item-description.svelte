<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { featureSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLParagraphElement> & { children?: Snippet } = $props();
const section = featureSectionState();
</script>

<p
	data-slot="feature-section-item-description"
	{...rest}
	class={cn(section.styles.itemDescription(), classProp)}
>
	{@render children?.()}
</p>
