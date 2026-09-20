import { Popover, PopoverContent, PopoverTrigger } from "@baby-ui/react";

export function Example() {
	return (
		<Popover placement="bottom-start">
			<PopoverTrigger>Filters</PopoverTrigger>
			<PopoverContent>
				<p className="text-sm">
					Anything you put here is positioned against the trigger.
				</p>
			</PopoverContent>
		</Popover>
	);
}
