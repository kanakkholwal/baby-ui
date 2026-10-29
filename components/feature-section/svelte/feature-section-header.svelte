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

<div
	data-slot="feature-section-header"
	{...rest}
	class={cn(section.styles.header(), classProp)}
>
	{@render children?.()}
</div>
