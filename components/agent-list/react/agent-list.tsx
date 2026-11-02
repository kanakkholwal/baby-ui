"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useId,
} from "react";
import { cn } from "../../lib/cn";
import { RollingDigits } from "../../rolling-digits/react/rolling-digits";
import {
	AGENT_LIST_CHEVRON,
	AGENT_STATUS_ICONS,
	AGENT_STATUS_TEXT,
	type AgentListVariant,
	type AgentStatus,
	type AgentStepStatus,
	agentList,
	agentStatus,
} from "../variants";

export type { AgentListVariant, AgentStatus, AgentStepStatus };

type Ctx = { styles: ReturnType<typeof agentList> };
const AgentListContext = createContext<Ctx | null>(null);
// Base UI drops aria-controls on closed rows, so each item names its trigger and panel.
type ItemCtx = { status: AgentStatus; trigger: string; content: string };
const ItemContext = createContext<ItemCtx | null>(null);

function useAgentList(part: string): Ctx {
	const ctx = useContext(AgentListContext);
	if (!ctx) throw new Error(`${part} must be used inside <AgentList>`);
	return ctx;
}

function useAgentItem(part: string): ItemCtx {
	const ctx = useContext(ItemContext);
	if (!ctx) throw new Error(`${part} must be used inside <AgentListItem>`);
	return ctx;
}

export interface AgentListProps
	extends Omit<
		ComponentProps<typeof AccordionPrimitive.Root>,
		"value" | "defaultValue" | "onValueChange" | "multiple" | "className"
	> {
	/** The agent whose steps are open; null folds every row. */
	value: string | null;
	onValueChange?: (value: string | null) => void;
	variant?: AgentListVariant;
	className?: string;
}

/** The root: background agents as rows, one open to its steps. */
export function AgentList({
	value,
	onValueChange,
	variant = "framed",
	className,
	...props
}: AgentListProps) {
	const styles = agentList({ variant });
	return (
		<AgentListContext.Provider value={{ styles }}>
			<AccordionPrimitive.Root
				data-slot="agent-list"
				data-variant={variant}
				value={value ? [value] : []}
				onValueChange={(next: unknown[]) => {
					const open = next.find((v): v is string => typeof v === "string");
					onValueChange?.(open ?? null);
				}}
				keepMounted
				render={<section />}
				className={cn(styles.root(), className)}
				{...props}
			/>
		</AgentListContext.Provider>
	);
}

/** The top row: lays out AgentListTitle and AgentListCount. */
export function AgentListHeader({ className, ...props }: ComponentProps<"div">) {
	const { styles } = useAgentList("AgentListHeader");
	return (
		<div
			data-slot="agent-list-header"
			className={cn(styles.header(), className)}
			{...props}
		/>
	);
}

export function AgentListTitle({
	className,
	children = "Agents",
	...props
}: ComponentProps<"h3">) {
	const { styles } = useAgentList("AgentListTitle");
	return (
		<h3 data-slot="agent-list-title" className={cn(styles.title(), className)} {...props}>
			{children}
		</h3>
	);
}

/** "2 running": rolls as agents start and finish. */
export function AgentListCount({
	value,
	label = "running",
	className,
}: {
	value: number;
	label?: string;
	className?: string;
}) {
	const { styles } = useAgentList("AgentListCount");
	return (
		<span data-slot="agent-list-count" className={cn(styles.count(), className)}>
			<span className="sr-only">
				{value} {label}
			</span>
			<span aria-hidden>
				<RollingDigits value={value} /> {label}
			</span>
		</span>
	);
}

export function AgentListRows({ className, ...props }: ComponentProps<"div">) {
	const { styles } = useAgentList("AgentListRows");
	return (
		<div
			data-slot="agent-list-rows"
			className={cn(styles.list(), className)}
			{...props}
		/>
	);
}

/** One agent; `status` drives its marker and the "needs you" tint. */
export function AgentListItem({
	value,
	status,
	className,
	children,
}: {
	value: string;
	status: AgentStatus;
	className?: string;
	children?: ReactNode;
}) {
	const { styles } = useAgentList("AgentListItem");
	const uid = useId();
	return (
		<ItemContext.Provider
			value={{ status, trigger: `${uid}-trigger`, content: `${uid}-content` }}
		>
			<AccordionPrimitive.Item
				value={value}
				data-slot="agent-list-item"
				data-status={status}
				className={cn(styles.item(), className)}
			>
				{children}
			</AccordionPrimitive.Item>
		</ItemContext.Provider>
	);
}

