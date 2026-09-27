<script lang="ts">
import {
	defaultPasswordRules,
	Field,
	FieldLabel,
	PasswordInput,
	type PasswordInputFeedback,
	type PasswordInputSize,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const rules = defaultPasswordRules(10);
let password = $state("");
</script>

<Field class="w-full max-w-sm">
	<FieldLabel for="demo-new-password">Create a password</FieldLabel>
	<PasswordInput
		id="demo-new-password"
		bind:value={password}
		{rules}
		feedback={(props.feedback as PasswordInputFeedback) ?? "both"}
		size={(props.size as PasswordInputSize) ?? "md"}
	/>
</Field>
