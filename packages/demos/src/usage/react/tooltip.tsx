import { Tooltip, TooltipContent, TooltipTrigger } from "@baby-ui/react";

export function Example() {
	return (
		<Tooltip placement="top">
			<TooltipTrigger>
				<button type="button">Copy</button>
			</TooltipTrigger>
			<TooltipContent>Copy to clipboard</TooltipContent>
		</Tooltip>
	);
}
