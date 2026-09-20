import { cn } from "../lib/cn";

export type TaskStatus = "pending" | "active" | "done" | "failed";
export type TaskStep = { id: string; label: string; status: TaskStatus };

export interface TaskStepsProps {
	steps: TaskStep[];
	showConnector?: boolean;
	compact?: boolean;
	className?: string;
}

const LABEL: Record<TaskStatus, string> = {
	pending: "Pending",
	active: "In progress",
	done: "Done",
	failed: "Failed",
};

export function TaskSteps({
	steps,
	showConnector = true,
	compact = false,
	className,
}: TaskStepsProps) {
	return (
		<ol aria-live="polite" className={cn("flex flex-col", className)}>
			{steps.map((step, i) => (
				<li
					key={step.id}
					className={cn("relative flex gap-3", compact ? "py-1" : "py-1.5")}
				>
					{showConnector && i < steps.length - 1 ? (
						<span
							aria-hidden
							className={cn(
								"absolute top-6 bottom-0 left-[0.6875rem] w-px",
								step.status === "done" ? "bg-[var(--success)]" : "bg-border",
							)}
						/>
					) : null}

					<span
						aria-hidden
						className={cn(
							"relative z-10 grid size-5.5 shrink-0 place-items-center rounded-full border bg-background",
							step.status === "done" && "border-[var(--success)] text-[var(--success)]",
							step.status === "failed" &&
								"border-[var(--destructive)] text-[var(--destructive)]",
							step.status === "active" && "border-primary text-primary",
							step.status === "pending" && "border-border text-muted-foreground",
						)}
					>
						{step.status === "done" ? (
							<svg
								viewBox="0 0 12 12"
								fill="none"
								aria-hidden
								className="checkbox-check size-3"
								data-on="true"
							>
								<path
									d="M2.5 6.2 4.8 8.5 9.5 3.6"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						) : step.status === "failed" ? (
							<svg viewBox="0 0 12 12" fill="none" aria-hidden className="size-3">
								<path
									d="M3.5 3.5 8.5 8.5M8.5 3.5 3.5 8.5"
									stroke="currentColor"
									strokeWidth="1.6"
									strokeLinecap="round"
								/>
							</svg>
						) : step.status === "active" ? (
							<svg
								viewBox="0 0 12 12"
								fill="none"
								aria-hidden
								className="step-spinner size-3"
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
							<span className="size-1.5 rounded-full bg-current" />
						)}
					</span>

					<span className="min-w-0 flex-1 text-sm">
						<span
							className={cn(
								step.status === "pending" ? "text-muted-foreground" : "text-foreground",
								step.status === "done" && "line-through decoration-muted-foreground/40",
							)}
						>
							{step.label}
						</span>
						<span className="sr-only">{LABEL[step.status]}</span>
					</span>
				</li>
			))}
		</ol>
	);
}
