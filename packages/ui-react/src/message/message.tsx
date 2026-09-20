import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface MessageProps {
	children?: ReactNode;
	role?: "user" | "assistant";
	name?: string;
	pending?: boolean;
	showActions?: boolean;
	className?: string;
}

const ACTION =
	"grid size-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground";

export function Message({
	children,
	role = "assistant",
	name = "Assistant",
	pending = false,
	showActions = true,
	className,
}: MessageProps) {
	const isUser = role === "user";
	const initials = name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((w) => w[0] ?? "")
		.join("")
		.toUpperCase();

	return (
		<article
			aria-label={`${name} said`}
			className={cn(
				"group/message flex w-full gap-3",
				isUser && "flex-row-reverse",
				className,
			)}
		>
			<span
				aria-hidden
				className="grid size-7 shrink-0 place-items-center rounded-full bg-card font-medium text-[11px] text-muted-foreground"
			>
				{initials}
			</span>

			<div
				className={cn("flex min-w-0 max-w-[85%] flex-col gap-1.5", isUser && "items-end")}
			>
				<div
					className={cn(
						"rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
						isUser
							? "rounded-tr-sm bg-primary text-primary-foreground"
							: "rounded-tl-sm border border-border bg-card text-foreground",
					)}
				>
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

				{showActions && !pending && !isUser ? (
					<div className="flex items-center gap-0.5 opacity-0 transition-opacity duration-150 group-focus-within/message:opacity-100 group-hover/message:opacity-100 motion-reduce:transition-none">
						<button type="button" aria-label="Copy message" className={ACTION}>
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
						</button>
						<button type="button" aria-label="Retry" className={ACTION}>
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
					</div>
				) : null}
			</div>
		</article>
	);
}
