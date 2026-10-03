import { OgProductShop } from "@baby-ui/react";

export function Example() {
	return (
		<OgProductShop
			name="Aero Knit Runner"
			image="https://example.com/runner.png"
			price="$129"
			comparePrice="$160"
			rating={4.5}
			reviews="1,204 reviews"
			stock="In stock"
		/>
	);
}
