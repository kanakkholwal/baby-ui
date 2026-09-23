"use client";

import type { ComponentProps } from "react";
import { Drawer as Vaul } from "vaul";
import { cn } from "../lib/cn";
import { type DrawerVariant, drawerFrame } from "./variants";

export type { DrawerVariant };

export type DrawerDirection = "top" | "bottom" | "left" | "right";

// vaul eases with cubic-bezier(0.32, 0.72, 0, 1), our `--ease-drawer`; only the surface is
// ours. It sets data-vaul-drawer-direction, so the side classes are written out in full.
const SIDES = [
	"data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mx-auto data-[vaul-drawer-direction=bottom]:max-h-[92dvh] data-[vaul-drawer-direction=bottom]:w-full data-[vaul-drawer-direction=bottom]:max-w-2xl data-[vaul-drawer-direction=bottom]:rounded-t-3xl data-[vaul-drawer-direction=bottom]:border-b-0",
	"data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mx-auto data-[vaul-drawer-direction=top]:max-h-[92dvh] data-[vaul-drawer-direction=top]:w-full data-[vaul-drawer-direction=top]:max-w-2xl data-[vaul-drawer-direction=top]:rounded-b-3xl data-[vaul-drawer-direction=top]:border-t-0",
	"data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:h-full data-[vaul-drawer-direction=left]:w-80 data-[vaul-drawer-direction=left]:max-w-[85vw] data-[vaul-drawer-direction=left]:rounded-r-3xl data-[vaul-drawer-direction=left]:border-l-0",
	"data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:h-full data-[vaul-drawer-direction=right]:w-80 data-[vaul-drawer-direction=right]:max-w-[85vw] data-[vaul-drawer-direction=right]:rounded-l-3xl data-[vaul-drawer-direction=right]:border-r-0",
].join(" ");

// vaul's own [data-vaul-handle] CSS is a fixed 5px x 32px horizontal bar, only meant for
// bottom/top; rotated to a vertical bar and absolutely positioned on the free edge for left/right.
const HANDLE_SIDES = [
	"group-data-[vaul-drawer-direction=bottom]/drawer:mx-auto! group-data-[vaul-drawer-direction=bottom]/drawer:mt-2 group-data-[vaul-drawer-direction=bottom]/drawer:mb-1 group-data-[vaul-drawer-direction=bottom]/drawer:h-1.5! group-data-[vaul-drawer-direction=bottom]/drawer:w-10!",
	"group-data-[vaul-drawer-direction=top]/drawer:order-last group-data-[vaul-drawer-direction=top]/drawer:mx-auto! group-data-[vaul-drawer-direction=top]/drawer:mt-1 group-data-[vaul-drawer-direction=top]/drawer:mb-2 group-data-[vaul-drawer-direction=top]/drawer:h-1.5! group-data-[vaul-drawer-direction=top]/drawer:w-10!",
	"group-data-[vaul-drawer-direction=left]/drawer:absolute! group-data-[vaul-drawer-direction=left]/drawer:top-1/2! group-data-[vaul-drawer-direction=left]/drawer:right-2! group-data-[vaul-drawer-direction=left]/drawer:-translate-y-1/2! group-data-[vaul-drawer-direction=left]/drawer:h-10! group-data-[vaul-drawer-direction=left]/drawer:w-1.5!",
	"group-data-[vaul-drawer-direction=right]/drawer:absolute! group-data-[vaul-drawer-direction=right]/drawer:top-1/2! group-data-[vaul-drawer-direction=right]/drawer:left-2! group-data-[vaul-drawer-direction=right]/drawer:-translate-y-1/2! group-data-[vaul-drawer-direction=right]/drawer:h-10! group-data-[vaul-drawer-direction=right]/drawer:w-1.5!",
].join(" ");

// Not a separate drag target (vaul drags the whole panel), but still shows the grab
// affordance on every side, rotated to a vertical bar for left/right.
const HANDLE_BAR_SIDES = [
	"group-data-[vaul-drawer-direction=bottom]/drawer:mx-auto group-data-[vaul-drawer-direction=bottom]/drawer:mt-4 group-data-[vaul-drawer-direction=bottom]/drawer:block group-data-[vaul-drawer-direction=bottom]/drawer:h-2 group-data-[vaul-drawer-direction=bottom]/drawer:w-24",
	"group-data-[vaul-drawer-direction=top]/drawer:order-last group-data-[vaul-drawer-direction=top]/drawer:mx-auto group-data-[vaul-drawer-direction=top]/drawer:mb-4 group-data-[vaul-drawer-direction=top]/drawer:block group-data-[vaul-drawer-direction=top]/drawer:h-2 group-data-[vaul-drawer-direction=top]/drawer:w-24",
	"group-data-[vaul-drawer-direction=left]/drawer:absolute group-data-[vaul-drawer-direction=left]/drawer:top-1/2 group-data-[vaul-drawer-direction=left]/drawer:right-2 group-data-[vaul-drawer-direction=left]/drawer:-translate-y-1/2 group-data-[vaul-drawer-direction=left]/drawer:block group-data-[vaul-drawer-direction=left]/drawer:h-24 group-data-[vaul-drawer-direction=left]/drawer:w-2",
	"group-data-[vaul-drawer-direction=right]/drawer:absolute group-data-[vaul-drawer-direction=right]/drawer:top-1/2 group-data-[vaul-drawer-direction=right]/drawer:left-2 group-data-[vaul-drawer-direction=right]/drawer:-translate-y-1/2 group-data-[vaul-drawer-direction=right]/drawer:block group-data-[vaul-drawer-direction=right]/drawer:h-24 group-data-[vaul-drawer-direction=right]/drawer:w-2",
].join(" ");

