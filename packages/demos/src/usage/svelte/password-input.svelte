<script lang="ts">
import { defaultPasswordRules, Field, FieldLabel, PasswordInput } from "@baby-ui/svelte";

const rules = defaultPasswordRules();
let password = $state("");
</script>

<Field>
	<FieldLabel for="password">Password</FieldLabel>
	<PasswordInput id="password" bind:value={password} {rules} />
</Field>
