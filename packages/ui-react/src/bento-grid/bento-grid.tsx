import type { CSSProperties, ReactNode } from "react";
import { cn } from "../lib/cn.js";

export type BentoSpan = "1x1" | "2x1" | "1x2" | "2x2";

/** Spans only apply from `md` up; below it every cell is one column wide. */
const SPAN: Record<BentoSpan, string> = {
	"1x1": "",
	"2x1": "md:col-span-2",
	"1x2": "md:row-span-2",
	"2x2": "md:col-span-2 md:row-span-2",
};

export interface BentoGridProps {
	children: ReactNode;
	className?: string;
	columns?: number;
	gap?: number;
	rowHeight?: number;
}

export function BentoGrid({
	children,
	className,
	columns = 3,
	gap = 16,
	rowHeight = 160,
}: BentoGridProps) {
	const style = {
		"--bento-columns": String(columns),
		gap: `${gap}px`,
		gridAutoRows: `${rowHeight}px`,
	} as CSSProperties;

	return (
		<div
			style={style}
			className={cn(
				"grid grid-cols-1 md:grid-cols-[repeat(var(--bento-columns),minmax(0,1fr))]",
				className,
			)}
		>
			{children}
		</div>
	);
}

export interface BentoCellProps {
	children?: ReactNode;
	className?: string;
	span?: BentoSpan;
	title?: string;
	description?: string;
}

export function BentoCell({
	children,
	className,
	span = "1x1",
	title,
	description,
}: BentoCellProps) {
	return (
		<div
			className={cn(
				"group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-5",
				"transition-[transform,border-color] duration-200 ease-[var(--ease-out)]",
				"hover:-translate-y-0.5 hover:border-ring motion-reduce:hover:translate-y-0",
				SPAN[span],
				className,
			)}
		>
			{title ? <h3 className="font-medium text-foreground text-sm">{title}</h3> : null}
			{description ? (
				<p className="mt-1 text-muted-foreground text-xs leading-relaxed">
					{description}
				</p>
			) : null}
			<div className="min-h-0 flex-1">{children}</div>
		</div>
	);
}
