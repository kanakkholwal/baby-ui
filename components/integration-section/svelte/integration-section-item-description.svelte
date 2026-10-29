<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { integrationSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLParagraphElement> & { children?: Snippet } = $props();
const section = integrationSectionState();
</script>

<p
	data-slot="integration-section-item-description"
	{...rest}
	class={cn(section.styles.itemDescription(), classProp)}
>
	{@render children?.()}
</p>
