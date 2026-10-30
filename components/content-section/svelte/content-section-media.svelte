<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { contentSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
const section = contentSectionState();
</script>

<!-- An image in a soft rim that eases in on hover. -->
<div data-slot="content-section-media" {...rest} class={cn(section.styles.media(), classProp)}>
	{@render children?.()}
</div>
