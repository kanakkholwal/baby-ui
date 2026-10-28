import {
	Form,
	FormButton,
	FormControl,
	FormField,
	FormFieldErrors,
	FormLabel,
	Input,
} from "@baby-ui/react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const schema = z.object({ email: z.email("Enter a valid email.") });

export function Example() {
	const form = useForm({
		defaultValues: { email: "" },
		validators: { onSubmit: schema },
		onSubmit: ({ value }) => console.log(value),
	});

	return (
		<Form form={form}>
			<form.Field name="email">
				{(field) => (
					<FormField field={field}>
						<FormLabel>Email</FormLabel>
						<FormControl>
							{(props) => (
								<Input
									{...props}
									type="email"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.currentTarget.value)}
								/>
							)}
						</FormControl>
						<FormFieldErrors />
					</FormField>
				)}
			</form.Field>
			<FormButton>Save</FormButton>
		</Form>
	);
}
