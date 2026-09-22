"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "../dropdown-menu/dropdown-menu";
import { cn } from "../lib/cn";

type Phase = "idle" | "sent" | "reply1" | "reply2" | "done";

/** One scripted agent reply revealed in the thread after the user sends. */
export type ChatMessage = {
	label: string;
	sub: string;
	time: string;
	body: string;
};

/** One switchable thread: its own tab, starting prompt, and scripted replies. */
export type ChatTopic = {
	key: string;
	label: string;
	initialPrompt: string;
	messages: ChatMessage[];
};

const ICON_BUTTON =
	"flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors duration-100 hover:bg-foreground/[0.06] hover:text-foreground data-[popup-open]:bg-foreground/[0.06] data-[popup-open]:text-foreground";

function Section({
	label,
	sub,
	time,
	body,
	resolving,
}: {
	label: string;
	sub: string;
	time: string;
	body: string;
	resolving?: boolean;
}) {
	return (
		<div
			className="card-fade-up flex w-full flex-col gap-1.5 transition-[opacity,filter,transform] duration-400 ease-[var(--ease-out)]"
			style={{
				opacity: resolving ? 0.55 : 1,
				filter: resolving ? "blur(0.5px)" : "blur(0)",
				transform: resolving ? "scale(0.985)" : "scale(1)",
				transformOrigin: "top left",
			}}
		>
			<div className="flex items-center gap-1 text-[12px] leading-[1.3]">
				<span className="font-medium text-foreground">{label}</span>
				<span className="text-muted-foreground">{sub}</span>
				<span className="text-foreground">for {time}</span>
			</div>
			<p className="text-[13px] text-foreground leading-normal">{body}</p>
		</div>
	);
}

export interface ChatComposerProps {
	/** Every switchable thread; the tabs ARE these topics. */
	topics: ChatTopic[];
	placeholder?: string;
	/** Fired with the trimmed prompt text and the active topic's key when the user sends. */
	onSend?: (text: string, topicKey: string) => void;
}

/** Interactive panel with switchable topic tabs, scripted replies, and a composer. Sending
 * begins a fixed reply sequence; the card's height never changes shape while it plays out. */
