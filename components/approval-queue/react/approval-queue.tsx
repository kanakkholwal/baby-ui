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
import { TOOL_ICONS, type ToolKind } from "../../tool/variants";
import {
	APPROVAL_QUEUE_ICONS,
	type ApprovalQueueVariant,
	approvalQueue,
} from "../variants";

export type { ApprovalQueueVariant };

type Ctx = { styles: ReturnType<typeof approvalQueue> };
const ApprovalQueueContext = createContext<Ctx | null>(null);

// Base UI drops aria-controls on closed rows, so each item names its trigger and panel.
const ItemContext = createContext<{ trigger: string; content: string } | null>(null);

function useApprovalQueue(part: string): Ctx {
	const ctx = useContext(ApprovalQueueContext);
	if (!ctx) throw new Error(`${part} must be used inside <ApprovalQueue>`);
	return ctx;
}

export interface ApprovalQueueProps
	extends Omit<
		ComponentProps<typeof AccordionPrimitive.Root>,
		"value" | "defaultValue" | "onValueChange" | "multiple" | "className"
	> {
	/** The request under review, by item value; null folds every row. */
	value: string | null;
	/** A row was opened or closed; move `value` to it. */
	onValueChange?: (value: string | null) => void;
	variant?: ApprovalQueueVariant;
	className?: string;
}

/** The root: requests waiting on a person, one open for review and the rest as rows. */
export function ApprovalQueue({
	value,
	onValueChange,
	variant = "framed",
	className,
	...props
}: ApprovalQueueProps) {
	const styles = approvalQueue({ variant });
	return (
		<ApprovalQueueContext.Provider value={{ styles }}>
			<AccordionPrimitive.Root
				data-slot="approval-queue"
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
		</ApprovalQueueContext.Provider>
	);
}

/** The top row: lays out ApprovalQueueIcon, ApprovalQueueTitle and ApprovalQueueCount. */
export function ApprovalQueueHeader({ className, ...props }: ComponentProps<"div">) {
	const { styles } = useApprovalQueue("ApprovalQueueHeader");
	return (
		<div
			data-slot="approval-queue-header"
			className={cn(styles.header(), className)}
			{...props}
		/>
	);
}

/** The header glyph; children replace the raised hand. */
export function ApprovalQueueIcon({
	className,
	children,
	...props
}: ComponentProps<"span">) {
	const { styles } = useApprovalQueue("ApprovalQueueIcon");
	return (
		<span
			aria-hidden
			data-slot="approval-queue-icon"
			className={cn(styles.icon(), className)}
			{...props}
		>
			{children ?? (
				<svg
					viewBox="0 0 24 24"
					aria-hidden
					className="fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]"
				>
					<path d={APPROVAL_QUEUE_ICONS.hand} />
				</svg>
			)}
		</span>
	);
}

export function ApprovalQueueTitle({
	className,
	children = "Waiting for approval",
	...props
}: ComponentProps<"h3">) {
	const { styles } = useApprovalQueue("ApprovalQueueTitle");
	return (
		<h3
			data-slot="approval-queue-title"
			className={cn(styles.title(), className)}
			{...props}
		>
			{children}
		</h3>
	);
}

/** How many requests wait, rolling as it changes. */
export function ApprovalQueueCount({
	value,
	label = "waiting",
	className,
}: {
	value: number;
	/** Read after the number by screen readers. */
	label?: string;
	className?: string;
}) {
	const { styles } = useApprovalQueue("ApprovalQueueCount");
	return (
		<span data-slot="approval-queue-count" className={cn(styles.count(), className)}>
			<span className="sr-only">
				{value} {label}
			</span>
			<span aria-hidden>
				<RollingDigits value={value} />
			</span>
		</span>
	);
}

export function ApprovalQueueList({ className, ...props }: ComponentProps<"div">) {
	const { styles } = useApprovalQueue("ApprovalQueueList");
	return (
		<div
			data-slot="approval-queue-list"
			className={cn(styles.list(), className)}
			{...props}
		/>
	);
}

