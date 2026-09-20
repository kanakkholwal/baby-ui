"use client";

import { useId, useState } from "react";
import { cn } from "../lib/cn";

export type ToolState = "pending" | "running" | "done" | "error";

const TONE: Record<ToolState, string> = {
	pending: "text-muted-foreground",
	running: "text-primary",
	done: "text-[var(--success)]",
	error: "text-[var(--destructive)]",
};

const LABEL: Record<ToolState, string> = {
	pending: "Queued",
	running: "Running",
	done: "Completed",
	error: "Failed",
};

export interface ToolProps {
	name: string;
	status?: ToolState;
	input?: string;
	output?: string;
	defaultOpen?: boolean;
	className?: string;
}

export function Tool({
	name,
	status = "running",
	input,
	output,
	defaultOpen = false,
	className,
}: ToolProps) {
	const id = useId();
	const [open, setOpen] = useState(defaultOpen);

	return (
		<div
			className={cn(
				"overflow-hidden rounded-xl border border-border bg-card/40",
				className,
			)}
		>
			<button
				type="button"
				aria-expanded={open}
				aria-controls={id}
				onClick={() => setOpen((v) => !v)}
				className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-foreground/[0.03]"
			>
				<span
					aria-hidden
					className={cn("grid size-4 shrink-0 place-items-center", TONE[status])}
				>
					{status === "running" ? (
						<svg viewBox="0 0 12 12" fill="none" aria-hidden className="spinner size-3">
							<circle
								cx="6"
								cy="6"
								r="4.4"
								stroke="currentColor"
								strokeWidth="1.5"
								opacity="0.25"
							/>
							<path
								d="M10.4 6A4.4 4.4 0 0 0 6 1.6"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
					) : status === "done" ? (
						<svg viewBox="0 0 12 12" fill="none" aria-hidden className="size-3">
							<path
								d="M2.5 6.2 4.8 8.5 9.5 3.6"
								stroke="currentColor"
								strokeWidth="1.8"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					) : status === "error" ? (
						<svg viewBox="0 0 12 12" fill="none" aria-hidden className="size-3">
							<path
								d="M3.5 3.5 8.5 8.5M8.5 3.5 3.5 8.5"
								stroke="currentColor"
								strokeWidth="1.6"
								strokeLinecap="round"
							/>
						</svg>
					) : (
						<span className="size-1.5 rounded-full bg-current" />
					)}
				</span>

				<span className="flex-1 font-mono text-foreground text-xs">{name}</span>
				<span className={cn("shrink-0 text-[11px]", TONE[status])}>{LABEL[status]}</span>
				<svg
					viewBox="0 0 16 16"
					fill="none"
					aria-hidden
					style={{ transform: open ? "rotate(180deg)" : undefined }}
					className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
				>
					<path
						d="m4 6 4 4 4-4"
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			<div
				id={id}
				style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
				className="grid transition-[grid-template-rows] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
			>
				<div className="overflow-hidden">
					<div className="flex flex-col gap-2 border-border/60 border-t p-3">
						{input ? (
							<div>
								<p className="mb-1 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
									Input
								</p>
								<pre className="overflow-x-auto rounded-lg bg-background p-2 font-mono text-[11px] text-muted-foreground">
									<code>{input}</code>
								</pre>
							</div>
						) : null}
						{output ? (
							<div>
								<p className="mb-1 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
									Output
								</p>
								<pre className="overflow-x-auto rounded-lg bg-background p-2 font-mono text-[11px] text-foreground">
									<code>{output}</code>
								</pre>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}
