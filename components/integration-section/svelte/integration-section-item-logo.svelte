<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { integrationSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLSpanElement> & { children?: Snippet } = $props();
const section = integrationSectionState();
</script>

<!-- The tool's mark; pass an `<img>` or inline `<svg>`. -->
<span
	data-slot="integration-section-item-logo"
	aria-hidden="true"
	{...rest}
	class={cn(section.styles.logo(), classProp)}
>
	{@render children?.()}
</span>
