<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLLiAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { featureSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLLiAttributes & { children?: Snippet } = $props();
const section = featureSectionState();
</script>

<li data-slot="feature-section-item" {...rest} class={cn(section.styles.item(), classProp)}>
	{@render children?.()}
</li>
