import { OgJobPosting } from "@baby-ui/react";

export function Example() {
	return (
		<OgJobPosting
			title="Senior Product Designer"
			company="Acme"
			badge="We're hiring"
			team="Design team"
			location="Remote, EU"
			remote
			salary="$160k to $200k"
		/>
	);
}
