<script lang="ts">
import { Input } from "@baby-ui/svelte";
import {
	FormButton,
	FormControl,
	FormDescription,
	FormField,
	FormFieldErrors,
	FormLabel,
} from "@baby-ui/svelte/form";
import type { ComponentProps } from "svelte";
import { defaults, superForm } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { z } from "zod";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof FormField>>(props));

const spacing = $derived(p.spacing ?? "comfortable");

const schema = z.object({
	name: z.string().trim().min(1, "Enter your name."),
	email: z.email("Enter an email like name@company.com."),
});

let saved = $state(false);

// SPA mode: validation runs in the browser, so the demo needs no server action.
const form = superForm(defaults(zod4(schema)), {
	SPA: true,
	validators: zod4(schema),
	onUpdate: ({ form: result }) => {
		saved = result.valid;
	},
});
const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="flex w-full max-w-sm flex-col gap-5" novalidate>
	<FormField {form} name="name" {spacing}>
		<FormControl>
			{#snippet children({ props: control })}
				<FormLabel>Full name</FormLabel>
				<Input {...control} autocomplete="name" bind:value={$formData.name} />
			{/snippet}
		</FormControl>
		<FormFieldErrors />
	</FormField>
	<FormField {form} name="email" {spacing}>
		<FormControl>
			{#snippet children({ props: control })}
				<FormLabel>Work email</FormLabel>
				<Input {...control} type="email" autocomplete="email" bind:value={$formData.email} />
			{/snippet}
		</FormControl>
		<FormDescription>We send the sign-in link here.</FormDescription>
		<FormFieldErrors />
	</FormField>
	<div class="flex items-center gap-3">
		<FormButton>Save profile</FormButton>
		{#if saved}<p role="status" class="text-muted-foreground text-sm">Saved.</p>{/if}
	</div>
</form>
