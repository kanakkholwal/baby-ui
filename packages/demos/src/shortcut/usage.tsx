import { Button, Shortcut } from "@baby-ui/react";

export function Example() {
	return (
		<Button>
			Save
			<Shortcut shortcut="cmd+s" />
		</Button>
	);
}
