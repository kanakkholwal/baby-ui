<script lang="ts">
import {
	Button,
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	NativeSelect,
	NativeSelectOption,
} from "@baby-ui/svelte";
import { type ComponentProps, tick } from "svelte";
import {
	SIGNUP_ORDER,
	SIGNUP_ROLES,
	type SignupErrors,
	type SignupValues,
	validateSignup,
} from "../data/forms";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Field>>(props));

const orientation = $derived(p.orientation ?? "vertical");

let values = $state<SignupValues>({ name: "", email: "", password: "", role: "" });
let errors = $state<SignupErrors>({});
let showPassword = $state(false);
let done = $state(false);

async function submit(event: SubmitEvent) {
	event.preventDefault();
	errors = validateSignup(values);
	done = Object.keys(errors).length === 0;
	await tick();
	const first = SIGNUP_ORDER.find((key) => errors[key]);
	if (first) document.getElementById(`signup-${first}`)?.focus();
}
</script>

<form class="w-full max-w-sm" novalidate onsubmit={submit}>
	<FieldSet>
		<FieldLegend>Create your account</FieldLegend>
		<FieldDescription>Free for personal projects. No card needed.</FieldDescription>
		<FieldGroup>
			<Field {orientation} data-invalid={errors.name ? true : undefined}>
				<FieldLabel for="signup-name">Full name</FieldLabel>
				<Input
					id="signup-name"
					autocomplete="name"
					bind:value={values.name}
					aria-invalid={errors.name ? true : undefined}
					aria-describedby={errors.name ? "signup-name-error" : undefined}
				/>
				<FieldError id="signup-name-error" errors={[{ message: errors.name }]} />
			</Field>
			<Field {orientation} data-invalid={errors.email ? true : undefined}>
				<FieldLabel for="signup-email">Work email</FieldLabel>
				<InputGroup>
					<InputGroupAddon>
						<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
							<rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" stroke-width="1.3" />
							<path d="m2.5 4.5 5.5 4 5.5-4" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" />
						</svg>
					</InputGroupAddon>
					<InputGroupInput
						id="signup-email"
						type="email"
						autocomplete="email"
						placeholder="you@company.com"
						bind:value={values.email}
						aria-invalid={errors.email ? true : undefined}
						aria-describedby={errors.email ? "signup-email-error" : undefined}
					/>
				</InputGroup>
				<FieldError id="signup-email-error" errors={[{ message: errors.email }]} />
			</Field>
			<Field {orientation} data-invalid={errors.password ? true : undefined}>
				<FieldLabel for="signup-password">Password</FieldLabel>
				<InputGroup>
					<InputGroupInput
						id="signup-password"
						type={showPassword ? "text" : "password"}
						autocomplete="new-password"
						bind:value={values.password}
						aria-invalid={errors.password ? true : undefined}
						aria-describedby="signup-password-hint{errors.password ? ' signup-password-error' : ''}"
					/>
					<InputGroupAddon align="inline-end">
						<InputGroupButton
							size="icon-xs"
							aria-label={showPassword ? "Hide password" : "Show password"}
							aria-pressed={showPassword}
							onclick={() => (showPassword = !showPassword)}
						>
							<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
								<path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.3" />
								<circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.3" />
								{#if showPassword}<path d="m3 3 10 10" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />{/if}
							</svg>
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
				<FieldDescription id="signup-password-hint">At least 8 characters.</FieldDescription>
				<FieldError id="signup-password-error" errors={[{ message: errors.password }]} />
			</Field>
			<Field {orientation} data-invalid={errors.role ? true : undefined}>
				<FieldLabel for="signup-role">Role</FieldLabel>
				<NativeSelect
					id="signup-role"
					class="w-full"
					bind:value={values.role}
					aria-invalid={errors.role ? true : undefined}
					aria-describedby={errors.role ? "signup-role-error" : undefined}
				>
					{#each SIGNUP_ROLES as role (role.value)}
						<NativeSelectOption value={role.value} disabled={!role.value}>{role.label}</NativeSelectOption>
					{/each}
				</NativeSelect>
				<FieldError id="signup-role-error" errors={[{ message: errors.role }]} />
			</Field>
			<Field orientation="horizontal">
				<Button type="submit">Create account</Button>
				{#if done}<p role="status" class="text-muted-foreground text-sm">Account ready.</p>{/if}
			</Field>
		</FieldGroup>
	</FieldSet>
</form>
