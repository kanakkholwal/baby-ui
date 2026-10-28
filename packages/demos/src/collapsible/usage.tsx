import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@baby-ui/react";

export function Example() {
	return (
		<Collapsible>
			<CollapsibleTrigger>Build settings</CollapsibleTrigger>
			<CollapsibleContent>
				Output directory, install command, and node version.
			</CollapsibleContent>
		</Collapsible>
	);
}
