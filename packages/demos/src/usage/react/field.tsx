import { Field, FieldDescription, FieldError, FieldLabel, Input } from "@baby-ui/react";

export function Example({ error }: { error?: string }) {
	return (
		<Field data-invalid={error ? true : undefined}>
			<FieldLabel htmlFor="email">Email</FieldLabel>
			<Input
				id="email"
				type="email"
				aria-invalid={error ? true : undefined}
				aria-describedby="email-hint email-error"
			/>
			<FieldDescription id="email-hint">We send receipts here.</FieldDescription>
			<FieldError id="email-error" errors={[{ message: error }]} />
		</Field>
	);
}
