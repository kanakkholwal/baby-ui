<script lang="ts">
import * as FormPrimitive from "formsnap";
import { cn } from "../lib/cn";
import { form } from "./variants";

let {
	ref = $bindable(null),
	class: classProp,
	...rest
}: Omit<FormPrimitive.DescriptionProps, "child"> = $props();
</script>

<FormPrimitive.Description
	bind:ref
	data-slot="form-description"
	class={cn(form().description(), classProp)}
	{...rest}
/>
