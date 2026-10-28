import { OgScatter } from "@baby-ui/react";

export function Example() {
	return (
		<OgScatter
			name="Acme"
			images={[
				"https://acme.dev/og/1.png",
				"https://acme.dev/og/2.png",
				"https://acme.dev/og/3.png",
			]}
		/>
	);
}
