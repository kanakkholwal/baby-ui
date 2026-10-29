<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { integrationSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLHeadingElement> & { children?: Snippet } = $props();
const section = integrationSectionState();
</script>

<h2
	data-slot="integration-section-title"
	id={section.titleId}
	{...rest}
	class={cn(section.styles.title(), classProp)}
>
	{@render children?.()}
</h2>