/** The row: put AgentListStatus, AgentListName, AgentListMeta and AgentListDiff in it. */
export function AgentListTrigger({
	className,
	children,
	...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
	const { styles } = useAgentList("AgentListTrigger");
	const ids = useAgentItem("AgentListTrigger");
	return (
		<AccordionPrimitive.Header
			// biome-ignore lint/a11y/useHeadingContent: Base UI renders the trigger inside it
			render={<h4 className="m-0" />}
		>
			<AccordionPrimitive.Trigger
				id={ids.trigger}
				aria-controls={ids.content}
				data-slot="agent-list-trigger"
				className={cn(styles.trigger(), className)}
				{...props}
			>
				{children}
				<svg viewBox="0 0 24 24" aria-hidden className={styles.chevron()}>
					<path d={AGENT_LIST_CHEVRON} />
				</svg>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

/** The item's status as a marker, with its word for screen readers. */
export function AgentListStatus({ className }: { className?: string }) {
	const { status } = useAgentItem("AgentListStatus");
	return (
		<span
			data-slot="agent-list-status"
			className={agentStatus({ status, class: className })}
		>
			<svg viewBox="0 0 24 24" aria-hidden>
				<circle cx="12" cy="12" r="9" opacity={status === "running" ? 0.25 : 1} />
				{AGENT_STATUS_ICONS[status] ? <path d={AGENT_STATUS_ICONS[status]} /> : null}
			</svg>
			<span className="sr-only">{AGENT_STATUS_TEXT[status]}</span>
		</span>
	);
}

/** The agent's task and, below it, a line such as its branch and age. */
export function AgentListHeading({ className, ...props }: ComponentProps<"span">) {
	const { styles } = useAgentList("AgentListHeading");
	return <span className={cn(styles.heading(), className)} {...props} />;
}

export function AgentListName({ className, ...props }: ComponentProps<"span">) {
	const { styles } = useAgentList("AgentListName");
	return <span className={cn(styles.name(), className)} {...props} />;
}

export function AgentListMeta({ className, ...props }: ComponentProps<"span">) {
	const { styles } = useAgentList("AgentListMeta");
	return <span className={cn(styles.meta(), className)} {...props} />;
}

/** Lines the agent added and removed. */
export function AgentListDiff({
	added,
	removed,
	className,
}: {
	added: number;
	removed: number;
	className?: string;
}) {
	const { styles } = useAgentList("AgentListDiff");
	return (
		<span className={cn(styles.diff(), className)}>
			<span className={styles.added()}>
				<span aria-hidden>+</span>
				<span className="sr-only">added </span>
				{added}
			</span>
			<span className={styles.removed()}>
				<span aria-hidden>−</span>
				<span className="sr-only">removed </span>
				{removed}
			</span>
		</span>
	);
}

/** The open agent's detail: AgentListSteps and, when it needs you, AgentListDecision. */
export function AgentListContent({
	className,
	children,
	...props
}: ComponentProps<typeof AccordionPrimitive.Panel>) {
	const { styles } = useAgentList("AgentListContent");
	const ids = useAgentItem("AgentListContent");
	return (
		<AccordionPrimitive.Panel
			id={ids.content}
			aria-labelledby={ids.trigger}
			data-slot="agent-list-content"
			className={styles.panel()}
			render={(renderProps, state) => (
				<div {...renderProps} hidden={false} inert={!state.open} />
			)}
			{...props}
		>
			<div className={styles.clip()}>
				<div className={cn(styles.body(), className)}>{children}</div>
			</div>
		</AccordionPrimitive.Panel>
	);
}

export function AgentListSteps({ className, ...props }: ComponentProps<"ol">) {
	const { styles } = useAgentList("AgentListSteps");
	return <ol className={cn(styles.steps(), className)} {...props} />;
}

export function AgentListStep({
	status = "done",
	className,
	children,
}: {
	status?: AgentStepStatus;
	className?: string;
	children?: ReactNode;
}) {
	const { styles } = useAgentList("AgentListStep");
	return (
		<li data-status={status} className={cn(styles.step(), className)}>
			<span aria-hidden data-status={status} className={styles.stepDot()} />
			<span className="min-w-0 truncate">{children}</span>
		</li>
	);
}

/** What the agent is blocked on; folds away once `open` turns false after an answer. */
export function AgentListDecision({
	prompt,
	open = true,
	className,
	children,
}: {
	prompt: ReactNode;
	open?: boolean;
	className?: string;
	children?: ReactNode;
}) {
	const { styles } = useAgentList("AgentListDecision");
	return (
		<div data-open={open || undefined} inert={!open} className={styles.fold()}>
			<div className={styles.clip()}>
				<div data-slot="agent-list-decision" className={cn(styles.decision(), className)}>
					<p className={styles.prompt()}>{prompt}</p>
					{children}
				</div>
			</div>
		</div>
	);
}

export function AgentListActions({ className, ...props }: ComponentProps<"div">) {
	const { styles } = useAgentList("AgentListActions");
	return <div className={cn(styles.actions(), className)} {...props} />;
}

/** Below the rows, e.g. a Composer that queues the next agent. */
export function AgentListFooter({ className, ...props }: ComponentProps<"div">) {
	const { styles } = useAgentList("AgentListFooter");
	return (
		<div
			data-slot="agent-list-footer"
			className={cn(styles.footer(), className)}
			{...props}
		/>
	);
}
