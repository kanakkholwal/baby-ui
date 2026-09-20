import { Toggle, Toolbar } from "@baby-ui/react";

export function Example() {
	return (
		<Toolbar label="Text formatting">
			<Toggle label="Bold">B</Toggle>
			<Toggle label="Italic">I</Toggle>
			<Toggle label="Underline">U</Toggle>
		</Toolbar>
	);
}
