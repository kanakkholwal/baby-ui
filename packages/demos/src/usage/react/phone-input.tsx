import { Field, FieldLabel, PhoneInput } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [phone, setPhone] = useState("");
	const [country, setCountry] = useState("US");
	return (
		<Field>
			<FieldLabel htmlFor="phone">Phone</FieldLabel>
			<PhoneInput
				id="phone"
				value={phone}
				onValueChange={setPhone}
				country={country}
				onCountryChange={setCountry}
			/>
		</Field>
	);
}
