import { OgAuthorProfile } from "@baby-ui/react";

export function Example() {
	return (
		<OgAuthorProfile
			name="Ada Park"
			role="Staff Engineer at Acme"
			handle="@adapark"
			stats={[
				{ value: "128", label: "Posts" },
				{ value: "12.4k", label: "Followers" },
			]}
		/>
	);
}
