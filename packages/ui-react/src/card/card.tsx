import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

const LIFT =
	"transition-[transform,scale,translate,border-color] duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-border-strong motion-reduce:hover:translate-y-0";

/** Slot names and class shape follow shadcn/ui, so this drops into an existing project. */
export function Card({
	className,
	interactive = false,
	variant = "default",
	children,
	...props
}: ComponentProps<"div"> & { interactive?: boolean; variant?: "default" | "framed" }) {
	if (variant === "framed") {
		// Inset frame, same treatment as Dialog: a rim in bg-background around a bg-card body.
		return (
			<div
				data-slot="card"
				data-variant="framed"
				className={cn(
					"rounded-2xl border border-border bg-background p-1",
					interactive && LIFT,
					className,
				)}
				{...props}
			>
				<div className="flex flex-col gap-6 rounded-[11px] bg-card py-6 text-card-foreground">
					{children}
				</div>
			</div>
		);
	}

	return (
		<div
			data-slot="card"
			className={cn(
				"flex flex-col gap-6 rounded-2xl border border-border bg-card py-6 text-card-foreground",
				interactive && LIFT,
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
				className,
			)}
			{...props}
		/>
	);
}

export function CardTitle({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn("font-medium text-foreground text-sm leading-none", className)}
			{...props}
		/>
	);
}

export function CardDescription({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-muted-foreground text-xs leading-relaxed", className)}
			{...props}
		/>
	);
}

export function CardAction({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className,
			)}
			{...props}
		/>
	);
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
	return <div data-slot="card-content" className={cn("px-6", className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn("flex items-center gap-2 px-6 [.border-t]:pt-6", className)}
			{...props}
		/>
	);
}
