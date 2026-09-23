import { cn } from "../lib/cn";
import { type SkeletonShape, skeleton } from "./variants";

export interface SkeletonProps {
	width?: string;
	height?: string;
	shape?: SkeletonShape;
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
			className={cn(skeleton({ shape }), className)}
		/>
	);
}
