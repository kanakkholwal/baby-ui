"use client";

import {
	Form,
	FormButton,
	FormControl,
	FormDescription,
	FormField,
	FormFieldErrors,
	FormLabel,
	Input,
} from "@baby-ui/react";
import { useForm } from "@tanstack/react-form";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";
import { PROFILE_DEFAULTS, PROFILE_SCHEMA } from "../data/profile-form";

type Props = Record<string, unknown>;

export function FormDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof FormField>>(props);
	const [saved, setSaved] = useState(false);
	const form = useForm({
		defaultValues: PROFILE_DEFAULTS,
		validators: { onBlur: PROFILE_SCHEMA, onSubmit: PROFILE_SCHEMA },
		onSubmit: () => setSaved(true),
	});

	return (
		<Form form={form} className="flex w-full max-w-sm flex-col gap-5" noValidate>
			<form.Field name="name">
				{(field) => (
					<FormField field={field} orientation={p.orientation} spacing={p.spacing}>
						<FormLabel>Full name</FormLabel>
						<FormControl>
							{(control) => (
								<Input
									{...control}
									autoComplete="name"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.currentTarget.value)}
								/>
							)}
						</FormControl>
						<FormFieldErrors />
					</FormField>
				)}
			</form.Field>
			<form.Field name="email">
				{(field) => (
					<FormField field={field} orientation={p.orientation} spacing={p.spacing}>
						<FormLabel>Work email</FormLabel>
						<FormControl>
							{(control) => (
								<Input
									{...control}
									type="email"
									autoComplete="email"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.currentTarget.value)}
								/>
							)}
						</FormControl>
						<FormDescription>We send the sign-in link here.</FormDescription>
						<FormFieldErrors />
					</FormField>
				)}
			</form.Field>
			<div className="flex items-center gap-3">
				<FormButton>Save profile</FormButton>
				{saved ? (
					<p role="status" className="text-muted-foreground text-sm">
						Saved.
					</p>
				) : null}
			</div>
		</Form>
	);
}
