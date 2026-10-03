<script lang="ts">
import {
	Form,
	FormButton,
	FormControl,
	FormField,
	FormFieldErrors,
	FormLabel,
} from "@baby-ui/svelte/form";
import { Input } from "@baby-ui/svelte/input";
import { createForm } from "@tanstack/svelte-form";
import { z } from "zod";

const schema = z.object({ email: z.email("Enter a valid email.") });

const form = createForm(() => ({
	defaultValues: { email: "" },
	validators: { onSubmit: schema },
	onSubmit: ({ value }) => console.log(value),
}));
</script>

<Form {form}>
	<form.Field name="email">
		{#snippet children(field)}
			<FormField {field}>
				<FormLabel>Email</FormLabel>
				<FormControl>
					{#snippet child({ props })}
						<Input
							{...props}
							type="email"
							value={field.state.value}
							oninput={(e) => field.handleChange(e.currentTarget.value)}
						/>
					{/snippet}
				</FormControl>
				<FormFieldErrors />
			</FormField>
		{/snippet}
	</form.Field>
	<FormButton>Save</FormButton>
</Form>
