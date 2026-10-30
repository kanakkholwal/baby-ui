<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { logoCloudState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAnchorAttributes & { href: string; children?: Snippet } = $props();
const cloud = logoCloudState();
</script>

<!-- "See all customers": over the logos on hover with a mouse, under them on touch. -->
<a data-slot="logo-cloud-link" {...rest} class={cn(cloud.styles.link(), classProp)}>
	{@render children?.()}
	<svg aria-hidden="true" viewBox="0 0 16 16" fill="none" class={cloud.styles.linkArrow()}>
		<path
			d="m6 4 4 4-4 4"
			stroke="currentColor"
			stroke-width="1.6"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</a>
