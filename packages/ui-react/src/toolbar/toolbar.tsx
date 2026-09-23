"use client";

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";
import { type ToolbarOrientation, toolbar } from "./variants";

export interface ToolbarProps
	extends Omit<ComponentProps<typeof ToolbarPrimitive.Root>, "orientation"> {
	orientation?: ToolbarOrientation;
	label?: string;
}

export function Toolbar({
	className,
	orientation = "horizontal",
	label = "Toolbar",
	...props
}: ToolbarProps) {
	return (
		<ToolbarPrimitive.Root
			data-slot="toolbar"
			orientation={orientation}
			aria-label={label}
			className={cn(toolbar({ orientation }).root(), className)}
			{...props}
		/>
	);
}

export function ToolbarButton({
	className,
	...props
}: ComponentProps<typeof ToolbarPrimitive.Button>) {
	return (
		<ToolbarPrimitive.Button
			data-slot="toolbar-button"
			className={cn(toolbar().button(), className)}
			{...props}
		/>
	);
}
