import { Tooltip } from "@baby-ui/react";

export function Example() {
	return (
		<Tooltip label="Copy to clipboard" placement="top">
			<button type="button">Copy</button>
		</Tooltip>
	);
}
