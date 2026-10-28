import { Tooltip, TooltipContent, TooltipTrigger } from "@baby-ui/react";

export function Example() {
	return (
		<Tooltip>
			<TooltipTrigger>
				<button type="button">Copy</button>
			</TooltipTrigger>
			<TooltipContent side="top">Copy to clipboard</TooltipContent>
		</Tooltip>
	);
}
