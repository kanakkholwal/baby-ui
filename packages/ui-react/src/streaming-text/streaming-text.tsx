"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { type StreamingTextLayout, streamingText } from "./variants";

const WORD_DELAY = 55;

export type StreamingToken = { text: string; cite?: number };
export type StreamingSource = {
	name: string;
	domain: string;
	href: string;
	image: string;
};

function SourceChip({ source }: { source?: StreamingSource }) {
	if (!source) return null;
	return (
		<a
			href={source.href}
			target="_blank"
			rel="noreferrer"
			className="pop-in mr-1 inline-flex h-4.5 translate-y-[-1px] items-center gap-1 rounded-[5px] bg-muted px-[3px] align-middle font-mono text-[10.5px] text-muted-foreground shadow-xs transition-colors duration-150 hover:bg-foreground/[0.06] hover:text-foreground"
		>
			<img src={source.image} alt="" className="size-3 rounded-[3px]" />
			<span>{source.domain}</span>
		</a>
	);
}

const ACTION_ICON =
	"flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors duration-100 hover:bg-foreground/[0.06] hover:text-foreground";

export interface StreamingTextProps {
	layout?: StreamingTextLayout;
	content: StreamingToken[];
	sources?: StreamingSource[];
	followUps?: string[];
	sourcesLabel?: string;
	followUpsLabel?: string;
	wordDelay?: number;
	onDone?: () => void;
	onFollowUp?: (text: string, index: number) => void;
	onRetry?: () => void;
	onFeedback?: (positive: boolean) => void;
	className?: string;
}

