<script lang="ts">
import type { HTMLFieldsetAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { field } from "./variants";

let {
	ref = $bindable(null),
	class: classProp,
	children,
	...rest
}: HTMLFieldsetAttributes & { ref?: HTMLFieldSetElement | null } = $props();
</script>

<fieldset bind:this={ref} data-slot="field-set" class={cn(field().set(), classProp)} {...rest}>
	{@render children?.()}
</fieldset>
