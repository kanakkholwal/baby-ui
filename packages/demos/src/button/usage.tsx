import { Button } from "@baby-ui/react";

export function Example() {
	return (
		<div className="flex items-center gap-2">
			<Button onClick={() => console.log("clicked")}>Deploy</Button>
			<Button variant="outline" size="sm">
				Preview
			</Button>
			<Button variant="ghost" loading>
				Saving
			</Button>
		</div>
	);
}
