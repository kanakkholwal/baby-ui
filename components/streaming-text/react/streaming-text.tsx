"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import { CopyButton } from "../../copy-button/react/copy-button";
import { cn } from "../../lib/cn";
import { Markdown } from "../../markdown/react/markdown";
import {
	plainTextOf,
	type StreamingSource,
	type StreamingTextLayout,
	type StreamingTextSize,
	type StreamingToken,
	streamingText,
	tokensOf,
	WORD_DELAY,
} from "../variants";

export type { StreamingSource, StreamingTextLayout, StreamingTextSize, StreamingToken };

type Ctx = {
	done: boolean;
	setDone: (done: boolean) => void;
	text: string;
	setText: (text: string) => void;
	sources: StreamingSource[];
	size: StreamingTextSize;
	styles: ReturnType<typeof streamingText>;
};
const StreamingTextContext = createContext<Ctx | null>(null);

function useStreamingText(part: string): Ctx {
	const ctx = useContext(StreamingTextContext);
	if (!ctx) throw new Error(`${part} must be used inside <StreamingText>`);
	return ctx;
}

export interface StreamingTextProps extends ComponentProps<"div"> {
	layout?: StreamingTextLayout;
	size?: StreamingTextSize;
	/** Cited sources: inline chips in the answer and the StreamingTextSources list. */
	sources?: StreamingSource[];
}

/** The root: an answer that reveals once, then shows what follows it. */
export function StreamingText({
	layout = "inline",
	size = "default",
	sources = [],
	className,
	children,
	...props
}: StreamingTextProps) {
	const [done, setDone] = useState(false);
	const [text, setText] = useState("");
	const styles = streamingText({ layout, size });
	return (
		<StreamingTextContext.Provider
			value={{ done, setDone, text, setText, sources, size, styles }}
		>
			<div
				data-slot="streaming-text"
				data-streaming={!done || undefined}
				className={cn(styles.root(), className)}
				{...props}
			>
				{children}
			</div>
		</StreamingTextContext.Provider>
	);
}

export interface StreamingTextContentProps {
	/** Tokens with optional citations, or plain text revealed word by word. */
	content: StreamingToken[] | string;
	/** Render as Markdown; the reveal then follows `streaming` instead of the word timer. */
	markdown?: boolean;
	/** Markdown: `true` while chunks arrive, `false` once done. */
	streaming?: boolean;
	/** A blinking caret while the text reveals. */
	caret?: boolean;
	/** Milliseconds between words. */
	wordDelay?: number;
	onDone?: () => void;
	className?: string;
}

/** The answer. Plain text reveals word by word; Markdown follows your `streaming` flag. */
export function StreamingTextContent({
	content,
	markdown = false,
	streaming,
	caret = true,
	wordDelay = WORD_DELAY,
	onDone,
	className,
}: StreamingTextContentProps) {
	const { setDone, setText, sources, size, styles } =
		useStreamingText("StreamingTextContent");
	const tokens = useMemo(() => tokensOf(content), [content]);
	const plain = plainTextOf(content);
	const [count, setCount] = useState(0);
	const done = markdown ? !streaming : count >= tokens.length;
	const reported = useRef(false);

	useEffect(() => setText(plain), [plain, setText]);
	useEffect(() => {
		setDone(done);
		if (done && !reported.current) {
			reported.current = true;
			onDone?.();
		}
		if (!done) reported.current = false;
	}, [done, setDone, onDone]);
	useEffect(() => {
		if (markdown || count >= tokens.length) return;
		const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduce) {
			setCount(tokens.length);
			return;
		}
		const id = setTimeout(
			() => setCount((c) => Math.min(tokens.length, c + 1)),
			wordDelay,
		);
		return () => clearTimeout(id);
	}, [count, markdown, tokens.length, wordDelay]);

	if (markdown) {
		return (
			<div data-slot="streaming-text-content" className={className}>
				<Markdown content={plain} streaming={streaming} size={size} caret={caret} />
			</div>
		);
	}
	return (
		<p
			data-slot="streaming-text-content"
			aria-busy={!done || undefined}
			className={cn(styles.text(), className)}
		>
			{tokens.slice(0, count).map((token, i) => {
				const source = token.cite === undefined ? undefined : sources[token.cite];
				// Position is the identity: tokens arrive in a fixed order and words repeat.
				const key = `${i}-${token.text}`;
				if (token.cite === undefined) return <span key={key}>{token.text} </span>;
				if (!source) return null;
				return (
					<a
						key={key}
						href={source.href}
						target="_blank"
						rel="noreferrer"
						className={styles.chip()}
					>
						<img src={source.image} alt="" className="size-3 rounded-[3px]" />
						<span>{source.domain}</span>
					</a>
				);
			})}
			{caret && !done && <span aria-hidden className={styles.caret()} />}
		</p>
	);
}

