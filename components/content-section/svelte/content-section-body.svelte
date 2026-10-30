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

<!-- The prose: paragraphs, with `<strong>` lifted to full contrast. -->
<div data-slot="content-section-body" {...rest} class={cn(section.styles.body(), classProp)}>
	{@render children?.()}
</div>