/** One request. `dismissed` folds it away once decided; keep it in the list until then. */
export function ApprovalQueueItem({
	value,
	dismissed = false,
	className,
	children,
}: {
	value: string;
	dismissed?: boolean;
	className?: string;
	children?: ReactNode;
}) {
	const { styles } = useApprovalQueue("ApprovalQueueItem");
	const uid = useId();
	return (
		<div
			data-slot="approval-queue-item"
			data-dismissed={dismissed || undefined}
			inert={dismissed}
			className={cn(styles.item(), className)}
		>
			<div className={styles.clip()}>
				<ItemContext.Provider
					value={{ trigger: `${uid}-trigger`, content: `${uid}-content` }}
				>
					<AccordionPrimitive.Item value={value} className={styles.row()}>
						{children}
					</AccordionPrimitive.Item>
				</ItemContext.Provider>
			</div>
		</div>
	);
}

/** The one-line row: put ApprovalQueueKind, ApprovalQueueLabel, ApprovalQueueMeta and a risk Badge in it. */
export function ApprovalQueueTrigger({
	className,
	children,
	...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
	const { styles } = useApprovalQueue("ApprovalQueueTrigger");
	const ids = useContext(ItemContext);
	return (
		<AccordionPrimitive.Header
			// biome-ignore lint/a11y/useHeadingContent: Base UI renders the trigger inside it
			render={<h4 className="m-0" />}
		>
			<AccordionPrimitive.Trigger
				id={ids?.trigger}
				aria-controls={ids?.content}
				data-slot="approval-queue-trigger"
				className={cn(styles.trigger(), className)}
				{...props}
			>
				{children}
				<svg viewBox="0 0 24 24" aria-hidden className={styles.chevron()}>
					<path d={APPROVAL_QUEUE_ICONS.chevron} />
				</svg>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

/** The tool's kind, with the same glyphs as Tool. */
export function ApprovalQueueKind({
	kind = "function",
	className,
}: {
	kind?: ToolKind;
	className?: string;
}) {
	const { styles } = useApprovalQueue("ApprovalQueueKind");
	return (
		<span aria-hidden className={cn(styles.kind(), className)}>
			<svg viewBox="0 0 24 24" aria-hidden>
				<path d={TOOL_ICONS[kind]} />
			</svg>
		</span>
	);
}

export function ApprovalQueueLabel({ className, ...props }: ComponentProps<"span">) {
	const { styles } = useApprovalQueue("ApprovalQueueLabel");
	return <span className={cn(styles.label(), className)} {...props} />;
}

/** The tool name, in monospace; hidden on narrow screens. */
export function ApprovalQueueMeta({ className, ...props }: ComponentProps<"span">) {
	const { styles } = useApprovalQueue("ApprovalQueueMeta");
	return <span className={cn(styles.meta(), className)} {...props} />;
}

/** The open request's detail, usually an ApprovalGate. */
export function ApprovalQueueContent({
	className,
	children,
	...props
}: ComponentProps<typeof AccordionPrimitive.Panel>) {
	const { styles } = useApprovalQueue("ApprovalQueueContent");
	const ids = useContext(ItemContext);
	return (
		<AccordionPrimitive.Panel
			id={ids?.content}
			aria-labelledby={ids?.trigger}
			data-slot="approval-queue-content"
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

/** Unfolds when `open`, i.e. nothing is waiting. */
export function ApprovalQueueEmpty({
	open,
	className,
	children = "Nothing is waiting on you.",
}: {
	open: boolean;
	className?: string;
	children?: ReactNode;
}) {
	const { styles } = useApprovalQueue("ApprovalQueueEmpty");
	return (
		<div
			data-slot="approval-queue-empty"
			data-open={open || undefined}
			aria-hidden={!open}
			className={styles.panel()}
		>
			<div className={styles.clip()}>
				<p className={cn(styles.empty(), className)}>{children}</p>
			</div>
		</div>
	);
}
