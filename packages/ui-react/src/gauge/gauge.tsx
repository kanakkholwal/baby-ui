import { cn } from "../lib/cn";

const TONE = {
	default: "text-primary",
	success: "text-[var(--success)]",
	warning: "text-[var(--warning)]",
	danger: "text-[var(--destructive)]",
};

export interface GaugeProps {
	value?: number;
	size?: number;
	thickness?: number;
	label?: string;
	tone?: keyof typeof TONE;
	className?: string;
}

export function Gauge({
	value = 0,
	size = 96,
	thickness = 8,
	label,
	tone = "default",
	className,
}: GaugeProps) {
	const clamped = Math.min(100, Math.max(0, value));
	const radius = (size - thickness) / 2;
	const circumference = 2 * Math.PI * radius;
	// Three quarters of a circle, so the gap reads as a dial rather than a broken ring.
	const arc = circumference * 0.75;
	const offset = arc - (arc * clamped) / 100;

	return (
		// biome-ignore lint/a11y/useSemanticElements: meter has no HTML element
		<div
			role="meter"
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={clamped}
			aria-label={label}
			style={{ width: size, height: size }}
			className={cn("relative inline-grid place-items-center", className)}
		>
			<svg
				viewBox={`0 0 ${size} ${size}`}
				aria-hidden
				className="-rotate-[225deg] absolute inset-0"
			>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke="var(--input)"
					strokeWidth={thickness}
					strokeLinecap="round"
					strokeDasharray={`${arc} ${circumference}`}
				/>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke="currentColor"
					strokeWidth={thickness}
					strokeLinecap="round"
					strokeDasharray={`${arc} ${circumference}`}
					strokeDashoffset={offset}
					className={cn(
						"transition-[stroke-dashoffset] duration-[var(--duration-overlay)] ease-[var(--ease-out)] motion-reduce:transition-none",
						TONE[tone],
					)}
				/>
			</svg>
			<span className="font-medium text-foreground text-lg tabular-nums">
				{Math.round(clamped)}
			</span>
		</div>
	);
}
