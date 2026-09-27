<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
import * as FormPrimitive from "formsnap";
import type { FormPath } from "sveltekit-superforms";
import { cn } from "../lib/cn";
import { form as formStyles } from "./variants";

let {
	ref = $bindable(null),
	class: classProp,
	form,
	name,
	...rest
}: Omit<FormPrimitive.FieldsetProps<T, U>, "child"> = $props();
</script>

<FormPrimitive.Fieldset bind:ref {form} {name} class={cn(formStyles().item(), classProp)} {...rest} />