/** The row under the answer, shown once it settles: copy, message actions, sources. */
export function StreamingTextFooter({ className, ...props }: ComponentProps<"div">) {
	const { styles } = useStreamingText("StreamingTextFooter");
	return (
		<div
			data-slot="streaming-text-footer"
			className={cn(styles.footer(), className)}
			{...props}
		/>
	);
}

/** Copies the whole answer as plain text. */
export function StreamingTextCopy({
	label = "Copy",
	className,
}: {
	label?: string;
	className?: string;
}) {
	const { text, styles } = useStreamingText("StreamingTextCopy");
	return (
		<CopyButton
			data-slot="streaming-text-copy"
			text={text}
			label={label}
			iconOnly
			className={cn(styles.copy(), className)}
		/>
	);
}

/** A favicon stack that opens the cited sources as a list of links. */
export function StreamingTextSources({
	label,
	open,
	defaultOpen,
	onOpenChange,
	className,
}: {
	/** Defaults to "3 sources". */
	label?: string;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	className?: string;
}) {
	const { sources, styles: s } = useStreamingText("StreamingTextSources");
	const panelId = useId();
	if (!sources.length) return null;
	return (
		<CollapsiblePrimitive.Root
			open={open}
			defaultOpen={defaultOpen}
			onOpenChange={onOpenChange}
			className={s.sources()}
		>
			<CollapsiblePrimitive.Trigger
				data-slot="streaming-text-sources"
				aria-controls={panelId}
				className={cn(s.sourcesTrigger(), className)}
			>
				<span className={s.favicons()}>
					{sources.map((source) => (
						<img key={source.href} src={source.image} alt="" className={s.favicon()} />
					))}
				</span>
				<span className={s.sourcesLabel()}>
					{label ?? `${sources.length} source${sources.length === 1 ? "" : "s"}`}
				</span>
			</CollapsiblePrimitive.Trigger>
			{/* keepMounted still sets `hidden`; force it off so the rows transition has a frame. */}
			<CollapsiblePrimitive.Panel
				id={panelId}
				keepMounted
				hidden={false}
				className={s.panel()}
			>
				<div className={s.clip()}>
					<div className={s.list()}>
						{sources.map((source) => (
							<a
								key={source.href}
								href={source.href}
								target="_blank"
								rel="noreferrer"
								className={s.source()}
							>
								<img src={source.image} alt="" className={s.sourceImage()} />
								<span>{source.name}</span>
								<span className={s.sourceDomain()}>{source.domain}</span>
							</a>
						))}
					</div>
				</div>
			</CollapsiblePrimitive.Panel>
		</CollapsiblePrimitive.Root>
	);
}

/** Suggested next prompts, shown once the answer settles. */
export function StreamingTextFollowUps({
	items,
	onSelect,
	label = "Follow-ups",
	className,
}: {
	items: string[];
	onSelect: (text: string, index: number) => void;
	label?: ReactNode;
	className?: string;
}) {
	const { styles: s } = useStreamingText("StreamingTextFollowUps");
	if (!items.length) return null;
	return (
		<div data-slot="streaming-text-follow-ups" className={cn(s.followUps(), className)}>
			<p className={s.followUpsLabel()}>{label}</p>
			<ul className={s.followUpList()}>
				{items.map((item, i) => (
					<li key={item}>
						<button
							type="button"
							onClick={() => onSelect(item, i)}
							className={s.followUp()}
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
							{item}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
