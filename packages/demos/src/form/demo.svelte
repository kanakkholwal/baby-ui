<script lang="ts">
import { Input } from "@baby-ui/svelte";
import {
	Form,
	FormButton,
	FormControl,
	FormDescription,
	FormField,
	FormFieldErrors,
	FormLabel,
} from "@baby-ui/svelte/form";
import { createForm } from "@tanstack/svelte-form";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { PROFILE_DEFAULTS, PROFILE_SCHEMA } from "../data/profile-form";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof FormField>>(props));

let saved = $state(false);

const form = createForm(() => ({
	defaultValues: PROFILE_DEFAULTS,
	validators: { onBlur: PROFILE_SCHEMA, onSubmit: PROFILE_SCHEMA },
	onSubmit: () => {
		saved = true;
	},
}));
</script>

<Form {form} class="flex w-full max-w-sm flex-col gap-5" novalidate>
	<form.Field name="name">
		{#snippet children(field)}
			<FormField {field} orientation={p.orientation} spacing={p.spacing}>
				<FormLabel>Full name</FormLabel>
				<FormControl>
					{#snippet child({ props: control })}
						<Input
							{...control}
							autocomplete="name"
							value={field.state.value}
							oninput={(e) => field.handleChange(e.currentTarget.value)}
						/>
					{/snippet}
				</FormControl>
				<FormFieldErrors />
			</FormField>
		{/snippet}
	</form.Field>
	<form.Field name="email">
		{#snippet children(field)}
			<FormField {field} orientation={p.orientation} spacing={p.spacing}>
				<FormLabel>Work email</FormLabel>
				<FormControl>
					{#snippet child({ props: control })}
						<Input
							{...control}
							type="email"
							autocomplete="email"
							value={field.state.value}
							oninput={(e) => field.handleChange(e.currentTarget.value)}
						/>
					{/snippet}
				</FormControl>
				<FormDescription>We send the sign-in link here.</FormDescription>
				<FormFieldErrors />
			</FormField>
		{/snippet}
	</form.Field>
	<div class="flex items-center gap-3">
		<FormButton>Save profile</FormButton>
		{#if saved}<p role="status" class="text-muted-foreground text-sm">Saved.</p>{/if}
	</div>
</Form>
