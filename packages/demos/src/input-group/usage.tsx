import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
} from "@baby-ui/react";

export function Example() {
	return (
		<InputGroup>
			<InputGroupAddon>
				<InputGroupText>https://</InputGroupText>
			</InputGroupAddon>
			<InputGroupInput aria-label="Domain" placeholder="acme" />
			<InputGroupAddon align="inline-end">
				<InputGroupButton>Check</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	);
}
