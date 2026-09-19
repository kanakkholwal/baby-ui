import { cn } from "../lib/cn.js";

const SHAPE = { line: "rounded-md", circle: "rounded-full", block: "rounded-xl" };

export interface SkeletonProps {
	width?: string;
	height?: string;
	shape?: "line" | "circle" | "block";
	className?: string;
}

export function Skeleton({
	width = "100%",
	height = "1rem",
	shape = "line",
	className,
}: SkeletonProps) {
	return (
		<div
			aria-hidden
			style={{ width, height }}
			className={cn("skeleton-shimmer bg-card", SHAPE[shape], className)}
		/>
	);
}
