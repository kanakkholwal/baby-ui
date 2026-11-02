"use client";

import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { Button } from "../../button/react/button";
import { cn } from "../../lib/cn";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../../tooltip/react/tooltip";
import {
	formatStepTime,
	PLAN_ICONS,
	PLAN_STATUS_TEXT,
	PLAN_TOOL_TEXT,
	type PlanRunnerVariant,
	type PlanSegment,
	type PlanStepStatus,
	type PlanToolKind,
	planRunner,
	planTool,
} from "../variants";

export type { PlanRunnerVariant, PlanSegment, PlanStepStatus, PlanToolKind };

type Ctx = {
	styles: ReturnType<typeof planRunner>;
	/** The step pointed at in the progress bar. */
	active: string | null;
	setActive: (id: string | null) => void;
};
const PlanRunnerContext = createContext<Ctx | null>(null);
const StepContext = createContext<PlanStepStatus>("pending");

function usePlanRunner(part: string): Ctx {
	const ctx = useContext(PlanRunnerContext);
	if (!ctx) throw new Error(`${part} must be used inside <PlanRunner>`);
	return ctx;
}

function Glyph({ d, className }: { d: string; className?: string }) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden className={className}>
			<path d={d} />
		</svg>
	);
}

export interface PlanRunnerProps extends ComponentProps<"section"> {
	variant?: PlanRunnerVariant;
}

/** The root: an agent's plan, run step by step, with progress, output and a way to steer it. */
export function PlanRunner({ variant = "framed", className, ...props }: PlanRunnerProps) {
	const [active, setActive] = useState<string | null>(null);
	const styles = planRunner({ variant });
	return (
		<PlanRunnerContext.Provider value={{ styles, active, setActive }}>
			<section
				data-slot="plan-runner"
				data-variant={variant}
				data-active={active ?? undefined}
				className={cn(styles.root(), className)}
				{...props}
			/>
		</PlanRunnerContext.Provider>
	);
}

/** The top row: lays out PlanRunnerTitle and PlanRunnerMeta. */
export function PlanRunnerHeader({ className, ...props }: ComponentProps<"div">) {
	const { styles } = usePlanRunner("PlanRunnerHeader");
	return (
		<div
			data-slot="plan-runner-header"
			className={cn(styles.header(), className)}
			{...props}
		/>
	);
}

export function PlanRunnerTitle({ className, ...props }: ComponentProps<"h3">) {
	const { styles } = usePlanRunner("PlanRunnerTitle");
	return (
		<h3
			data-slot="plan-runner-title"
			className={cn(styles.title(), className)}
			{...props}
		/>
	);
}

/** A short line beside the title, e.g. "Step 3 of 5 · 1:24". */
export function PlanRunnerMeta({ className, ...props }: ComponentProps<"span">) {
	const { styles } = usePlanRunner("PlanRunnerMeta");
	return (
		<span
			data-slot="plan-runner-meta"
			className={cn(styles.meta(), className)}
			{...props}
		/>
	);
}

/** The inner surface: progress, steps and the steer input sit inside it. */
export function PlanRunnerBody({ className, ...props }: ComponentProps<"div">) {
	const { styles } = usePlanRunner("PlanRunnerBody");
	return (
		<div
			data-slot="plan-runner-body"
			className={cn(styles.body(), className)}
			{...props}
		/>
	);
}

/** One segment per step; point at one to read its step and status. */
export function PlanRunnerProgress({
	segments,
	className,
}: {
	segments: PlanSegment[];
	className?: string;
}) {
	const { styles: s, active, setActive } = usePlanRunner("PlanRunnerProgress");
	const done = segments.filter((seg) => seg.status === "done").length;
	return (
		<div data-slot="plan-runner-progress" className={cn(s.progress(), className)}>
			<progress className="sr-only" max={segments.length} value={done}>
				{done} of {segments.length} steps done
			</progress>
			<TooltipProvider delay={0}>
				{segments.map((seg, i) => (
					<Tooltip
						key={seg.id}
						delay={0}
						onOpenChange={(open) => setActive(open ? seg.id : null)}
					>
						<TooltipTrigger
							render={
								<button
									type="button"
									aria-label={`Step ${i + 1}, ${seg.label}: ${PLAN_STATUS_TEXT[seg.status]}`}
									data-status={seg.status}
									data-active={active === seg.id || undefined}
									className={s.segment()}
								/>
							}
						/>
						<TooltipContent>
							<span className={s.tipTitle()}>{seg.label}</span>
							<span className={s.tipMeta()}>
								Step {i + 1} · {PLAN_STATUS_TEXT[seg.status]}
							</span>
						</TooltipContent>
					</Tooltip>
				))}
			</TooltipProvider>
		</div>
	);
}

export function PlanRunnerSteps({ className, ...props }: ComponentProps<"ol">) {
	const { styles } = usePlanRunner("PlanRunnerSteps");
	return (
		<ol
			data-slot="plan-runner-steps"
			className={cn(styles.steps(), className)}
			{...props}
		/>
	);
}

