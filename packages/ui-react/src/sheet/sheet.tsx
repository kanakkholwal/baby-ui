"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import type { ComponentProps } from "react";
import { DIALOG_BACKDROP } from "../dialog/dialog";
import { cn } from "../lib/cn";
import { type SheetSide, sheetPanel } from "./variants";

export type { SheetSide };

export const Sheet = SheetPrimitive.Root;

export function SheetTrigger({
	className,
	...props
}: ComponentProps<typeof SheetPrimitive.Trigger>) {
	return (
		<SheetPrimitive.Trigger
			data-slot="sheet-trigger"
			className={cn("inline-flex", className)}
			{...props}
		/>
	);
}

export function SheetContent({
	className,
	side = "right",
	...props
}: ComponentProps<typeof SheetPrimitive.Popup> & { side?: SheetSide }) {
	return (
		<SheetPrimitive.Portal>
			<SheetPrimitive.Backdrop data-slot="sheet-backdrop" className={DIALOG_BACKDROP} />
			<SheetPrimitive.Popup
				data-slot="sheet-content"
				data-side={side}
				className={cn(sheetPanel({ side }), className)}
				{...props}
			/>
		</SheetPrimitive.Portal>
	);
}

export function SheetHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-header"
			className={cn("flex items-center justify-between gap-4", className)}
			{...props}
		/>
	);
}

export function SheetFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn("mt-auto flex items-center justify-end gap-2", className)}
			{...props}
		/>
	);
}

export function SheetTitle({
	className,
	...props
}: ComponentProps<typeof SheetPrimitive.Title>) {
	return (
		<SheetPrimitive.Title
			data-slot="sheet-title"
			className={cn("font-semibold text-foreground text-sm", className)}
			{...props}
		/>
	);
}

export function SheetDescription({
	className,
	...props
}: ComponentProps<typeof SheetPrimitive.Description>) {
	return (
		<SheetPrimitive.Description
			data-slot="sheet-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

export function SheetClose({
	className,
	children,
	...props
}: ComponentProps<typeof SheetPrimitive.Close>) {
	return (
		<SheetPrimitive.Close
			data-slot="sheet-close"
			aria-label={children ? undefined : "Close"}
			className={cn(
				"grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-card hover:text-foreground",
				className,
			)}
			{...props}
		>
			{children ?? (
				<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
					<path
						d="m4 4 8 8M12 4l-8 8"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</svg>
			)}
		</SheetPrimitive.Close>
	);
}
