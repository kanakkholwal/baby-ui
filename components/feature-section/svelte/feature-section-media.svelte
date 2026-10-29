<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { featureSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
const section = featureSectionState();
</script>

<!-- A visual beside the list in split; below it otherwise. -->
<div data-slot="feature-section-media" {...rest} class={cn(section.styles.media(), classProp)}>
	{@render children?.()}
</div>
