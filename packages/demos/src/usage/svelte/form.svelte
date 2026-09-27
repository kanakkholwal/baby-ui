<script lang="ts">
import {
	FormButton,
	FormControl,
	FormField,
	FormFieldErrors,
	FormLabel,
	Input,
} from "@baby-ui/svelte";
import { defaults, superForm } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { z } from "zod";

const schema = z.object({ email: z.email("Enter a valid email.") });
// Pass your page's `data.form` instead of defaults() when the form posts to an action.
const form = superForm(defaults(zod4(schema)), { SPA: true, validators: zod4(schema) });
const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<FormField {form} name="email">
		<FormControl>
			{#snippet children({ props })}
				<FormLabel>Email</FormLabel>
				<Input {...props} type="email" bind:value={$formData.email} />
			{/snippet}
		</FormControl>
		<FormFieldErrors />
	</FormField>
	<FormButton>Save</FormButton>
</form>
