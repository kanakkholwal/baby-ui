"use client";

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
} from "@baby-ui/react";
import { type ComponentProps, type FormEvent, useState } from "react";
import {
	SIGNUP_ORDER,
	SIGNUP_ROLES,
	type SignupErrors,
	type SignupValues,
	validateSignup,
} from "../data/forms";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

function MailIcon() {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<rect
				x="2"
				y="3.5"
				width="12"
				height="9"
				rx="1.5"
				stroke="currentColor"
				strokeWidth="1.3"
			/>
			<path
				d="m2.5 4.5 5.5 4 5.5-4"
				stroke="currentColor"
				strokeWidth="1.3"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function EyeIcon({ off }: { off: boolean }) {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path
				d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8Z"
				stroke="currentColor"
				strokeWidth="1.3"
			/>
			<circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
			{off ? (
				<path
					d="m3 3 10 10"
					stroke="currentColor"
					strokeWidth="1.3"
					strokeLinecap="round"
				/>
			) : null}
		</svg>
	);
}

export function FieldDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Field>>(props);
	const orientation = p.orientation ?? "vertical";
	const size = p.size ?? "default";
	const [values, setValues] = useState<SignupValues>({
		name: "",
		email: "",
		password: "",
		role: "",
	});
	const [errors, setErrors] = useState<SignupErrors>({});
	const [showPassword, setShowPassword] = useState(false);
	const [done, setDone] = useState(false);

	const set = (key: keyof SignupValues) => (value: string) =>
		setValues((current) => ({ ...current, [key]: value }));

	function submit(event: FormEvent) {
		event.preventDefault();
		const next = validateSignup(values);
		setErrors(next);
		setDone(Object.keys(next).length === 0);
		const first = SIGNUP_ORDER.find((key) => next[key]);
		// After React commits the error state, so the described-by targets exist.
		if (first)
			requestAnimationFrame(() => document.getElementById(`signup-${first}`)?.focus());
	}

	return (
		<form className="w-full max-w-sm" noValidate onSubmit={submit}>
			<FieldSet size={size}>
				<FieldLegend variant={size === "sm" ? "eyebrow" : "legend"}>
					Create your account
				</FieldLegend>
				<FieldDescription>Free for personal projects. No card needed.</FieldDescription>
				<FieldGroup size={size}>
					<Field
						orientation={orientation}
						size={size}
						data-invalid={errors.name ? true : undefined}
					>
						<FieldLabel htmlFor="signup-name">Full name</FieldLabel>
						<Input
							id="signup-name"
							autoComplete="name"
							value={values.name}
							onChange={(e) => set("name")(e.currentTarget.value)}
							aria-invalid={errors.name ? true : undefined}
							aria-describedby={errors.name ? "signup-name-error" : undefined}
						/>
						<FieldError id="signup-name-error" errors={[{ message: errors.name }]} />
					</Field>
					<Field
						orientation={orientation}
						size={size}
						data-invalid={errors.email ? true : undefined}
					>
						<FieldLabel htmlFor="signup-email">Work email</FieldLabel>
						<InputGroup>
							<InputGroupAddon>
								<MailIcon />
							</InputGroupAddon>
							<InputGroupInput
								id="signup-email"
								type="email"
								autoComplete="email"
								placeholder="you@company.com"
								value={values.email}
								onChange={(e) => set("email")(e.currentTarget.value)}
								aria-invalid={errors.email ? true : undefined}
								aria-describedby={errors.email ? "signup-email-error" : undefined}
							/>
						</InputGroup>
						<FieldError id="signup-email-error" errors={[{ message: errors.email }]} />
					</Field>
					<Field
						orientation={orientation}
						data-invalid={errors.password ? true : undefined}
					>
						<FieldLabel htmlFor="signup-password">Password</FieldLabel>
						<InputGroup>
							<InputGroupInput
								id="signup-password"
								type={showPassword ? "text" : "password"}
								autoComplete="new-password"
								value={values.password}
								onChange={(e) => set("password")(e.currentTarget.value)}
								aria-invalid={errors.password ? true : undefined}
								aria-describedby={`signup-password-hint${errors.password ? " signup-password-error" : ""}`}
							/>
							<InputGroupAddon align="inline-end">
								<InputGroupButton
									size="icon-xs"
									aria-label={showPassword ? "Hide password" : "Show password"}
									aria-pressed={showPassword}
									onClick={() => setShowPassword((on) => !on)}
								>
									<EyeIcon off={showPassword} />
								</InputGroupButton>
							</InputGroupAddon>
						</InputGroup>
						<FieldDescription id="signup-password-hint">
							At least 8 characters.
						</FieldDescription>
						<FieldError
							id="signup-password-error"
							errors={[{ message: errors.password }]}
						/>
					</Field>
					<Field
						orientation={orientation}
						size={size}
						data-invalid={errors.role ? true : undefined}
					>
						<FieldLabel htmlFor="signup-role">Role</FieldLabel>
						<NativeSelect
							id="signup-role"
							className="w-full"
							value={values.role}
							onChange={(e) => set("role")(e.currentTarget.value)}
							aria-invalid={errors.role ? true : undefined}
							aria-describedby={errors.role ? "signup-role-error" : undefined}
						>
							{SIGNUP_ROLES.map((role) => (
								<NativeSelectOption
									key={role.value}
									value={role.value}
									disabled={!role.value}
								>
									{role.label}
								</NativeSelectOption>
							))}
						</NativeSelect>
						<FieldError id="signup-role-error" errors={[{ message: errors.role }]} />
					</Field>
					<Field orientation="horizontal">
						<Button type="submit">Create account</Button>
						{done ? (
							<p role="status" className="text-muted-foreground text-sm">
								Account ready.
							</p>
						) : null}
					</Field>
				</FieldGroup>
			</FieldSet>
		</form>
	);
}
