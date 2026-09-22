import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cn } from "../lib/cn";
import { type ProgressSize, progressTrack } from "./variants";

export type { ProgressSize };

export interface ProgressProps {
	value?: number;
	indeterminate?: boolean;
	size?: ProgressSize;
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
		<ProgressPrimitive.Root
			value={indeterminate ? null : clamped}
			aria-label={label}
			data-slot="progress"
		>
			<ProgressPrimitive.Track className={cn(progressTrack({ size }), className)}>
				{indeterminate ? (
					<div className="progress-sweep h-full w-2/5 rounded-full bg-primary" />
				) : (
					<ProgressPrimitive.Indicator className="h-full rounded-full bg-primary transition-[width] duration-[var(--duration-overlay)] ease-[var(--ease-out)] motion-reduce:transition-none" />
				)}
			</ProgressPrimitive.Track>
		</ProgressPrimitive.Root>
	);
}
