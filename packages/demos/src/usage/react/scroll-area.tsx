import { ScrollArea } from "@baby-ui/react";

export function Example() {
	return (
		<ScrollArea maxHeight="12rem">
			<p className="text-muted-foreground text-sm">
				Long content scrolls here with a thin scrollbar that appears on hover.
			</p>
		</ScrollArea>
	);
}
