"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import type { ComponentProps } from "react";
import { ANCHORED } from "../lib/anchor";
import { cn } from "../lib/cn";

export const Popover = PopoverPrimitive.Root;

export function PopoverTrigger({
	className,
	...props
}: ComponentProps<typeof PopoverPrimitive.Trigger>) {
	return (
		<PopoverPrimitive.Trigger
			data-slot="popover-trigger"
			className={cn(
				"inline-flex rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring",
				className,
			)}
			{...props}
		/>
	);
}

export function PopoverContent({
	className,
	sideOffset = 6,
	align = "start",
	side,
	...props
}: ComponentProps<typeof PopoverPrimitive.Popup> &
	Pick<
		ComponentProps<typeof PopoverPrimitive.Positioner>,
		"sideOffset" | "align" | "side"
	>) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Positioner sideOffset={sideOffset} align={align} side={side}>
				<PopoverPrimitive.Popup
					data-slot="popover-content"
					className={cn(
						ANCHORED,
						"w-72 rounded-xl border border-border bg-popover p-3 text-sm shadow-2xl",
						className,
					)}
					{...props}
				/>
			</PopoverPrimitive.Positioner>
		</PopoverPrimitive.Portal>
	);
}
