import type { ReactNode } from "react";
import { cn } from "../lib/cn.js";

const PAD = { sm: "p-3", md: "p-5", lg: "p-7" };

export interface CardProps {
	children: ReactNode;
	className?: string;
	padding?: "sm" | "md" | "lg";
	interactive?: boolean;
}

export function Card({ children, className, padding = "md", interactive = false }: CardProps) {
	return (
		<div
			className={cn(
				"rounded-2xl border border-border bg-card",
				interactive &&
					"transition-[transform,border-color] duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-border-strong motion-reduce:hover:translate-y-0",
				PAD[padding],
				className,
			)}
		>
			{children}
		</div>
	);
}

export interface CardHeaderProps {
	title: string;
	description?: string;
	actions?: ReactNode;
	className?: string;
}

export function CardHeader({ title, description, actions, className }: CardHeaderProps) {
	return (
		<div className={cn("flex items-start justify-between gap-4", className)}>
			<div className="min-w-0">
				<h3 className="font-medium text-foreground text-sm">{title}</h3>
				{description ? (
					<p className="mt-1 text-muted-foreground text-xs leading-relaxed">{description}</p>
				) : null}
			</div>
			{actions ? <div className="shrink-0">{actions}</div> : null}
		</div>
	);
}

export function CardFooter({
	children,
	className,
}: { children: ReactNode; className?: string }) {
	return (
		<div className={cn("mt-4 flex items-center gap-2 border-border/60 border-t pt-4", className)}>
			{children}
		</div>
	);
}
