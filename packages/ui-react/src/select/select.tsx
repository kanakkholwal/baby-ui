"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import type { ComponentProps, ReactNode } from "react";
import { UNFOLD, UNFOLD_ITEM } from "../lib/anchor";
import { cn } from "../lib/cn";

export function Select({
	value,
	onValueChange,
	items = [],
	children,
	...props
}: Omit<
	ComponentProps<typeof SelectPrimitive.Root>,
	"value" | "onValueChange" | "multiple" | "defaultValue" | "items"
> & {
	value?: string;
	onValueChange?: (value: string) => void;
	items?: ReadonlyArray<{ value: string; label: ReactNode }>;
}) {
	return (
		<SelectPrimitive.Root<string>
			value={value || null}
			onValueChange={(next) => onValueChange?.(next ?? "")}
			items={items}
			{...props}
		>
			{children}
		</SelectPrimitive.Root>
	);
}

export function SelectValue({
	className,
	...props
}: ComponentProps<typeof SelectPrimitive.Value>) {
	return (
		<SelectPrimitive.Value
			data-slot="select-value"
			className={cn("data-[placeholder]:text-muted-foreground", className)}
			{...props}
		/>
	);
}

export function SelectTrigger({
	className,
	children,
	...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			className={cn(
				"inline-flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 text-foreground text-sm outline-none transition-colors",
				"focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring",
				"disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon className="[&>svg]:transition-[transform,scale,translate] [&>svg]:duration-200 [&>svg]:ease-[var(--ease-out)] data-[open]:[&>svg]:rotate-180">
				<svg
					viewBox="0 0 16 16"
					fill="none"
					aria-hidden
					className="size-3.5 shrink-0 text-muted-foreground"
				>
					<path
						d="m4 6 4 4 4-4"
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

export function SelectContent({
	className,
	children,
	align = "center",
	alignOffset = 0,
	side = "bottom",
	sideOffset = 6,
	alignItemWithTrigger = false,
	...props
}: ComponentProps<typeof SelectPrimitive.Popup> &
	Pick<
		ComponentProps<typeof SelectPrimitive.Positioner>,
		"align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
	>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				alignItemWithTrigger={alignItemWithTrigger}
				className="isolate z-50"
			>
				<SelectPrimitive.Popup
					data-slot="select-content"
					className={cn(
						UNFOLD,
						"static z-50 max-h-[min(16rem,var(--available-height))] w-[var(--anchor-width)] overflow-x-hidden overflow-y-auto",
						"scroll-area rounded-xl border border-border bg-popover p-1 shadow-2xl",
						className,
					)}
					{...props}
				>
					<SelectPrimitive.List>{children}</SelectPrimitive.List>
				</SelectPrimitive.Popup>
			</SelectPrimitive.Positioner>
		</SelectPrimitive.Portal>
	);
}

export function SelectItem({
	className,
	children,
	...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				UNFOLD_ITEM,
				"relative flex w-full cursor-default items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-left text-foreground text-sm outline-none transition-colors",
				"data-[highlighted]:bg-foreground/[0.06]",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				className,
			)}
			{...props}
		>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
			<SelectPrimitive.ItemIndicator>
				<svg viewBox="0 0 14 14" fill="none" aria-hidden className="size-3.5 shrink-0">
					<path
						d="M3 7.4 5.6 10 11 4.2"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</SelectPrimitive.ItemIndicator>
		</SelectPrimitive.Item>
	);
}

export function SelectGroup({
	className,
	...props
}: ComponentProps<typeof SelectPrimitive.Group>) {
	return (
		<SelectPrimitive.Group
			data-slot="select-group"
			className={cn("py-0.5", className)}
			{...props}
		/>
	);
}

export function SelectLabel({
	className,
	...props
}: ComponentProps<typeof SelectPrimitive.GroupLabel>) {
	return (
		<SelectPrimitive.GroupLabel
			data-slot="select-label"
			className={cn("px-2.5 py-1.5 font-medium text-muted-foreground text-xs", className)}
			{...props}
		/>
	);
}

export function SelectSeparator({
	className,
	...props
}: ComponentProps<typeof SelectPrimitive.Separator>) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn("-mx-1 my-1 border-border", className)}
			{...props}
		/>
	);
}
