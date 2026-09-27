import { defaultPasswordRules, Field, FieldLabel, PasswordInput } from "@baby-ui/react";
import { useState } from "react";

const rules = defaultPasswordRules();

export function Example() {
	const [password, setPassword] = useState("");
	return (
		<Field>
			<FieldLabel htmlFor="password">Password</FieldLabel>
			<PasswordInput
				id="password"
				value={password}
				onValueChange={setPassword}
				rules={rules}
			/>
		</Field>
	);
}
