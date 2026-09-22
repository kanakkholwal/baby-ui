"use client";

import { type ReactNode, useRef, useState } from "react";
import { cn } from "../lib/cn";
import {
	type MessageLayout,
	type MessageMotion,
	type MessageTone,
	message,
} from "./variants";

export interface MessageProps {
	children?: ReactNode;
	align?: "start" | "end";
	name?: string;
	pending?: boolean;
	showActions?: boolean;
	onRetry?: () => void;
	tone?: MessageTone;
	layout?: MessageLayout;
	motion?: MessageMotion;
	className?: string;
	bubbleClassName?: string;
}

const ACTION =
	"grid size-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground";

export function Message({
	children,
	align = "start",
	name = "Assistant",
	pending = false,
	showActions = true,
	onRetry,
	tone = "surface",
	layout = "default",
	motion = "none",
	className,
	bubbleClassName,
}: MessageProps) {
	const isEnd = align === "end";
	const compact = layout === "compact";
	const initials = name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((w) => w[0] ?? "")
		.join("")
		.toUpperCase();
	const { root, stack, bubble } = message({ tone, layout, motion });
	const bubbleRef = useRef<HTMLDivElement>(null);
	const [copied, setCopied] = useState(false);
	const [copyFailed, setCopyFailed] = useState(false);

	async function copyText() {
		try {
			await navigator.clipboard.writeText(bubbleRef.current?.textContent?.trim() ?? "");
			setCopied(true);
		} catch {
			// Clipboard access can be denied outside a secure context; say so rather than doing nothing.
			setCopyFailed(true);
		}
		setTimeout(() => {
			setCopied(false);
			setCopyFailed(false);
		}, 1500);
	}

	return (
		<article
			aria-label={`${name} said`}
			className={cn(
				root(),
				isEnd && (compact ? "justify-end" : "flex-row-reverse"),
				className,
			)}
		>
			{compact ? null : (
				<span
					aria-hidden
					className="grid size-7 shrink-0 place-items-center rounded-full bg-card font-medium text-[11px] text-muted-foreground"
				>
					{initials}
				</span>
			)}

			<div className={cn(stack(), isEnd && "items-end")}>
				<div ref={bubbleRef} className={cn(bubble(), bubbleClassName)}>
					{pending ? (
						<span role="status" className="flex items-center gap-1 py-1">
							<span className="sr-only">Thinking</span>
							{[0, 1, 2].map((dot) => (
								<span
									key={dot}
									style={{ animationDelay: `${dot * 160}ms` }}
									className="typing-dot size-1.5 rounded-full bg-current opacity-40"
								/>
							))}
						</span>
					) : (
						children
					)}
				</div>

				{showActions && !pending && !compact ? (
					<div className="flex items-center gap-0.5 opacity-0 transition-opacity duration-150 group-focus-within/message:opacity-100 group-hover/message:opacity-100 motion-reduce:transition-none">
						<button
							type="button"
							onClick={copyText}
							aria-label={
								copied ? "Copied" : copyFailed ? "Press Ctrl+C" : "Copy message"
							}
							className={ACTION}
						>
							{copied ? (
								<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3.5">
									<path
										d="M3.5 8.4 6.4 11 12.5 4.5"
										stroke="currentColor"
										strokeWidth="1.4"
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
										rx="1.8"
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
								className={ACTION}
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
					</div>
				) : null}
			</div>
		</article>
	);
}
