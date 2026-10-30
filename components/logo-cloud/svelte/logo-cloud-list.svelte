<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { logoCloudState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLUListElement> & { children?: Snippet } = $props();
const cloud = logoCloudState();
</script>

<ul data-slot="logo-cloud-list" {...rest} class={cn(cloud.styles.list(), classProp)}>
	{@render children?.()}
</ul>
