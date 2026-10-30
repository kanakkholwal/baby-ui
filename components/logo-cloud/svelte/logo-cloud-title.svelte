<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { logoCloudState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLHeadingElement> & { children?: Snippet } = $props();
const cloud = logoCloudState();
</script>

<!-- A short line naming the logos, e.g. "Trusted by teams at". -->
<h2 data-slot="logo-cloud-title" {...rest} class={cn(cloud.styles.title(), classProp)}>
	{@render children?.()}
</h2>
