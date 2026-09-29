<script lang="ts">
import { defaultPasswordRules, Field, FieldLabel, PasswordInput } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof PasswordInput>>(props));

const rules = defaultPasswordRules(10);
let password = $state("");
</script>

<Field class="w-full max-w-sm">
	<FieldLabel for="demo-new-password">Create a password</FieldLabel>
	<PasswordInput
		id="demo-new-password"
		bind:value={password}
		{rules}
		feedback={p.feedback ?? "both"}
		size={p.size ?? "md"}
	/>
</Field>