/** One step on the timeline: a marker for `status`, then its head and output. */
export function PlanRunnerStep({
	status,
	className,
	children,
}: {
	status: PlanStepStatus;
	className?: string;
	children?: ReactNode;
}) {
	const { styles: s } = usePlanRunner("PlanRunnerStep");
	return (
		<StepContext.Provider value={status}>
			<li
				data-slot="plan-runner-step"
				data-status={status}
				className={cn(s.step(), className)}
			>
				<span aria-hidden data-status={status} className={s.connector()} />
				<span aria-hidden data-status={status} className={s.marker()}>
					{status === "running" ? (
						<Glyph d={PLAN_ICONS.running} className={s.spinner()} />
					) : status === "done" || status === "failed" ? (
						<Glyph d={PLAN_ICONS[status]} />
					) : null}
				</span>
				<div className={s.content()}>
					<span className="sr-only">{PLAN_STATUS_TEXT[status]}: </span>
					{children}
				</div>
			</li>
		</StepContext.Provider>
	);
}

/** The step's row: put PlanRunnerTool, PlanRunnerStepTitle and PlanRunnerTimer in it. */
export function PlanRunnerStepHead({ className, ...props }: ComponentProps<"div">) {
	const { styles } = usePlanRunner("PlanRunnerStepHead");
	return <div className={cn(styles.stepHead(), className)} {...props} />;
}

export function PlanRunnerStepTitle({ className, ...props }: ComponentProps<"p">) {
	const { styles } = usePlanRunner("PlanRunnerStepTitle");
	return <p className={cn(styles.stepTitle(), className)} {...props} />;
}

/** The tool the step uses, e.g. Search or Test. */
export function PlanRunnerTool({
	kind,
	children,
	className,
}: {
	kind: PlanToolKind;
	children?: ReactNode;
	className?: string;
}) {
	return (
		<span className={planTool({ kind, class: className })}>
			<Glyph d={PLAN_ICONS[kind]} />
			{children ?? PLAN_TOOL_TEXT[kind]}
		</span>
	);
}

/** Time spent on the step; pass the seconds from your own clock. */
export function PlanRunnerTimer({
	seconds,
	className,
}: {
	seconds: number;
	className?: string;
}) {
	const { styles } = usePlanRunner("PlanRunnerTimer");
	return (
		<span className={cn(styles.timer(), className)}>
			<span className="sr-only">took </span>
			{formatStepTime(seconds)}
		</span>
	);
}

/** Streaming output; follows its end while the step runs and folds when `open` is false. */
export function PlanRunnerOutput({
	open = true,
	className,
	children,
}: {
	open?: boolean;
	className?: string;
	children?: ReactNode;
}) {
	const { styles } = usePlanRunner("PlanRunnerOutput");
	const status = useContext(StepContext);
	const ref = useRef<HTMLPreElement>(null);
	useEffect(() => {
		const node = ref.current;
		if (!node) return;
		const follow = new MutationObserver(() => {
			if (status === "running") node.scrollTop = node.scrollHeight;
		});
		follow.observe(node, { childList: true, characterData: true, subtree: true });
		return () => follow.disconnect();
	}, [status]);
	return (
		<div data-open={open || undefined} inert={!open} className={styles.fold()}>
			<div className={styles.clip()}>
				<pre ref={ref} className={cn(styles.output(), className)}>
					{children}
				</pre>
			</div>
		</div>
	);
}

/** Holds the input that steers the next step, usually a Composer. */
export function PlanRunnerSteer({ className, ...props }: ComponentProps<"div">) {
	const { styles } = usePlanRunner("PlanRunnerSteer");
	return (
		<div
			data-slot="plan-runner-steer"
			className={cn(styles.steer(), className)}
			{...props}
		/>
	);
}

/** The closing row: PlanRunnerSummary, then PlanRunnerStop. */
export function PlanRunnerFooter({ className, ...props }: ComponentProps<"div">) {
	const { styles } = usePlanRunner("PlanRunnerFooter");
	return (
		<div
			data-slot="plan-runner-footer"
			className={cn(styles.footer(), className)}
			{...props}
		/>
	);
}

/** e.g. "3 of 5 steps · 14 tool calls"; announced politely as it changes. */
export function PlanRunnerSummary({ className, ...props }: ComponentProps<"p">) {
	const { styles } = usePlanRunner("PlanRunnerSummary");
	return <p aria-live="polite" className={cn(styles.summary(), className)} {...props} />;
}

/** Stops the run; `loading` while the agent winds down. */
export function PlanRunnerStop({
	onClick,
	loading = false,
	disabled = false,
	children = "Stop",
	className,
}: {
	onClick: () => void;
	loading?: boolean;
	disabled?: boolean;
	children?: ReactNode;
	className?: string;
}) {
	return (
		<Button
			data-slot="plan-runner-stop"
			variant="outline"
			size="sm"
			loading={loading}
			disabled={disabled}
			onClick={onClick}
			className={cn("rounded-full", className)}
		>
			<svg viewBox="0 0 24 24" aria-hidden className="size-3 fill-current">
				<path d={PLAN_ICONS.stop} />
			</svg>
			{children}
		</Button>
	);
}
