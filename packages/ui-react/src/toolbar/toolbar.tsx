"use client";

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export interface ToolbarProps
	extends Omit<ComponentProps<typeof ToolbarPrimitive.Root>, "orientation"> {
	orientation?: "horizontal" | "vertical";
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
			className={cn(
				"inline-flex items-center gap-0.5 rounded-xl border border-border bg-card p-1",
				orientation === "vertical" && "flex-col",
				className,
			)}
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
			className={cn(
				"grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}
