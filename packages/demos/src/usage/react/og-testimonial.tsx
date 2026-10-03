import { OgTestimonial } from "@baby-ui/react";

export function Example() {
	return (
		<OgTestimonial
			quote="We replaced three internal libraries in a week."
			author={{ name: "Maya Chen", role: "Head of Design" }}
			company="Acme"
			rating={5}
		/>
	);
}
