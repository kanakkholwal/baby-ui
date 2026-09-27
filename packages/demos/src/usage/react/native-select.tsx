import { NativeSelect, NativeSelectOption } from "@baby-ui/react";

export function Example() {
	return (
		<NativeSelect aria-label="Region" defaultValue="fra">
			<NativeSelectOption value="fra">Frankfurt</NativeSelectOption>
			<NativeSelectOption value="iad">Virginia</NativeSelectOption>
		</NativeSelect>
	);
}
