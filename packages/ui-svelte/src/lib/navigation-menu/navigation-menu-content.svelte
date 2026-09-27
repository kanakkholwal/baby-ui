<script lang="ts">
import { NavigationMenu as NavigationMenuPrimitive } from "bits-ui";
import { cn } from "../lib/cn";
import { navigationMenu } from "./variants";

let {
	ref = $bindable(null),
	class: classProp,
	...rest
}: NavigationMenuPrimitive.ContentProps = $props();
</script>

<NavigationMenuPrimitive.Content
	bind:ref
	data-slot="navigation-menu-content"
	class={cn(navigationMenu().content(), classProp)}
	{...rest}
/>
