"use client";

import { useState } from "react";
import { Badge } from "../badge/badge";
import { Button } from "../button/button";
import { cn } from "../lib/cn";
import { type DiffRowChange, diffRow } from "./variants";

export type { DiffRowChange };

export type DiffRow = {
	key: string;
	label: string;
	category: string;
	detail: string;
	change: DiffRowChange;
	included?: boolean;
};

const NEUTRAL = {
	row: "",
	label: "text-foreground",
	detail: "text-muted-foreground",
	mark: "bg-muted text-muted-foreground shadow-xs",
};

function rowClasses(change: DiffRowChange, included: boolean) {
	if (!included) return NEUTRAL;
	const c = diffRow({ change });
	return { row: c.row(), label: c.label(), detail: c.detail(), mark: c.mark() };
}

function CheckMark({ included, className }: { included: boolean; className: string }) {
	return (
		<span
			aria-hidden
			className={cn(
				"flex size-4.5 shrink-0 items-center justify-center rounded-[5px] transition-[background-color,transform] duration-150",
				className,
			)}
			style={{ transform: included ? "scale(1)" : "scale(0.92)" }}
		>
			{included ? (
				<svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
					<path
						d="M20 6 9 17l-5-5"
						stroke="currentColor"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			) : null}
		</span>
	);
}

export interface DiffTableProps {
	title?: string;
	rows: DiffRow[];
	onApply?: (includedKeys: string[]) => void;
	className?: string;
}

/** Each row is its own control: click to include/exclude that addition/removal before
 * applying. The reveal is a mount-time stagger, not a scripted "computing the diff" delay. */
export function DiffTable({
	title = "Proposed changes",
	rows,
	onApply,
	className,
}: DiffTableProps) {
	const [included, setIncluded] = useState<Record<string, boolean>>(() =>
		Object.fromEntries(rows.map((row) => [row.key, row.included ?? true])),
	);
	const [accepted, setAccepted] = useState(false);

	const includedKeys = rows.filter((row) => included[row.key]).map((row) => row.key);
	const removals = rows.filter(
		(row) => row.change === "removed" && included[row.key],
	).length;
	const additions = rows.filter(
		(row) => row.change === "added" && included[row.key],
	).length;
	const total = removals + additions;

	function toggle(key: string) {
		setIncluded((current) => ({ ...current, [key]: !current[key] }));
	}

	function apply() {
		setAccepted(true);
		onApply?.(includedKeys);
	}

	return (
		<div data-slot="diff-table" className={cn("w-full", className)}>
			<div className="relative overflow-hidden rounded-2xl bg-card shadow-sm">
				<div className="flex items-center justify-between border-border border-b px-3 py-2">
					<span className="font-medium text-[12.5px] text-foreground">{title}</span>
					{!accepted ? (
						<span className="text-[11px] text-muted-foreground">
							Click rows to toggle
						</span>
					) : null}
				</div>

				<table className="w-full table-fixed border-collapse text-left">
					<colgroup>
						<col className="w-[34%]" />
						<col className="w-[30%]" />
						<col className="w-[36%]" />
					</colgroup>
					<thead>
						<tr className="border-border border-b">
							{["Field", "Category", "Detail"].map((heading) => (
								<th
									key={heading}
									className="px-3 py-1.5 font-medium text-[12px] text-muted-foreground"
								>
									{heading}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row, index) => {
							const isIncluded = included[row.key] ?? true;
							const interactive = !accepted;
							const classes = rowClasses(row.change, isIncluded);
							return (
								// biome-ignore lint/a11y/useSemanticElements: a table row can't be an <input>
								<tr
									key={row.key}
									role="checkbox"
									aria-checked={isIncluded}
									tabIndex={interactive ? 0 : undefined}
									onClick={interactive ? () => toggle(row.key) : undefined}
									onKeyDown={
										interactive
											? (event) => {
													if (event.key === "Enter" || event.key === " ") {
														event.preventDefault();
														toggle(row.key);
													}
												}
											: undefined
									}
									className={cn(
										"card-fade-up border-border border-b transition-colors duration-150 last:border-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-inset",
										interactive && "cursor-pointer hover:brightness-[0.985]",
										classes.row,
									)}
									style={{ animationDelay: `calc(var(--stagger-step) * ${index})` }}
								>
									<td className={cn("px-3 py-2 text-[13px]", classes.label)}>
										{row.label}
									</td>
									<td className="px-3 py-2">
										<Badge variant="secondary" size="sm" dot>
											{row.category}
										</Badge>
									</td>
									<td className={cn("px-3 py-2 text-[12.5px]", classes.detail)}>
										<span className="flex items-center justify-between gap-2">
											<span className="min-w-0 truncate">{row.detail}</span>
											<CheckMark included={isIncluded} className={classes.mark} />
										</span>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>

				<div className="flex min-h-11 items-center justify-between border-border border-t px-3 py-2">
					{accepted ? (
						<span className="pop-in inline-flex items-center gap-1.5 rounded-full bg-success/10 py-1 pr-2.5 pl-1 font-medium text-[12.5px] text-success">
							<span className="flex size-4.5 items-center justify-center rounded-full bg-success text-white">
								<svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
									<path
										d="M20 6 9 17l-5-5"
										stroke="currentColor"
										strokeWidth="3"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</span>
							{total} {total === 1 ? "edit" : "edits"} applied
						</span>
					) : (
						<>
							<span className="text-[11.5px] text-muted-foreground tabular-nums">
								{removals} {removals === 1 ? "removal" : "removals"} · {additions}{" "}
								{additions === 1 ? "addition" : "additions"}
							</span>
							<Button variant="default" size="sm" disabled={total === 0} onClick={apply}>
								Apply {total} {total === 1 ? "change" : "changes"}
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
