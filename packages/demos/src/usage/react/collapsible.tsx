import { Collapsible } from "@baby-ui/react";

export function Example() {
	return (
		<Collapsible label="Build settings">
			<p className="text-muted-foreground text-sm">
				Output directory, install command, and node version.
			</p>
		</Collapsible>
	);
}
