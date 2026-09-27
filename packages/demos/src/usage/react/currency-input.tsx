import { CurrencyInput, Field, FieldLabel } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	// Minor units: 1999 is $19.99.
	const [price, setPrice] = useState<number | null>(1999);
	return (
		<Field>
			<FieldLabel htmlFor="price">Price</FieldLabel>
			<CurrencyInput id="price" value={price} onValueChange={setPrice} currency="USD" />
		</Field>
	);
}
