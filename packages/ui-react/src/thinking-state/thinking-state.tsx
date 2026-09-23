"use client";

import { type ReactNode, useId, useLayoutEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { type ThinkingStateVariant, thinkingState } from "./variants";

export type ThinkingRow = {
	primary: string;
	secondary?: string;
	mono?: boolean;
	add?: number;
	del?: number;
	href?: string;
	/** Only meaningful for the `steps` variant: shows a spinner instead of a checkmark. */
	status?: "active";
};

const DOT_TONES = ["bg-accent", "bg-warning", "bg-success"];

function SourceDot({ tone }: { tone: string }) {
	return (
		<span
			className={cn(
				"flex size-3.5 shrink-0 items-center justify-center rounded-full text-white",
				tone,
			)}
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2.5"
				aria-hidden
				className="size-2.5"
			>
				<circle cx="12" cy="12" r="9" />
				<path d="M3.5 12h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
			</svg>
		</span>
	);
}

export interface ThinkingStateProps {
	variant?: ThinkingStateVariant;
	rows: ThinkingRow[];
	activeLabel: string;
	doneLabel: string;
	thinking?: boolean;
	query?: string;
	icon?: ReactNode;
	className?: string;
}

/** `thinking` (a real, caller-driven signal) controls the header and auto-expand, same contract as Reasoning. */
export function ThinkingState({
	variant = "steps",
	rows,
	activeLabel,
	doneLabel,
	thinking = false,
	query,
	icon,
	className,
}: ThinkingStateProps) {
	const id = useId();
	const [touched, setTouched] = useState(false);
	const [manual, setManual] = useState(false);
	const [selectedRow, setSelectedRow] = useState<string | null>(null);
	const expanded = touched ? manual : thinking;
	const { row, label } = thinkingState({ variant });

	const traceRef = useRef<HTMLDivElement>(null);
	const [lineHeight, setLineHeight] = useState(0);
	useLayoutEffect(() => {
		if (traceRef.current) setLineHeight(traceRef.current.offsetHeight);
	}, [expanded, rows.length]);

	return (
		<div
			data-slot="thinking-state"
			className={cn("flex w-full max-w-sm flex-col", className)}
		>
			<button
				type="button"
				aria-expanded={expanded}
				aria-controls={id}
				onClick={() => {
					setTouched(true);
					setManual(!expanded);
				}}
				className="-mx-1.5 flex w-fit items-center gap-2 rounded-md px-1.5 py-1 transition-colors duration-100 hover:bg-foreground/[0.06]"
			>
				<span aria-hidden className="flex shrink-0 text-muted-foreground">
					{icon ?? (
						<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
							<path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
						</svg>
					)}
				</span>
				<span role="status" className="contents">
					{thinking ? (
						<span className="reasoning-shimmer whitespace-nowrap font-medium text-[13px]">
							{activeLabel}
						</span>
					) : (
						<span className="fade-in whitespace-nowrap font-medium text-[13px] text-muted-foreground">
							{doneLabel}
						</span>
					)}
				</span>
				<svg
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.4"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden
					style={{ transform: expanded ? "rotate(180deg)" : undefined }}
					className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
				>
					<path d="m4 6 4 4 4-4" />
				</svg>
			</button>

			<div
				id={id}
				className="grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out)]"
				style={{ gridTemplateRows: expanded ? "1fr" : "0fr", opacity: expanded ? 1 : 0 }}
			>
				<div className="overflow-hidden">
					<div className="relative mt-1 ml-[5px] pl-4">
						<span
							aria-hidden
							className="absolute left-[3px] w-px bg-border transition-[height] duration-500 ease-[var(--ease-out)]"
							style={{ top: -8, height: lineHeight ? lineHeight - 2 : 0 }}
						/>
						<div ref={traceRef} className="flex flex-col gap-1 py-1">
							{query ? (
								<div className="flex h-6 items-center gap-2 px-1.5">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										aria-hidden
										className="size-3.5 shrink-0 text-muted-foreground"
									>
										<circle cx="11" cy="11" r="7" />
										<path d="M21 21l-4.3-4.3" />
									</svg>
									<span className="text-muted-foreground text-xs">{query}</span>
								</div>
							) : null}
							{rows.map((r, i) => {
								const content = (
									<>
										{variant === "search" ? (
											<SourceDot tone={DOT_TONES[i % DOT_TONES.length] ?? "bg-accent"} />
										) : null}
										{variant === "steps" ? (
											r.status === "active" ? (
												<span
													aria-hidden
													className="spinner size-3 shrink-0 rounded-full border-[1.5px] border-border border-t-muted-foreground"
												/>
											) : (
												<svg
													viewBox="0 0 16 16"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													aria-hidden
													className="size-3.5 shrink-0 text-muted-foreground"
												>
													<path d="M3.5 8.4 6.4 11 12.5 4.5" />
												</svg>
											)
										) : null}
										<span className={label()}>{r.primary}</span>
										{r.secondary ? (
											<span
												className={cn(
													"shrink-0 text-[11px] text-muted-foreground",
													r.mono && "font-mono",
												)}
											>
												{r.secondary}
											</span>
										) : null}
										{r.add !== undefined ? (
											<span className="shrink-0 font-mono text-[11px] tabular-nums">
												<span className="text-success">+{r.add}</span>{" "}
												<span className="text-destructive">-{r.del}</span>
											</span>
										) : null}
									</>
								);
								const animation = { animationDelay: `${i * 80}ms` };

								if (variant === "search") {
									return (
										<a
											key={r.primary}
											href={r.href}
											target="_blank"
											rel="noreferrer"
											style={animation}
											className={cn(
												row(),
												"card-fade-up transition-colors duration-150 hover:bg-foreground/[0.06]",
											)}
										>
											{content}
										</a>
									);
								}
								if (variant === "coding") {
									const selected = selectedRow === r.primary;
									return (
										<button
											key={r.primary}
											type="button"
											aria-pressed={selected}
											onClick={() => setSelectedRow(selected ? null : r.primary)}
											style={animation}
											className={cn(
												row(),
												"card-fade-up transition-colors duration-150",
												selected ? "bg-muted" : "hover:bg-foreground/[0.06]",
											)}
										>
											{content}
										</button>
									);
								}
								return (
									<div
										key={r.primary}
										style={animation}
										className={cn(row(), "card-fade-up")}
									>
										{content}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
