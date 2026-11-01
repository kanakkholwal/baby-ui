"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { type ComponentProps, createContext, type ReactNode, useContext } from "react";
import { Badge } from "../../badge/react/badge";
import { Button } from "../../button/react/button";
import { cn } from "../../lib/cn";
import { Progress } from "../../progress/react/progress";
import {
	clampProgress,
	TASK_STEP_ICONS,
	TASK_STEP_LABELS,
	type TaskStatus,
	type TaskStepsSize,
	type TaskStepsVariant,
	taskSteps,
} from "../variants";

export type { TaskStatus, TaskStepsSize, TaskStepsVariant };

type Ctx = {
	variant: TaskStepsVariant;
	size: TaskStepsSize;
	compact: boolean;
	showConnector: boolean;
	labels: Record<TaskStatus, string>;
	styles: ReturnType<typeof taskSteps>;
};
const TaskStepsContext = createContext<Ctx | null>(null);
// Each step tells its details whether they sit in a fold or inline.
const StepContext = createContext<{ status: TaskStatus } | null>(null);

function useTaskSteps(part: string): Ctx {
	const ctx = useContext(TaskStepsContext);
	if (!ctx) throw new Error(`${part} must be used inside <TaskSteps>`);
	return ctx;
}

export interface TaskStepsProps extends Omit<ComponentProps<"ol">, "children"> {
	/** Timeline ticks down a connector; capsules and list are rows that expand onto their details. */
	variant?: TaskStepsVariant;
	size?: TaskStepsSize;
	compact?: boolean;
	/** Timeline: the line between markers. */
	showConnector?: boolean;
	/** Replaces the screen-reader status words, e.g. for another language. */
	labels?: Partial<Record<TaskStatus, string>>;
	/** TaskStep items. Put TaskStepsHeader before the root, inside your own wrapper. */
	children: ReactNode;
}

/** The root: an agent's plan as an ordered list whose steps carry their own status. */
export function TaskSteps({
	variant = "timeline",
	size = "default",
	compact = false,
	showConnector = true,
	labels,
	className,
	children,
	...props
}: TaskStepsProps) {
	const styles = taskSteps({ variant, size, compact });
	return (
		<TaskStepsContext.Provider
			value={{
				variant,
				size,
				compact,
				showConnector,
				labels: { ...TASK_STEP_LABELS, ...labels },
				styles,
			}}
		>
			<ol
				aria-live="polite"
				data-slot="task-steps"
				data-variant={variant}
				className={cn(styles.root(), className)}
				{...props}
			>
				{children}
			</ol>
		</TaskStepsContext.Provider>
	);
}

export interface TaskStepsHeaderProps extends Omit<ComponentProps<"div">, "title"> {
	title: ReactNode;
	/** Steps finished, shown as "2 of 4" with a bar. */
	done: number;
	total: number;
}

/** A title over the plan with how far it has got. Works outside TaskSteps too. */
export function TaskStepsHeader({
	title,
	done,
	total,
	className,
	...props
}: TaskStepsHeaderProps) {
	const s = taskSteps();
	const ratio = total > 0 ? clampProgress(done / total) : 0;
	return (
		<div data-slot="task-steps-header" className={cn(s.header(), className)} {...props}>
			<div className={s.headerRow()}>
				<p className={s.title()}>{title}</p>
				<span className={s.count()}>
					{done} of {total}
				</span>
			</div>
			<Progress size="sm" value={ratio * 100} label="Steps done" />
		</div>
	);
}

function Glyph({ d, className }: { d: string; className?: string }) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden className={className}>
			<path d={d} />
		</svg>
	);
}

function Marker({ status, styles }: { status: TaskStatus; styles: Ctx["styles"] }) {
	return (
		<span aria-hidden data-status={status} className={styles.marker()}>
			{status === "done" ? (
				<svg
					viewBox="0 0 12 12"
					fill="none"
					aria-hidden
					data-on="true"
					className={cn(styles.icon(), "checkbox-check")}
				>
					<path
						d="M2.5 6.2 4.8 8.5 9.5 3.6"
						stroke="currentColor"
						strokeWidth="1.8"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			) : status === "failed" ? (
				<svg viewBox="0 0 12 12" fill="none" aria-hidden className={styles.icon()}>
					<path
						d="M3.5 3.5 8.5 8.5M8.5 3.5 3.5 8.5"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
				</svg>
			) : status === "active" ? (
				<svg
					viewBox="0 0 12 12"
					fill="none"
					aria-hidden
					className={cn(styles.icon(), "step-spinner")}
				>
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
			) : (
				<span className={styles.dot()} />
			)}
		</span>
	);
}

function Ring({ active, step }: { active: boolean; step?: number }) {
	const c = 2 * Math.PI * 11;
	return (
		<span className="relative inline-flex size-6 shrink-0 items-center justify-center">
			<svg
				viewBox="0 0 24 24"
				aria-hidden
				className={cn("absolute inset-0", active && "step-spinner")}
			>
				<circle
					cx={12}
					cy={12}
					r={11}
					fill="none"
					stroke="var(--border)"
					strokeWidth={2}
				/>
				{active && (
					<circle
						cx={12}
						cy={12}
						r={11}
						fill="none"
						stroke="var(--muted-foreground)"
						strokeWidth={2}
						strokeLinecap="round"
						strokeDasharray={`${c * 0.28} ${c * 0.72}`}
					/>
				)}
			</svg>
			<span className="relative font-semibold text-foreground text-xs tabular-nums">
				{step}
			</span>
		</span>
	);
}

