import { Popover, PopoverContent, PopoverTrigger } from "@baby-ui/react";

export function Example() {
	return (
		<Popover>
			<PopoverTrigger>Filters</PopoverTrigger>
			<PopoverContent side="bottom" align="start">
				<p className="text-sm">
					Anything you put here is positioned against the trigger.
				</p>
			</PopoverContent>
		</Popover>
	);
}
