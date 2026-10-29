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

<h3
	data-slot="integration-section-item-name"
	{...rest}
	class={cn(section.styles.name(), classProp)}
>
	{@render children?.()}
</h3>
