<script lang="ts">
import { Field, FieldDescription, FieldError, FieldLabel, Input } from "@baby-ui/svelte";

let { error }: { error?: string } = $props();
let email = $state("");
</script>

<Field data-invalid={error ? true : undefined}>
	<FieldLabel for="email">Email</FieldLabel>
	<Input
		id="email"
		type="email"
		bind:value={email}
		aria-invalid={error ? true : undefined}
		aria-describedby="email-hint email-error"
	/>
	<FieldDescription id="email-hint">We send receipts here.</FieldDescription>
	<FieldError id="email-error" errors={[{ message: error }]} />
</Field>
