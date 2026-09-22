<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";

let {
	open = $bindable(false),
	value = $bindable(""),
	items = [],
	...rest
}: Omit<SelectPrimitive.RootProps, "type" | "value" | "onValueChange" | "items"> & {
	value?: string;
	items?: { value: string; label: string; disabled?: boolean }[];
} = $props();
</script>

<SelectPrimitive.Root bind:open bind:value type="single" {items} {...rest} />
