<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { integrationSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLUListElement> & { children?: Snippet } = $props();
const section = integrationSectionState();
</script>

<ul
	data-slot="integration-section-list"
	{...rest}
	class={cn(section.styles.list(), classProp)}
>
	{@render children?.()}
</ul>
