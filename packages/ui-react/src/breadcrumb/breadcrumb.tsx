import { cn } from "../lib/cn";

export type BreadcrumbItem = { href?: string; label: string };

export interface BreadcrumbProps {
	items: BreadcrumbItem[];
	maxVisible?: number;
	className?: string;
}

export function Breadcrumb({ items, maxVisible = 4, className }: BreadcrumbProps) {
	// Keep the root and the last two; the middle is what a long trail can afford to lose.
	const shown =
		items.length <= maxVisible
			? items.map((item) => ({ item, gap: false }))
			: [
					...items.slice(0, 1).map((item) => ({ item, gap: false })),
					{ item: { label: "\u2026" } as BreadcrumbItem, gap: true },
					...items.slice(-2).map((item) => ({ item, gap: false })),
				];

	return (
		<nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
			<ol className="flex flex-wrap items-center gap-1.5">
				{shown.map((entry, i) => (
					<li key={`${entry.item.label}-${i}`} className="flex items-center gap-1.5">
						{entry.gap ? (
							<span className="px-0.5 text-muted-foreground">{entry.item.label}</span>
						) : i === shown.length - 1 ? (
							<span aria-current="page" className="font-medium text-foreground">
								{entry.item.label}
							</span>
						) : entry.item.href ? (
							<a
								href={entry.item.href}
								className="text-muted-foreground transition-colors hover:text-foreground"
							>
								{entry.item.label}
							</a>
						) : (
							<span className="text-muted-foreground">{entry.item.label}</span>
						)}

						{i < shown.length - 1 ? (
							<svg
								viewBox="0 0 14 14"
								fill="none"
								aria-hidden
								className="size-3.5 text-muted-foreground"
							>
								<path
									d="M5.5 3.5 9 7l-3.5 3.5"
									stroke="currentColor"
									strokeWidth="1.4"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						) : null}
					</li>
				))}
			</ol>
		</nav>
	);
}
