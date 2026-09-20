import { Popover } from "@baby-ui/react";

export function Example() {
	return (
		<Popover placement="bottom-start" trigger={<span>Filters</span>}>
			<p className="text-sm">Anything you put here is positioned against the trigger.</p>
		</Popover>
	);
}
