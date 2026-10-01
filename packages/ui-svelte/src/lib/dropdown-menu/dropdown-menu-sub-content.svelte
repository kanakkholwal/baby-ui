<script lang="ts">
import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
import { ANCHORED } from "../lib/anchor";
import { cn } from "../lib/cn";
import { menu } from "../lib/menu";

let { class: classProp, ...rest }: DropdownMenuPrimitive.SubContentProps = $props();
</script>

<DropdownMenuPrimitive.Portal>
	<DropdownMenuPrimitive.SubContent
		{...rest}
		data-slot="dropdown-menu-sub-content"
		class={cn(ANCHORED, "static", menu().surface(), "min-w-40", classProp)}
	/>
</DropdownMenuPrimitive.Portal>
