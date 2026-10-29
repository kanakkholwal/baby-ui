<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { featureSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLUListElement> & { children?: Snippet } = $props();
const section = featureSectionState();
</script>

<ul data-slot="feature-section-list" {...rest} class={cn(section.styles.list(), classProp)}>
	{@render children?.()}
</ul>
