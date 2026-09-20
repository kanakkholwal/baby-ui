import { Input, Label } from "@baby-ui/react";

export function Example() {
	return (
		<>
			<Label htmlFor="email" required>
				Email
			</Label>
			<Input id="email" type="email" placeholder="you@example.com" />
		</>
	);
}
