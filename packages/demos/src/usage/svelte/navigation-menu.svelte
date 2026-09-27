<script lang="ts">
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@baby-ui/svelte";
</script>

<NavigationMenu>
	<NavigationMenuList>
		<NavigationMenuItem value="product">
			<NavigationMenuTrigger>Product</NavigationMenuTrigger>
			<NavigationMenuContent>
				<NavigationMenuLink href="/analytics">Analytics</NavigationMenuLink>
				<NavigationMenuLink href="/alerts">Alerts</NavigationMenuLink>
			</NavigationMenuContent>
		</NavigationMenuItem>
	</NavigationMenuList>
</NavigationMenu>
