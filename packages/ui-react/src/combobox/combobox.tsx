"use client";

import type { ComponentProps } from "react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../command/command";
import { cn } from "../lib/cn";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";

/** A combobox is a Popover whose content is a Command: shadcn/ui's own combobox recipe,
 * no dedicated positioning, dismiss or search logic of its own. */
export const Combobox = Popover;

export function ComboboxTrigger({
	className,
	...props
}: ComponentProps<typeof PopoverTrigger>) {
	return (
		<PopoverTrigger
			role="combobox"
			className={cn(
				"h-9 w-64 items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 font-normal text-foreground text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring",
				className,
			)}
			{...props}
		/>
	);
}

export function ComboboxContent({
	className,
	children,
	...props
}: ComponentProps<typeof PopoverContent>) {
	return (
		<PopoverContent className={cn("w-64 overflow-hidden p-0", className)} {...props}>
			<Command className="max-h-72 rounded-none border-none bg-transparent shadow-none">
				{children}
			</Command>
		</PopoverContent>
	);
}

export {
	CommandEmpty as ComboboxEmpty,
	CommandGroup as ComboboxGroup,
	CommandInput as ComboboxInput,
	CommandItem as ComboboxItem,
	CommandList as ComboboxList,
};
