<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
import * as FormPrimitive from "formsnap";
import type { HTMLAttributes } from "svelte/elements";
import type { FormPath } from "sveltekit-superforms";
import { cn } from "../lib/cn";
import { type FormSpacing, form as formStyles } from "./variants";

let {
	ref = $bindable(null),
	class: classProp,
	form,
	name,
	spacing = "comfortable",
	children: childrenProp,
	...rest
}: FormPrimitive.FieldProps<T, U> &
	Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
		ref?: HTMLDivElement | null;
		spacing?: FormSpacing;
	} = $props();
</script>

<FormPrimitive.Field {form} {name}>
	{#snippet children({ constraints, errors, tainted, value })}
		<div
			bind:this={ref}
			data-slot="form-item"
			class={cn(formStyles({ spacing }).item(), classProp)}
			{...rest}
		>
			{@render childrenProp?.({ constraints, errors, tainted, value: value as T[U] })}
		</div>
	{/snippet}
</FormPrimitive.Field>
