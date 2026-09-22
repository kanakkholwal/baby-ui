import { Toolbar, ToolbarButton } from "@baby-ui/react";

export function Example() {
	return (
		<Toolbar label="Text formatting">
			<ToolbarButton aria-label="Bold">B</ToolbarButton>
			<ToolbarButton aria-label="Italic">I</ToolbarButton>
			<ToolbarButton aria-label="Underline">U</ToolbarButton>
		</Toolbar>
	);
}
