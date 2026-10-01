<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "../lib/cn";
import { commandFrame } from "./variants";

let {
	children,
	value,
	keywords = "",
	class: classProp,
	onSelect,
	onclick,
	...rest
}: Omit<CommandPrimitive.ItemProps, "keywords" | "onSelect" | "value"> & {
	value: string;
	keywords?: string;
	/** Fires on click or Enter, like cmdk. `onclick` is an alias. */
	onSelect?: () => void;
	onclick?: () => void;
} = $props();
</script>

<CommandPrimitive.Item
	{value}
	keywords={keywords ? keywords.split(/\s+/) : undefined}
	onSelect={onSelect ?? onclick}
	data-slot="command-item"
	class={cn(commandFrame().item(), classProp)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Item>
