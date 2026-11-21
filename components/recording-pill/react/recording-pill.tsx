"use client";

import { type ComponentProps, createContext, useContext } from "react";
import { cn } from "../../lib/cn";
import { formatTimer, meterLevel, RECORDING_PILL_ICONS } from "../timer";
import {
	BAR_WEIGHTS,
	type RecordingPillShape,
	type RecordingPillState,
	type RecordingPillVariant,
	recordingPill,
} from "../variants";

export type { RecordingPillShape, RecordingPillState, RecordingPillVariant };

type Ctx = { state: RecordingPillState; variant: RecordingPillVariant; level: number };

const RecordingPillCtx = createContext<Ctx | null>(null);

function useRecordingPill() {
	const ctx = useContext(RecordingPillCtx);
	if (!ctx) throw new Error("RecordingPill parts must be used inside <RecordingPill>");
	return ctx;
}

/** A pure render of the session: the app owns capture, levels and the clock. */
export function RecordingPill({
	state = "listening",
	variant = "inverted",
	level = 0,
	className,
	...props
}: ComponentProps<"div"> & {
	state?: RecordingPillState;
	variant?: RecordingPillVariant;
	/** Loudness from 0 to 1; drives the meter while listening. */
	level?: number;
}) {
	return (
		<RecordingPillCtx.Provider value={{ state, variant, level }}>
			<div
				data-slot="recording-pill"
				data-state={state}
				role="status"
				aria-live="polite"
				className={cn(recordingPill({ variant, state }).root(), className)}
				{...props}
			/>
		</RecordingPillCtx.Provider>
	);
}

export function RecordingPillIcon({
	className,
	children,
	...props
}: ComponentProps<"span">) {
	const pill = useRecordingPill();
	return (
		<span
			data-slot="recording-pill-icon"
			aria-hidden
			className={cn(recordingPill({ state: pill.state }).icon(), className)}
			{...props}
		>
			{children ?? (
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.6"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden
				>
					<path d={RECORDING_PILL_ICONS[pill.state === "notice" ? "notice" : "mic"]} />
				</svg>
			)}
		</span>
	);
}

export function RecordingPillLabel({ className, ...props }: ComponentProps<"span">) {
	return (
		<span
			data-slot="recording-pill-label"
			className={cn(recordingPill().label(), className)}
			{...props}
		/>
	);
}

/** Level while listening, a soft pulse while working, hidden for a notice. `bars` draws a small waveform. */
export function RecordingPillMeter({
	shape = "line",
	className,
	...props
}: ComponentProps<"div"> & { shape?: RecordingPillShape }) {
	const pill = useRecordingPill();
	const styles = recordingPill({ state: pill.state, shape });
	const level = meterLevel(pill.level);
	return (
		<div
			data-slot="recording-pill-meter"
			data-shape={shape}
			aria-hidden
			className={cn(styles.meter(), className)}
			{...props}
		>
			{shape === "bars" ? (
				BAR_WEIGHTS.map((weight, i) => (
					<i
						// biome-ignore lint/suspicious/noArrayIndexKey: five fixed bars, order never changes.
						key={i}
						className={cn(
							styles.bar(),
							pill.state === "working" && "motion-safe:animate-pulse",
						)}
						style={{
							transform: `scaleY(${pill.state === "listening" ? Math.max(0.15, level * weight) : 0.25})`,
							animationDelay: pill.state === "working" ? `${i * 120}ms` : undefined,
						}}
					/>
				))
			) : (
				<i
					className={styles.fill()}
					style={
						pill.state === "listening" ? { transform: `scaleX(${level})` } : undefined
					}
				/>
			)}
		</div>
	);
}

/** Elapsed whole seconds, shown as m:ss. */
export function RecordingPillTimer({
	seconds,
	className,
	...props
}: Omit<ComponentProps<"span">, "children"> & { seconds: number }) {
	return (
		<span
			data-slot="recording-pill-timer"
			className={cn(recordingPill().timer(), className)}
			{...props}
		>
			{formatTimer(seconds)}
		</span>
	);
}

/** Renders only when a handler is given. */
export function RecordingPillCancel({
	onClick,
	label = "Cancel",
	className,
}: {
	onClick?: () => void;
	label?: string;
	className?: string;
}) {
	if (!onClick) return null;
	return (
		<button
			type="button"
			data-slot="recording-pill-cancel"
			aria-label={label}
			className={cn(recordingPill().cancel(), className)}
			onClick={onClick}
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				aria-hidden
			>
				<path d={RECORDING_PILL_ICONS.cancel} />
			</svg>
		</button>
	);
}