export function ChatComposer({
	topics,
	placeholder = "Send a message…",
	onSend,
}: ChatComposerProps) {
	const [activeKey, setActiveKey] = useState(topics[0]?.key);
	const topic = topics.find((t) => t.key === activeKey) ?? topics[0];

	const [phase, setPhase] = useState<Phase>("done");
	const [draft, setDraft] = useState("");
	const [submitted, setSubmitted] = useState(topic?.initialPrompt ?? "");
	const [history, setHistory] = useState<string[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const copyStatusId = useId();
	const [copyStatus, setCopyStatus] = useState("");

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;
		if (phase === "sent") timer = setTimeout(() => setPhase("reply1"), 500);
		else if (phase === "reply1") timer = setTimeout(() => setPhase("reply2"), 1400);
		else if (phase === "reply2") timer = setTimeout(() => setPhase("done"), 1200);
		else return;
		return () => clearTimeout(timer);
	}, [phase]);

	if (!topic) return null;

	const sent = phase !== "idle";
	const canSend = draft.trim().length > 0;
	const shownMessages =
		phase === "reply1" ? 1 : phase === "reply2" || phase === "done" ? 2 : 0;

	const send = (text: string) => {
		const trimmed = text.trim();
		if (!trimmed) return;
		setSubmitted(trimmed);
		onSend?.(trimmed, topic.key);
		setDraft("");
		setPhase("sent");
		setHistory((prev) => [trimmed, ...prev.filter((p) => p !== trimmed)].slice(0, 8));
	};

	const switchTopic = (key: string) => {
		const next = topics.find((t) => t.key === key);
		if (!next) return;
		setActiveKey(key);
		setSubmitted(next.initialPrompt);
		setPhase("done");
	};

	const startNew = () => {
		setSubmitted("");
		setDraft("");
		setPhase("idle");
		inputRef.current?.focus();
	};

	const copyConversation = async () => {
		const lines = [
			submitted,
			...topic.messages.slice(0, shownMessages).map((m) => m.body),
		];
		try {
			await navigator.clipboard.writeText(lines.join("\n"));
			setCopyStatus("Copied");
		} catch {
			setCopyStatus("Couldn't copy");
		}
		setTimeout(() => setCopyStatus(""), 1500);
	};

	return (
		<div
			data-slot="chat-composer"
			className="flex h-[288px] w-full max-w-sm flex-col self-start overflow-hidden rounded-2xl bg-card shadow-sm"
		>
			<div className="flex shrink-0 items-center justify-between border-border border-b p-1.5">
				<div className="flex items-center">
					{topics.map((t) => (
						<button
							key={t.key}
							type="button"
							aria-pressed={topic.key === t.key}
							onClick={() => switchTopic(t.key)}
							className={cn(
								"rounded-md px-2 py-[3px] text-[13px] text-foreground transition-[background-color,opacity] duration-100",
								topic.key === t.key ? "bg-input" : "opacity-50 hover:opacity-75",
							)}
						>
							{t.label}
						</button>
					))}
				</div>
				<div className="flex items-center gap-1">
					<button
						type="button"
						aria-label="New conversation"
						onClick={startNew}
						className={ICON_BUTTON}
					>
						<svg
							width="15"
							height="15"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden
						>
							<path d="M12 5v14M5 12h14" />
						</svg>
					</button>

					<DropdownMenu>
						<DropdownMenuTrigger aria-label="Prompt history" className={ICON_BUTTON}>
							<svg
								width="15"
								height="15"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden
							>
								<circle cx="12" cy="12" r="9" />
								<path d="M12 7v5l3 2" />
							</svg>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Recent prompts</DropdownMenuLabel>
							{history.length === 0 ? (
								<div className="px-2.5 py-1.5 text-muted-foreground text-xs">
									Nothing sent yet
								</div>
							) : (
								history.map((entry) => (
									<DropdownMenuItem key={entry} onClick={() => send(entry)}>
										<span className="min-w-0 flex-1 truncate">{entry}</span>
									</DropdownMenuItem>
								))
							)}
						</DropdownMenuContent>
					</DropdownMenu>

					<DropdownMenu>
						<DropdownMenuTrigger aria-label="More actions" className={ICON_BUTTON}>
							<svg
								width="15"
								height="15"
								viewBox="0 0 24 24"
								fill="currentColor"
								stroke="none"
								aria-hidden
							>
								<circle cx="5" cy="12" r="1.8" />
								<circle cx="12" cy="12" r="1.8" />
								<circle cx="19" cy="12" r="1.8" />
							</svg>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={copyConversation}>
								{copyStatus || "Copy conversation"}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-3 pt-2.5 pb-1">
				<div className="flex justify-end pl-14">
					<div
						className="rounded-xl bg-input px-3 py-1.5 text-[13px] text-foreground leading-[1.4] transition-[opacity,transform] duration-300 ease-[var(--ease-out)]"
						style={{
							opacity: sent ? 1 : 0,
							transform: sent ? "translateY(0)" : "translateY(10px)",
						}}
					>
						{submitted}
					</div>
				</div>

				{topic.messages[0] && shownMessages >= 1 ? (
					<Section
						label={topic.messages[0].label}
						sub={topic.messages[0].sub}
						time={topic.messages[0].time}
						body={topic.messages[0].body}
					/>
				) : null}
				{topic.messages[1] && shownMessages >= 2 ? (
					<Section
						label={topic.messages[1].label}
						sub={topic.messages[1].sub}
						time={topic.messages[1].time}
						body={topic.messages[1].body}
						resolving={phase === "reply2"}
					/>
				) : null}
			</div>

			<div className="mt-auto shrink-0 p-1.5">
				{/* biome-ignore lint/a11y/noStaticElementInteractions: mouse-only convenience click-through; the real input is independently focusable and labelled */}
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: same reason, no keyboard functionality is gated on this click */}
				<div
					onClick={() => inputRef.current?.focus()}
					className="flex cursor-text flex-col gap-2 rounded-lg border border-border bg-input p-2.5 shadow-xs transition-[border-color,box-shadow] duration-150 focus-within:border-border-strong"
				>
					<input
						ref={inputRef}
						value={draft}
						onChange={(event) => setDraft(event.target.value)}
						onKeyDown={(event) => {
							if (event.key === "Enter") send(draft);
						}}
						placeholder={placeholder}
						aria-label="Chat prompt"
						aria-describedby={copyStatus ? copyStatusId : undefined}
						className="min-h-4.5 bg-transparent text-[13px] text-foreground leading-[1.4] outline-none placeholder:text-muted-foreground"
					/>
					<div className="flex items-center justify-end">
						<button
							type="button"
							aria-label="Send"
							disabled={!canSend}
							onClick={() => send(draft)}
							className={cn(
								"flex size-7 items-center justify-center rounded-lg transition-[background-color,color,transform] duration-200 enabled:active:scale-[0.96]",
								canSend
									? "bg-foreground text-background"
									: "bg-border-strong text-muted-foreground",
							)}
						>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.4"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden
							>
								<path d="M12 19V5M5 12l7-7 7 7" />
							</svg>
						</button>
					</div>
				</div>
			</div>
			<span id={copyStatusId} role="status" className="sr-only">
				{copyStatus}
			</span>
		</div>
	);
}
