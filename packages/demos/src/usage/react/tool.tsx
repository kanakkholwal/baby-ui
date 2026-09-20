import { Tool } from "@baby-ui/react";

export function Example() {
	return (
		<Tool
			name="search_registry"
			status="done"
			input={'{ "query": "dialog" }'}
			output={'{ "matches": 3 }'}
		/>
	);
}