/** Reveals once and stops, same contract as ResponseStream; no gallery-style auto-loop. */
export function StreamingText({
	layout = "inline",
	content,
	sources = [],
	followUps = [],
	sourcesLabel,
	followUpsLabel = "Follow-ups",
	wordDelay = WORD_DELAY,
	onDone,
	onFollowUp,
	onRetry,
	onFeedback,
	className,
}: StreamingTextProps) {
	const [count, setCount] = useState(0);
	const [sourcesOpen, setSourcesOpen] = useState(false);
	const [copied, setCopied] = useState(false);
	const done = count >= content.length;
	const doneRef = useRef(false);
	const { root, text } = streamingText({ layout });

	useEffect(() => {
		if (done) return;
		const id = setTimeout(
			() => setCount((c) => Math.min(content.length, c + 1)),
			wordDelay,
		);
		return () => clearTimeout(id);
	}, [count, done, content.length, wordDelay]);

	useEffect(() => {
		if (!done || doneRef.current) return;
		doneRef.current = true;
		onDone?.();
	}, [done, onDone]);

	async function copyText() {
		const plain = content.map((t) => t.text).join(" ");
		try {
			await navigator.clipboard.writeText(plain);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			// Clipboard access can be denied outside a secure context; nothing to fall back to here.
		}
	}

	return (
		<div data-slot="streaming-text" className={cn(root(), className)}>
			<p className={text()}>
				{content
					.slice(0, count)
					.map((token, i) =>
						token.cite !== undefined ? (
							<SourceChip key={`${token.text}-${i}`} source={sources[token.cite]} />
						) : (
							<span key={`${token.text}-${i}`}>{token.text} </span>
						),
					)}
				{!done ? (
					<span
						aria-hidden
						className="stream-caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-current"
					/>
				) : null}
			</p>

			<div
				className="mt-2 flex items-center gap-0.5 transition-opacity duration-400"
				style={{ opacity: done ? 1 : 0, pointerEvents: done ? "auto" : "none" }}
			>
				<button
					type="button"
					onClick={copyText}
					aria-label={copied ? "Copied" : "Copy"}
					className={ACTION_ICON}
				>
					{copied ? (
						<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3.5">
							<path
								d="M3.5 8.4 6.4 11 12.5 4.5"
								stroke="currentColor"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					) : (
						<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3.5">
							<rect
								x="5.5"
								y="5.5"
								width="8"
								height="8"
								rx="1.6"
								stroke="currentColor"
								strokeWidth="1.3"
							/>
							<path
								d="M10.5 2.5H3.6A1.6 1.6 0 0 0 2 4.1V11"
								stroke="currentColor"
								strokeWidth="1.3"
								strokeLinecap="round"
							/>
						</svg>
					)}
				</button>
				{onRetry ? (
					<button
						type="button"
						onClick={onRetry}
						aria-label="Retry"
						className={ACTION_ICON}
					>
						<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3.5">
							<path
								d="M13 8a5 5 0 1 1-1.6-3.7"
								stroke="currentColor"
								strokeWidth="1.3"
								strokeLinecap="round"
							/>
							<path
								d="M13 2.5V5h-2.5"
								stroke="currentColor"
								strokeWidth="1.3"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				) : null}
				{onFeedback ? (
					<>
						<button
							type="button"
							onClick={() => onFeedback(true)}
							aria-label="Good response"
							className={ACTION_ICON}
						>
							<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3.5">
								<path
									d="M6 14V6.5l3-4.5 1 .8-1 3.2h4.3a1 1 0 0 1 1 1.2l-1 5a1 1 0 0 1-1 .8H6Zm0 0H3.5A1.5 1.5 0 0 1 2 12.5v-4A1.5 1.5 0 0 1 3.5 7H6"
									stroke="currentColor"
									strokeWidth="1.2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
						<button
							type="button"
							onClick={() => onFeedback(false)}
							aria-label="Bad response"
							className={ACTION_ICON}
						>
							<svg
								viewBox="0 0 16 16"
								fill="none"
								aria-hidden
								className="size-3.5 rotate-180"
							>
								<path
									d="M6 14V6.5l3-4.5 1 .8-1 3.2h4.3a1 1 0 0 1 1 1.2l-1 5a1 1 0 0 1-1 .8H6Zm0 0H3.5A1.5 1.5 0 0 1 2 12.5v-4A1.5 1.5 0 0 1 3.5 7H6"
									stroke="currentColor"
									strokeWidth="1.2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</>
				) : null}
				{sources.length ? (
					<button
						type="button"
						aria-expanded={sourcesOpen}
						onClick={() => setSourcesOpen((v) => !v)}
						className="ml-1.5 flex items-center gap-1.5 rounded-md px-1 py-0.5 text-left transition-colors duration-150 hover:bg-foreground/[0.06]"
					>
						<span className="flex -space-x-1">
							{sources.map((source) => (
								<img
									key={source.domain}
									src={source.image}
									alt=""
									className="size-3.5 rounded-full bg-card shadow-[0_0_0_1.5px_var(--background)]"
								/>
							))}
						</span>
						<span className="text-[12px] text-muted-foreground">
							{sourcesLabel ??
								`${sources.length} source${sources.length === 1 ? "" : "s"}`}
						</span>
					</button>
				) : null}
			</div>

			{sources.length ? (
				<div
					className="grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out)]"
					style={{
						gridTemplateRows: done && sourcesOpen ? "1fr" : "0fr",
						opacity: done && sourcesOpen ? 1 : 0,
					}}
				>
					<div className="overflow-hidden">
						<div className="mt-1.5 flex flex-col rounded-[10px] bg-muted p-1 shadow-xs">
							{sources.map((source) => (
								<a
									key={source.domain}
									href={source.href}
									target="_blank"
									rel="noreferrer"
									className="flex items-center gap-2 rounded-md px-1.5 py-1 text-[12px] text-muted-foreground transition-colors duration-150 hover:bg-foreground/[0.06] hover:text-foreground"
								>
									<img src={source.image} alt="" className="size-4 rounded-[4px]" />
									<span>{source.name}</span>
									<span className="ml-auto font-mono text-[10.5px] text-muted-foreground/70">
										{source.domain}
									</span>
								</a>
							))}
						</div>
					</div>
				</div>
			) : null}

			{followUps.length ? (
				<div
					className="mt-2.5 transition-opacity duration-400"
					style={{ opacity: done ? 1 : 0, pointerEvents: done ? "auto" : "none" }}
				>
					<p className="font-medium text-[12px] text-muted-foreground">
						{followUpsLabel}
					</p>
					<div className="mt-0.5 flex flex-col">
						{followUps.map((label, i) => (
							<button
								key={label}
								type="button"
								onClick={() => onFollowUp?.(label, i)}
								className="-mx-1.5 flex items-center gap-2 rounded-md border-border border-b px-1.5 py-1.5 text-left text-[12.5px] text-foreground transition-colors duration-100 last:border-0 hover:bg-foreground/[0.06]"
							>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden
									className="size-3 shrink-0 text-muted-foreground"
								>
									<path d="M9 10l-5 5 5 5" />
									<path d="M20 4v7a4 4 0 0 1-4 4H4" />
								</svg>
								{label}
							</button>
						))}
					</div>
				</div>
			) : null}
		</div>
	);
}
