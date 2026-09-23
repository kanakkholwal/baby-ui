"use client";

import { useState } from "react";
import { Badge } from "../badge/badge";
import { cn } from "../lib/cn";
import { type TaskRowsTone, type TaskRowsVariant, taskRows } from "./variants";

function SpinnerRing({ active, children }: { active?: boolean; children?: number }) {
	const size = 24;
	const stroke = 2;
	const r = (size - stroke) / 2;
	const c = 2 * Math.PI * r;
	return (
		<span
			className="relative inline-flex shrink-0 items-center justify-center"
			style={{ width: size, height: size }}
		>
			<svg
				width={size}
				height={size}
				aria-hidden
				className={cn("absolute inset-0", active && "spinner")}
			>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={r}
					fill="none"
					stroke="var(--border)"
					strokeWidth={stroke}
				/>
				{active ? (
					<circle
						cx={size / 2}
						cy={size / 2}
						r={r}
						fill="none"
						stroke="var(--muted-foreground)"
						strokeWidth={stroke}
						strokeLinecap="round"
						strokeDasharray={`${c * 0.28} ${c * 0.72}`}
					/>
				) : null}
			</svg>
			<span className="relative font-semibold text-[10.5px] text-foreground tabular-nums">
				{children}
			</span>
		</span>
	);
}

function StatusDot({
	tone,
	children,
}: {
	tone: TaskRowsTone;
	children: React.ReactNode;
}) {
	return <span className={taskRows({ tone }).statusDot()}>{children}</span>;
}

const XIcon = (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="3.5"
		strokeLinecap="round"
		aria-hidden
		className="size-3"
	>
		<path d="M18 6L6 18M6 6l12 12" />
	</svg>
);
const CheckIcon = (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="3.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden
		className="size-3"
	>
		<path d="M20 6L9 17l-5-5" />
	</svg>
);
const RetryIcon = (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="3"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden
		className="size-3"
	>
		<path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
	</svg>
);

export type TaskDetail = { label: string; meta: string };
export type TaskRowStatus = "pending" | "running" | "done" | "failed";

export type TaskRow = {
	key: string;
	label: string;
	amount: string;
	status: TaskRowStatus;
	step?: number;
	details: TaskDetail[];
};

export type TaskRowsLabels = {
	completed: string;
	failed: string;
};

const DEFAULT_LABELS: TaskRowsLabels = {
	completed: "Completed",
	failed: "Failed",
};

export interface TaskRowsProps {
	variant?: TaskRowsVariant;
	rows: TaskRow[];
	labels?: Partial<TaskRowsLabels>;
	className?: string;
	onToggleRow?: (key: string, open: boolean) => void;
	onRetry?: (key: string) => void;
}

/** Every row's status comes from `rows`; the component holds no timers of its own. */
export function TaskRows({
	variant = "capsules",
	rows,
	labels,
	className,
	onToggleRow,
	onRetry,
}: TaskRowsProps) {
	const [manualOpen, setManualOpen] = useState<Record<string, boolean>>({});
	const copy = { ...DEFAULT_LABELS, ...labels };
	const { root, item } = taskRows({ variant });

	const badgeFor = (row: TaskRow) => {
		if (row.status === "done") return <StatusDot tone="success">{CheckIcon}</StatusDot>;
		if (row.status === "failed") return <StatusDot tone="destructive">{XIcon}</StatusDot>;
		return <SpinnerRing active={row.status === "running"}>{row.step}</SpinnerRing>;
	};

	const pillFor = (row: TaskRow) => {
		if (row.status === "done")
			return (
				<Badge variant="success" size="sm">
					{copy.completed}
				</Badge>
			);
		if (row.status === "failed")
			return (
				<span className="flex items-center gap-1">
					<Badge variant="destructive" size="sm">
						{copy.failed}
					</Badge>
					{onRetry ? (
						<button
							type="button"
							aria-label="Retry"
							onClick={() => onRetry(row.key)}
							className="grid size-5.5 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
						>
							{RetryIcon}
						</button>
					) : null}
				</span>
			);
		return null;
	};

	return (
		<div data-slot="task-rows" className={cn(root(), "max-w-[27.5rem]", className)}>
			{rows.map((row, i) => {
				const open = manualOpen[row.key] ?? false;
				return (
					<div
						key={row.key}
						data-slot="task-row"
						className={cn(item(), "card-fade-up")}
						style={{
							borderRadius: variant === "list" ? 0 : open ? 14 : 22,
							animationDelay: `${i * 80}ms`,
						}}
					>
						<button
							type="button"
							aria-expanded={open}
							onClick={() => {
								setManualOpen((current) => ({ ...current, [row.key]: !open }));
								onToggleRow?.(row.key, !open);
							}}
							className="flex h-11 w-full items-center gap-2.5 px-2.5 text-left"
						>
							<span className="flex size-6 shrink-0 items-center justify-center">
								{badgeFor(row)}
							</span>
							<span className="min-w-0 flex-1 truncate font-medium text-[13px] text-foreground">
								{row.label}
							</span>
							<span className="text-[12.5px] text-muted-foreground tabular-nums">
								{row.amount}
							</span>
							{pillFor(row)}
							<span
								aria-hidden
								className="-ml-2 flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground"
							>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.2"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden
									style={{ transform: open ? "rotate(180deg)" : undefined }}
									className="size-3.5 transition-transform duration-300 ease-[var(--ease-out)] motion-reduce:transition-none"
								>
									<path d="M6 9l6 6 6-6" />
								</svg>
							</span>
						</button>

						<div
							className="grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out)]"
							style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
						>
							<div className="overflow-hidden">
								<div className="mb-2.5 grid grid-cols-[24px_1fr] gap-2.5 px-2.5">
									<span aria-hidden className="mx-auto h-full w-px bg-border" />
									<div className="flex flex-col gap-1.5">
										{row.details.map((d) => (
											<div key={d.label} className="flex items-center justify-between">
												<span className="text-[12px] text-muted-foreground">
													{d.label}
												</span>
												<span className="font-mono text-[11.5px] text-muted-foreground tabular-nums">
													{d.meta}
												</span>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
