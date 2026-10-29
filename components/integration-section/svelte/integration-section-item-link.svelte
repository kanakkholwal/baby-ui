<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { integrationSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAnchorAttributes & { href: string; children?: Snippet } = $props();
const section = integrationSectionState();
</script>

<!-- "Learn more" under a card; in the cluster it covers the whole tile. -->
<a
	data-slot="integration-section-item-link"
	{...rest}
	class={cn(section.styles.link(), classProp)}
>
	<span>
		{@render children?.()}
		<svg aria-hidden="true" viewBox="0 0 16 16" fill="none" class={section.styles.linkArrow()}>
			<path
				d="m6 4 4 4-4 4"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</span>
</a>
