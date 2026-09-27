<script lang="ts">
import * as FormPrimitive from "formsnap";
import Label from "../label/label.svelte";
import { cn } from "../lib/cn";
import { form } from "./variants";

let {
	ref = $bindable(null),
	children,
	class: classProp,
	...rest
}: Omit<FormPrimitive.LabelProps, "child"> = $props();
</script>

<FormPrimitive.Label {...rest} bind:ref>
	{#snippet child({ props })}
		<Label {...props} data-slot="form-label" class={cn(form().label(), classProp)}>
			{@render children?.()}
		</Label>
	{/snippet}
</FormPrimitive.Label>
