<script lang="ts">
import * as FormPrimitive from "formsnap";
import { cn } from "../lib/cn";
import { form } from "./variants";

let {
	ref = $bindable(null),
	class: classProp,
	errorClasses,
	children: childrenProp,
	...rest
}: Omit<FormPrimitive.FieldErrorsProps, "child"> & {
	errorClasses?: string | null;
} = $props();
</script>

<FormPrimitive.FieldErrors bind:ref class={cn(form().errors(), classProp)} {...rest}>
	{#snippet children({ errors, errorProps })}
		{#if childrenProp}
			{@render childrenProp({ errors, errorProps })}
		{:else}
			{#each errors as error (error)}
				<div {...errorProps} class={cn(errorClasses)}>{error}</div>
			{/each}
		{/if}
	{/snippet}
</FormPrimitive.FieldErrors>
