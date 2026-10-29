<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLLiAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { integrationSectionState } from "./context";

let {
	featured = false,
	class: classProp,
	children,
	...rest
}: HTMLLiAttributes & {
	/** Highlights one item, e.g. your own product at the centre of the cluster. */
	featured?: boolean;
	children?: Snippet;
} = $props();
const section = integrationSectionState();
</script>

<li
	data-slot="integration-section-item"
	data-featured={featured}
	{...rest}
	class={cn(section.styles.item(), classProp)}
>
	{@render children?.()}
</li>
