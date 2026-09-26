import { OgGithubRepo } from "@baby-ui/react";

export function Example() {
	return (
		<OgGithubRepo
			owner="acme"
			name="toolkit"
			description="The Acme build toolkit."
			language="TypeScript"
			stars="12.4k"
			forks="684"
			issues="23"
		/>
	);
}
