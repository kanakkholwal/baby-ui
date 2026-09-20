"use client";

import { cn } from "../lib/cn";

const ARROW =
	"grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40";

export interface PaginationProps {
	page: number;
	total: number;
	siblings?: number;
	className?: string;
	onPageChange: (page: number) => void;
}

export function Pagination({
	page,
	total,
	siblings = 1,
	className,
	onPageChange,
}: PaginationProps) {
	// First and last always shown; the window follows the current page.
	const pages: (number | "gap")[] = [];
	const from = Math.max(2, page - siblings);
	const to = Math.min(total - 1, page + siblings);
	pages.push(1);
	if (from > 2) pages.push("gap");
	for (let i = from; i <= to; i++) pages.push(i);
	if (to < total - 1) pages.push("gap");
	if (total > 1) pages.push(total);

	return (
		<nav aria-label="Pagination" className={cn("flex items-center gap-1", className)}>
			<button
				type="button"
				aria-label="Previous page"
				disabled={page <= 1}
				onClick={() => onPageChange(Math.max(1, page - 1))}
				className={ARROW}
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3.5">
					<path
						d="M10 4 6 8l4 4"
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			{pages.map((entry, i) =>
				entry === "gap" ? (
					<span key={`gap-${i}`} className="px-1 text-muted-foreground text-sm">
						…
					</span>
				) : (
					<button
						key={entry}
						type="button"
						aria-current={entry === page ? "page" : undefined}
						onClick={() => onPageChange(entry)}
						className="grid size-8 place-items-center rounded-lg text-muted-foreground text-sm tabular-nums transition-colors hover:text-foreground aria-[current=page]:bg-foreground/[0.08] aria-[current=page]:font-medium aria-[current=page]:text-foreground"
					>
						{entry}
					</button>
				),
			)}

			<button
				type="button"
				aria-label="Next page"
				disabled={page >= total}
				onClick={() => onPageChange(Math.min(total, page + 1))}
				className={ARROW}
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3.5">
					<path
						d="m6 4 4 4-4 4"
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
		</nav>
	);
}