export interface TaskStepProps {
	/** What the step is, e.g. "Run the tests". */
	label: ReactNode;
	status?: TaskStatus;
	/** A right-aligned figure, such as an amount or a count. */
	meta?: string;
	/** Rows: the number in the pending or active ring. */
	step?: number;
	/** Active steps: how far along, from 0 to 1, shown as a thin bar. */
	progress?: number;
	/** Shows a retry button on a failed step. */
	onRetry?: () => void;
	/** Rows: whether the details are open, controlled with onOpenChange. */
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	className?: string;
	/** TaskStepDetails: inline under a timeline step, or the fold a row opens onto. */
	children?: ReactNode;
}

export function TaskStep({
	label,
	status = "pending",
	meta,
	step,
	progress,
	onRetry,
	open,
	defaultOpen,
	onOpenChange,
	className,
	children,
}: TaskStepProps) {
	const { variant, showConnector, labels, styles: s } = useTaskSteps("TaskStep");
	const bar =
		status === "active" && progress !== undefined ? (
			<Progress
				size="sm"
				value={clampProgress(progress) * 100}
				label={typeof label === "string" ? label : "Step progress"}
				className={s.progress()}
			/>
		) : null;
	const retry =
		status === "failed" && onRetry ? (
			<Button
				variant="ghost"
				size="icon-xs"
				aria-label={`Retry ${typeof label === "string" ? label : "step"}`}
				onClick={onRetry}
				className={s.retry()}
			>
				<Glyph
					d={TASK_STEP_ICONS.retry}
					className={cn(s.glyph(), "size-3 [stroke-width:3]")}
				/>
			</Button>
		) : null;

	if (variant === "timeline") {
		return (
			<li data-slot="task-step" data-status={status} className={cn(s.item(), className)}>
				{showConnector && (
					<span aria-hidden data-status={status} className={s.connector()} />
				)}
				<div className={s.row()}>
					<Marker status={status} styles={s} />
					<div className={s.text()}>
						<div className={s.labelRow()}>
							<span data-status={status} className={s.label()}>
								{label}
							</span>
							<span className="sr-only">{labels[status]}</span>
							{meta && <span className={s.meta()}>{meta}</span>}
							{retry}
						</div>
						{bar}
						<StepContext.Provider value={{ status }}>{children}</StepContext.Provider>
					</div>
				</div>
			</li>
		);
	}

	const badge =
		status === "done" || status === "failed" ? (
			<span data-status={status} className={s.statusDot()}>
				<Glyph
					d={status === "done" ? TASK_STEP_ICONS.check : TASK_STEP_ICONS.cross}
					className={s.glyph()}
				/>
			</span>
		) : (
			<Ring active={status === "active"} step={step} />
		);
	const heading = (
		<>
			<span className={s.badge()}>{badge}</span>
			<span data-status={status} className={s.label()}>
				{label}
			</span>
			<span className="sr-only">{labels[status]}</span>
			{meta && <span className={s.meta()}>{meta}</span>}
			{status === "done" && (
				<Badge variant="success" size="sm">
					{labels.done}
				</Badge>
			)}
			{status === "failed" && (
				<Badge variant="destructive" size="sm">
					{labels.failed}
				</Badge>
			)}
		</>
	);

	if (!children) {
		return (
			<li data-slot="task-step" data-status={status} className={cn(s.item(), className)}>
				<div className={s.row()}>
					<div className={cn(s.trigger(), "cursor-default")}>{heading}</div>
					{retry}
				</div>
				{bar}
			</li>
		);
	}

	return (
		<li data-slot="task-step" data-status={status} className={cn(s.item(), className)}>
			<CollapsiblePrimitive.Root
				open={open}
				defaultOpen={defaultOpen}
				onOpenChange={onOpenChange}
			>
				<div className={s.row()}>
					<CollapsiblePrimitive.Trigger
						data-slot="task-step-trigger"
						className={cn(s.trigger(), "group/trigger")}
					>
						{heading}
						<Glyph d={TASK_STEP_ICONS.chevron} className={s.chevron()} />
					</CollapsiblePrimitive.Trigger>
					{retry}
				</div>
				{bar}
				{/* keepMounted still sets `hidden`; force it off so the rows transition has a frame. */}
				<CollapsiblePrimitive.Panel keepMounted hidden={false} className={s.panel()}>
					<div className={s.clip()}>
						<div className={s.panelBody()}>
							<span aria-hidden className={s.rail()} />
							<StepContext.Provider value={{ status }}>{children}</StepContext.Provider>
						</div>
					</div>
				</CollapsiblePrimitive.Panel>
			</CollapsiblePrimitive.Root>
		</li>
	);
}

/** The step's sub-items: TaskStepDetail rows. */
export function TaskStepDetails({ className, ...props }: ComponentProps<"ul">) {
	const { styles } = useTaskSteps("TaskStepDetails");
	if (!useContext(StepContext))
		throw new Error("TaskStepDetails must be used inside <TaskStep>");
	return (
		<ul
			data-slot="task-step-details"
			className={cn(styles.details(), className)}
			{...props}
		/>
	);
}

export function TaskStepDetail({
	meta,
	className,
	children,
}: {
	/** A right-aligned figure, e.g. "12/12". */
	meta?: string;
	className?: string;
	children: ReactNode;
}) {
	const { styles } = useTaskSteps("TaskStepDetail");
	return (
		<li data-slot="task-step-detail" className={cn(styles.detail(), className)}>
			<span className="min-w-0 truncate">{children}</span>
			{meta && <span className={styles.detailMeta()}>{meta}</span>}
		</li>
	);
}
