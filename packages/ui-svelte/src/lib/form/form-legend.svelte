<script lang="ts">
import * as FormPrimitive from "formsnap";
import { cn } from "../lib/cn";
import { form } from "./variants";

let {
	ref = $bindable(null),
	class: classProp,
	...rest
}: Omit<FormPrimitive.LegendProps, "child"> = $props();
</script>

<FormPrimitive.Legend bind:ref class={cn(form().legend(), classProp)} {...rest} />