export type DrawerProps = ComponentProps<typeof Vaul.Root>;

export function Drawer({ shouldScaleBackground = false, ...props }: DrawerProps) {
	return (
		<Vaul.Root
			data-slot="drawer"
			shouldScaleBackground={shouldScaleBackground}
			{...props}
		/>
	);
}

export function DrawerTrigger(props: ComponentProps<typeof Vaul.Trigger>) {
	return <Vaul.Trigger data-slot="drawer-trigger" {...props} />;
}

export function DrawerPortal(props: ComponentProps<typeof Vaul.Portal>) {
	return <Vaul.Portal data-slot="drawer-portal" {...props} />;
}

export function DrawerOverlay({
	className,
	...props
}: ComponentProps<typeof Vaul.Overlay>) {
	return (
		<Vaul.Overlay
			data-slot="drawer-overlay"
			className={cn("fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]", className)}
			{...props}
		/>
	);
}

export function DrawerContent({
	className,
	children,
	handle = true,
	variant = "default",
	...props
}: ComponentProps<typeof Vaul.Content> & {
	/** Hide the drag handle; only sensible with `dismissible={false}`. */
	handle?: boolean;
	variant?: DrawerVariant;
}) {
	const frame = drawerFrame({ variant });

	return (
		<DrawerPortal>
			<DrawerOverlay />
			{/* The frame is the rim (`framed`) or the surface itself (`default`); vaul sets
			    data-vaul-drawer-direction, which picks the side-specific classes. */}
			<Vaul.Content
				data-slot="drawer-content"
				data-variant={variant}
				className={cn(
					"group/drawer fixed z-50 flex flex-col text-foreground",
					frame.panel(),
					SIDES,
					className,
				)}
				{...props}
			>
				{handle ? (
					variant === "framed" ? (
						<Vaul.Handle
							className={cn(
								"shrink-0 cursor-grab! rounded-full! bg-muted-foreground/40! opacity-100! active:cursor-grabbing!",
								HANDLE_SIDES,
							)}
						/>
					) : (
						<div
							aria-hidden
							className={cn(
								"hidden shrink-0 cursor-grab rounded-full bg-muted active:cursor-grabbing",
								HANDLE_BAR_SIDES,
							)}
						/>
					)
				) : null}
				{/* data-vaul-no-drag: dragging should only start from the rail, not anywhere
				    in the body, since vaul otherwise treats the whole panel as a drag target. */}
				<div data-slot="drawer-surface" data-vaul-no-drag className={frame.surface()}>
					{children}
				</div>
			</Vaul.Content>
		</DrawerPortal>
	);
}

export function DrawerHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-header"
			className={cn("flex flex-col gap-1.5 pr-8", className)}
			{...props}
		/>
	);
}

export function DrawerFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-footer"
			className={cn(
				"mt-auto flex flex-col gap-2 pt-5 sm:flex-row sm:justify-end",
				className,
			)}
			{...props}
		/>
	);
}

export function DrawerTitle({ className, ...props }: ComponentProps<typeof Vaul.Title>) {
	return (
		<Vaul.Title
			data-slot="drawer-title"
			className={cn(
				"flex items-center gap-2 font-semibold text-foreground text-lg [&>svg]:size-5 [&>svg]:text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

export function DrawerDescription({
	className,
	...props
}: ComponentProps<typeof Vaul.Description>) {
	return (
		<Vaul.Description
			data-slot="drawer-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

const ICON_ONLY =
	"absolute top-3 right-3 grid size-8 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring";

export function DrawerClose({
	className,
	children,
	...props
}: ComponentProps<typeof Vaul.Close>) {
	return (
		<Vaul.Close
			data-slot="drawer-close"
			aria-label={children ? undefined : "Close"}
			className={cn(!children && ICON_ONLY, className)}
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
		</Vaul.Close>
	);
}
