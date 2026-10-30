<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLLiAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { logoCloudState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLLiAttributes & { children?: Snippet } = $props();
const cloud = logoCloudState();
</script>

<!-- One logo; give its image the company name as alt text. -->
<li data-slot="logo-cloud-item" {...rest} class={cn(cloud.styles.item(), classProp)}>
	{@render children?.()}
</li>
