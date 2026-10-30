<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { logoCloudState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
const cloud = logoCloudState();
</script>

<!-- Holds the list and the link, so hovering anywhere over the logos reveals it. -->
<div data-slot="logo-cloud-content" {...rest} class={cn(cloud.styles.stage(), classProp)}>
	{@render children?.()}
</div>
