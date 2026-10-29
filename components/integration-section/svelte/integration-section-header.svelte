<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { integrationSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
const section = integrationSectionState();
</script>

<div
	data-slot="integration-section-header"
	{...rest}
	class={cn(section.styles.header(), classProp)}
>
	{@render children?.()}
</div>
