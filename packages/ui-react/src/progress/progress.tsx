import { cn } from "../lib/cn.js";

const HEIGHT = { sm: "h-1", md: "h-2" };

export interface ProgressProps {
	value?: number;
	indeterminate?: boolean;
	size?: "sm" | "md";
	label?: string;
	className?: string;
}

export function Progress({
	value = 0,
	indeterminate = false,
	size = "md",
	label,
	className,
}: ProgressProps) {
	const clamped = Math.min(100, Math.max(0, value));

	return (
		<div
			role="progressbar"
			aria-label={label}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={indeterminate ? undefined : clamped}
			className={cn("w-full overflow-hidden rounded-full bg-input", HEIGHT[size], className)}
		>
			{indeterminate ? (
				<div className="progress-sweep h-full w-2/5 rounded-full bg-primary" />
			) : (
				<div
					style={{ width: `${clamped}%` }}
					className="h-full rounded-full bg-primary transition-[width] duration-[var(--duration-overlay)] ease-[var(--ease-out)] motion-reduce:transition-none"
				/>
			)}
		</div>
	);
}
