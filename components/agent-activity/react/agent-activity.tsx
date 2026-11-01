"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { ShimmerText } from "../../shimmer-text/react/shimmer-text";
import {
	AGENT_ACTIVITY_ICONS,
	type AgentActivityAction,
	type AgentActivityStatus,
	type AgentActivityStepStatus,
	type AgentActivityVariant,
	actionIcon,
	agentActivity,
} from "../variants";

export type {
	AgentActivityAction,
	AgentActivityStatus,
	AgentActivityStepStatus,
	AgentActivityVariant,
};

type Ctx = {
	working: boolean;
	maxHeight: number;
	styles: ReturnType<typeof agentActivity>;
};
const AgentActivityContext = createContext<Ctx | null>(null);

function useAgentActivity(part: string): Ctx {
	const ctx = useContext(AgentActivityContext);
	if (!ctx) throw new Error(`${part} must be used inside <AgentActivity>`);
	return ctx;
}

export interface AgentActivityProps {
	/** `working` keeps the log open and gliding; `complete` folds it behind the summary. */
	status?: AgentActivityStatus;
	/** Open after the run, when the log sits behind the summary. */
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	/** Fold the log away the moment the run completes. */
	collapseOnComplete?: boolean;
	/** In px: past it the live log glides up, and the finished one scrolls. */
	maxHeight?: number;
	variant?: AgentActivityVariant;
	className?: string;
	/** AgentActivityTrigger, then AgentActivityContent with the rows. */
	children: ReactNode;
}

/** The root: an agent's run as a live log that folds into a one-line summary when it ends. */
export function AgentActivity({
	status = "working",
	open,
	defaultOpen = false,
	onOpenChange,
	collapseOnComplete = true,
	maxHeight = 208,
	variant = "plain",
	className,
	children,
}: AgentActivityProps) {
	const [own, setOwn] = useState(defaultOpen);
	const current = open ?? own;
	const working = status === "working";
	const setOpen = (next: boolean) => {
		if (open === undefined) setOwn(next);
		onOpenChange?.(next);
	};

	// Adjusted during render, so the fold starts on the same frame the run completes.
	const [previous, setPrevious] = useState(status);
	if (previous !== status) {
		setPrevious(status);
		if (previous === "working" && status === "complete") setOpen(!collapseOnComplete);
	}

	const styles = agentActivity({ variant });
	return (
		<AgentActivityContext.Provider value={{ working, maxHeight, styles }}>
			<CollapsiblePrimitive.Root
				data-slot="agent-activity"
				data-status={status}
				data-variant={variant}
				aria-busy={working}
				open={working || current}
				onOpenChange={(next) => {
					if (!working) setOpen(next);
				}}
				className={cn(styles.root(), className)}
			>
				{children}
			</CollapsiblePrimitive.Root>
		</AgentActivityContext.Provider>
	);
}

export interface AgentActivityTriggerProps {
	/** Shown, shimmering, while the run works. */
	label?: string;
	/** What the finished run did, e.g. "Worked for 12s, searched 3 sites". */
	summary: string;
	className?: string;
}

export function AgentActivityTrigger({
	label = "Working…",
	summary,
	className,
}: AgentActivityTriggerProps) {
	const { working, styles } = useAgentActivity("AgentActivityTrigger");
	if (working) {
		return (
			<div
				data-slot="agent-activity-trigger"
				role="status"
				className={cn(styles.status(), className)}
			>
				<ShimmerText as="span" text={label} />
			</div>
		);
	}
	return (
		<CollapsiblePrimitive.Trigger
			data-slot="agent-activity-trigger"
			className={cn(styles.trigger(), className)}
		>
			<span className={styles.summary()}>{summary}</span>
			<svg viewBox="0 0 24 24" aria-hidden className={styles.chevron()}>
				<path d={AGENT_ACTIVITY_ICONS.chevron} />
			</svg>
		</CollapsiblePrimitive.Trigger>
	);
}

