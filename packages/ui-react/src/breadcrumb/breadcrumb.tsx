import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

/** Part names and data-slot values follow shadcn/ui, so this drops into an existing project. */
export function Breadcrumb({ className, ...props }: ComponentProps<"nav">) {
	return (
		<nav
			aria-label="Breadcrumb"
			data-slot="breadcrumb"
			className={cn("text-sm", className)}
			{...props}
		/>
	);
}

export function BreadcrumbList({ className, ...props }: ComponentProps<"ol">) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={cn("flex flex-wrap items-center gap-1.5", className)}
			{...props}
		/>
	);
}

export function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
	return (
		<li
			data-slot="breadcrumb-item"
			className={cn("flex items-center gap-1.5", className)}
			{...props}
		/>
	);
}

export function BreadcrumbLink({ className, ...props }: ComponentProps<"a">) {
	return (
		<a
			data-slot="breadcrumb-link"
			className={cn(
				"text-muted-foreground transition-colors hover:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

export function BreadcrumbPage({ className, ...props }: ComponentProps<"span">) {
	return (
		<span
			aria-current="page"
			data-slot="breadcrumb-page"
			className={cn("font-medium text-foreground", className)}
			{...props}
		/>
	);
}

export function BreadcrumbSeparator({
	className,
	children,
	...props
}: ComponentProps<"li">) {
	return (
		<li
			role="presentation"
			aria-hidden
			data-slot="breadcrumb-separator"
			className={cn("text-muted-foreground [&>svg]:size-3.5", className)}
			{...props}
		>
			{children ?? (
				<svg viewBox="0 0 14 14" fill="none" aria-hidden className="size-3.5">
					<path
						d="M5.5 3.5 9 7l-3.5 3.5"
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			)}
		</li>
	);
}

export function BreadcrumbEllipsis({ className, ...props }: ComponentProps<"span">) {
	return (
		<span
			role="presentation"
			aria-hidden
			data-slot="breadcrumb-ellipsis"
			className={cn("px-0.5 text-muted-foreground", className)}
			{...props}
		>
			&hellip;
			<span className="sr-only">More</span>
		</span>
	);
}
