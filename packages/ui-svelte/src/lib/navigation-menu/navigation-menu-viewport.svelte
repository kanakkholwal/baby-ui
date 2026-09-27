<script lang="ts">
import { NavigationMenu as NavigationMenuPrimitive } from "bits-ui";
import { cn } from "../lib/cn";
import { navigationMenu } from "./variants";

let {
	ref = $bindable(null),
	offset = 0,
	class: classProp,
	...rest
}: NavigationMenuPrimitive.ViewportProps & {
	/** Horizontal distance from the root's start to the open trigger, in px. */
	offset?: number;
} = $props();
</script>

<div
	class="absolute start-0 top-full isolate z-50 flex pt-1.5 transition-[translate] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none"
	style:translate="{offset}px 0"
>
	<NavigationMenuPrimitive.Viewport
		bind:ref
		data-slot="navigation-menu-viewport"
		class={cn(
			navigationMenu().viewport(),
			"h-(--bits-navigation-menu-viewport-height) w-(--bits-navigation-menu-viewport-width)",
			classProp,
		)}
		{...rest}
	/>
</div>