export function AgentActivityContent({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	const { working, maxHeight, styles } = useAgentActivity("AgentActivityContent");
	const listRef = useRef<HTMLUListElement>(null);
	const [height, setHeight] = useState(0);

	useLayoutEffect(() => {
		const node = listRef.current;
		if (!node) return;
		const observer = new ResizeObserver(() => setHeight(node.offsetHeight));
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	const capped = height > maxHeight;
	const viewport = Math.min(height, maxHeight);
	// While the run works, the newest row stays in view by sliding the list up, not by scrolling.
	const offset = working ? Math.min(0, viewport - height) : 0;

	return (
		// keepMounted still sets `hidden`; force it off so the rows transition has a frame.
		<CollapsiblePrimitive.Panel
			keepMounted
			hidden={false}
			data-slot="agent-activity-content"
			className={styles.panel()}
		>
			<div className={styles.clip()}>
				<div
					data-capped={capped || undefined}
					data-working={working || undefined}
					data-scroll={(capped && !working) || undefined}
					style={{ height: viewport }}
					className={styles.viewport()}
				>
					<ul
						ref={listRef}
						style={{ translate: `0 ${offset}px` }}
						className={cn(styles.list(), className)}
					>
						{children}
					</ul>
				</div>
			</div>
		</CollapsiblePrimitive.Panel>
	);
}

export interface AgentActivityStepProps {
	status?: AgentActivityStepStatus;
	/** Trailing detail, such as how long the step took. */
	meta?: string;
	className?: string;
	children: ReactNode;
}

export function AgentActivityStep({
	status = "done",
	meta,
	className,
	children,
}: AgentActivityStepProps) {
	const { styles: s } = useAgentActivity("AgentActivityStep");
	return (
		<li
			data-slot="agent-activity-step"
			data-status={status}
			className={cn(s.row(), className)}
		>
			<span aria-hidden className={s.icon()}>
				{status === "active" ? (
					<span className={s.pulse()} />
				) : (
					<svg viewBox="0 0 24 24" aria-hidden>
						<path
							d={
								status === "done"
									? AGENT_ACTIVITY_ICONS.check
									: AGENT_ACTIVITY_ICONS.circle
							}
						/>
					</svg>
				)}
			</span>
			<span data-status={status} className={s.label()}>
				{children}
			</span>
			{meta && <span className={s.meta()}>{meta}</span>}
		</li>
	);
}

/** A line of the agent's own narration between the actions. */
export function AgentActivityText({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	const { styles } = useAgentActivity("AgentActivityText");
	return (
		<li data-slot="agent-activity-text" className={cn(styles.text(), className)}>
			{children}
		</li>
	);
}

export interface AgentActivitySearchProps {
	query: string;
	/** Results found but not listed, shown as "+N more". */
	more?: number;
	className?: string;
	/** AgentActivityResult rows, added as they arrive. */
	children?: ReactNode;
}

export function AgentActivitySearch({
	query,
	more = 0,
	className,
	children,
}: AgentActivitySearchProps) {
	const { styles: s } = useAgentActivity("AgentActivitySearch");
	return (
		<li data-slot="agent-activity-search" className={cn(s.search(), className)}>
			<div className={cn(s.row(), "text-muted-foreground")}>
				<span aria-hidden className={s.icon()}>
					<svg viewBox="0 0 24 24" aria-hidden>
						<path d={AGENT_ACTIVITY_ICONS.search} />
					</svg>
				</span>
				<span className="min-w-0 truncate">{query}</span>
			</div>
			{children && <div className={s.results()}>{children}</div>}
			{more > 0 && <div className={s.more()}>+{more} more</div>}
		</li>
	);
}

export interface AgentActivityResultProps {
	/** Makes the result a link to the source. */
	href?: string;
	domain?: string;
	/** A favicon or mark; a globe by default. */
	icon?: ReactNode;
	className?: string;
	children: ReactNode;
}

export function AgentActivityResult({
	href,
	domain,
	icon,
	className,
	children,
}: AgentActivityResultProps) {
	const { styles: s } = useAgentActivity("AgentActivityResult");
	const body = (
		<>
			<span aria-hidden className={s.resultIcon()}>
				{icon ?? (
					<svg viewBox="0 0 24 24" aria-hidden>
						<path d={AGENT_ACTIVITY_ICONS.globe} />
					</svg>
				)}
			</span>
			<span className={s.resultTitle()}>{children}</span>
			{domain && <span className={s.resultDomain()}>{domain}</span>}
		</>
	);
	return href ? (
		<a
			data-slot="agent-activity-result"
			data-link
			href={href}
			target="_blank"
			rel="noreferrer noopener"
			className={cn(s.result(), className)}
		>
			{body}
		</a>
	) : (
		<div data-slot="agent-activity-result" className={cn(s.result(), className)}>
			{body}
		</div>
	);
}

export interface AgentActivityToolProps extends Omit<ComponentProps<"li">, "children"> {
	/** `read`, `edit` and `run` get their own icons; any other verb gets a wrench. */
	action: AgentActivityAction;
	/** What it acted on: a path, a command, a URL. */
	target: string;
	additions?: number;
	deletions?: number;
}

export function AgentActivityTool({
	action,
	target,
	additions,
	deletions,
	className,
	...props
}: AgentActivityToolProps) {
	const { styles: s } = useAgentActivity("AgentActivityTool");
	return (
		<li
			data-slot="agent-activity-tool"
			data-action={action}
			className={cn(s.row(), "items-center", className)}
			{...props}
		>
			<span aria-hidden className={cn(s.icon(), "mt-0")}>
				<svg viewBox="0 0 24 24" aria-hidden>
					<path d={actionIcon(action)} />
				</svg>
			</span>
			<span className={s.action()}>
				{action.charAt(0).toUpperCase() + action.slice(1)}
			</span>
			<span className={s.target()}>{target}</span>
			{(additions !== undefined || deletions !== undefined) && (
				<span className={s.diff()}>
					{additions !== undefined && <span className={s.added()}>+{additions}</span>}
					{deletions !== undefined && <span className={s.removed()}>−{deletions}</span>}
				</span>
			)}
		</li>
	);
}
