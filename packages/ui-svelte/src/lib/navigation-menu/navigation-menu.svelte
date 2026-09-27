<script lang="ts">
import { NavigationMenu as NavigationMenuPrimitive } from "bits-ui";
import { cn } from "../lib/cn";
import NavigationMenuViewport from "./navigation-menu-viewport.svelte";
import { navigationMenu } from "./variants";

let {
	ref = $bindable(null),
	value = $bindable(""),
	viewport = true,
	class: classProp,
	children,
	...rest
}: NavigationMenuPrimitive.RootProps & {
	/** Render the shared panel that slides between triggers. */
	viewport?: boolean;
} = $props();

// bits-ui sizes the viewport but leaves it at the root's start; slide it under the open trigger.
let offset = $state(0);
$effect(() => {
	const root = ref;
	if (!value || !root) return;
	const trigger = root.querySelector<HTMLElement>(
		"[data-navigation-menu-trigger][data-state=open]",
	);
	const panel = root.querySelector<HTMLElement>("[data-navigation-menu-viewport]");
	if (!trigger) return;
	const rootBox = root.getBoundingClientRect();
	const left = trigger.getBoundingClientRect().left - rootBox.left;
	const room = window.innerWidth - rootBox.left - (panel?.offsetWidth ?? 0) - 8;
	offset = Math.max(-rootBox.left + 8, Math.min(left, room));
});
</script>

<NavigationMenuPrimitive.Root
	bind:ref
	bind:value
	data-slot="navigation-menu"
	data-viewport={viewport}
	class={cn(navigationMenu().root(), classProp)}
	{...rest}
>
	{@render children?.()}
	{#if viewport}
		<NavigationMenuViewport {offset} />
	{/if}
</NavigationMenuPrimitive.Root>
