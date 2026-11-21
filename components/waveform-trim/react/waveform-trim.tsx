"use client";

import {
	type ComponentProps,
	createContext,
	type KeyboardEvent,
	type ReactNode,
	type PointerEvent as ReactPointerEvent,
	useContext,
	useRef,
} from "react";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/react/use-controllable";
import {
	clampRange,
	formatTime,
	isKept,
	MIN_GAP,
	moveHandle,
	place,
	ratioFromPointer,
	type TrimRange,
} from "../trim";
import { type WaveformTrimVariant, waveformTrim } from "../variants";

export type { TrimRange, WaveformTrimVariant };

type Ctx = {
	peaks: number[];
	range: TrimRange;
	setRange: (range: TrimRange) => void;
	position: number | undefined;
	onSeek: ((position: number) => void) | undefined;
	duration: number | undefined;
	variant: WaveformTrimVariant;
};

const WaveformTrimCtx = createContext<Ctx | null>(null);

function useWaveformTrim() {
	const ctx = useContext(WaveformTrimCtx);
	if (!ctx) throw new Error("WaveformTrim parts must be used inside <WaveformTrim>");
	return ctx;
}

/** Audio with two trim handles. Peaks are 0 to 1 loudness samples your app computed. */
export function WaveformTrim({
	peaks,
	range: rangeProp,
	defaultRange = [0, 1],
	onRangeChange,
	position,
	onSeek,
	duration,
	variant = "bars",
	className,
	children,
	...props
}: Omit<ComponentProps<"div">, "children" | "defaultValue"> & {
	peaks: number[];
	/** Kept part of the audio as `[start, end]`, each 0 to 1. Controlled, or `defaultRange`. */
	range?: TrimRange;
	defaultRange?: TrimRange;
	onRangeChange?: (range: TrimRange) => void;
	/** Playhead, 0 to 1. The app owns playback. */
	position?: number;
	/** Called with 0 to 1 when the track is clicked; without it the track is not a seek target. */
	onSeek?: (position: number) => void;
	/** Length in seconds; adds real times to `WaveformTrimTimes`. */
	duration?: number;
	variant?: WaveformTrimVariant;
	children?: ReactNode;
}) {
	const [range, setRange] = useControllable(rangeProp, defaultRange, onRangeChange);
	return (
		<WaveformTrimCtx.Provider
			value={{ peaks, range, setRange, position, onSeek, duration, variant }}
		>
			<div
				data-slot="waveform-trim"
				className={cn(waveformTrim({ variant }).root(), className)}
				{...props}
			>
				{children}
			</div>
		</WaveformTrimCtx.Provider>
	);
}

function Handle({
	which,
	track,
}: {
	which: "start" | "end";
	track: React.RefObject<HTMLDivElement | null>;
}) {
	const { range, setRange } = useWaveformTrim();
	const styles = waveformTrim();
	const value = which === "start" ? range[0] : range[1];

	function move(event: ReactPointerEvent<HTMLButtonElement>) {
		const rect = track.current?.getBoundingClientRect();
		if (!rect || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
		setRange(
			moveHandle(range, which, ratioFromPointer(event.clientX, rect.left, rect.width)),
		);
	}

	function key(event: KeyboardEvent<HTMLButtonElement>) {
		const step = event.shiftKey ? 0.1 : 0.01;
		const dir =
			event.key === "ArrowLeft" || event.key === "ArrowDown"
				? -1
				: event.key === "ArrowRight" || event.key === "ArrowUp"
					? 1
					: 0;
		if (!dir) return;
		event.preventDefault();
		setRange(moveHandle(range, which, value + dir * step));
	}

	return (
		<button
			type="button"
			role="slider"
			data-slot={`waveform-trim-${which}`}
			aria-label={which === "start" ? "Trim start" : "Trim end"}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={Math.round(value * 100)}
			className={styles.handle()}
			style={{ left: place(value) }}
			onPointerDown={(event) => {
				event.stopPropagation();
				event.currentTarget.setPointerCapture(event.pointerId);
			}}
			onPointerMove={move}
			onKeyDown={key}
		>
			<span aria-hidden className={styles.grip()} />
		</button>
	);
}

/** The waveform, the cut-away shading, the playhead and both handles. */
export function WaveformTrimTrack({ className, ...props }: ComponentProps<"div">) {
	const { peaks, range, position, onSeek, variant } = useWaveformTrim();
	const styles = waveformTrim({ variant });
	const ref = useRef<HTMLDivElement>(null);
	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: pointer seeking; the handles are the keyboard path.
		<div
			ref={ref}
			data-slot="waveform-trim-track"
			className={cn(styles.track(), onSeek && "cursor-pointer", className)}
			onPointerDown={(event) => {
				const rect = ref.current?.getBoundingClientRect();
				if (rect && onSeek)
					onSeek(ratioFromPointer(event.clientX, rect.left, rect.width));
			}}
			{...props}
		>
			<div className={styles.bars()}>
				{peaks.map((peak, i) => (
					<i
						// biome-ignore lint/suspicious/noArrayIndexKey: samples are positional and never reorder.
						key={i}
						className={waveformTrim({
							variant,
							kept: isKept(i, peaks.length, range),
						}).bar()}
						style={{ height: `${Math.max(0.06, Math.min(1, peak)) * 100}%` }}
					/>
				))}
			</div>
			<span className={styles.cut()} style={{ left: 0, width: place(range[0]) }} />
			<span
				className={styles.cut()}
				style={{ right: 0, width: `calc(100% - ${place(range[1])})` }}
			/>
			{position === undefined ? null : (
				<span
					data-slot="waveform-trim-playhead"
					className={styles.playhead()}
					style={{ left: place(Math.min(1, Math.max(0, position))) }}
				/>
			)}
			<Handle which="start" track={ref} />
			<Handle which="end" track={ref} />
		</div>
	);
}

/** Start, kept length and end, in seconds when `duration` is given and as percent otherwise. */
export function WaveformTrimTimes({ className, ...props }: ComponentProps<"p">) {
	const { range, duration, variant } = useWaveformTrim();
	const styles = waveformTrim({ variant });
	const at = (r: number) =>
		duration ? formatTime(r * duration) : `${Math.round(r * 100)}%`;
	const [start, end] = clampRange(range, MIN_GAP);
	return (
		<p
			data-slot="waveform-trim-times"
			className={cn(styles.times(), className)}
			{...props}
		>
			<span>{at(start)}</span>
			<span>
				{duration
					? `${formatTime((end - start) * duration)} kept`
					: `${Math.round((end - start) * 100)}% kept`}
			</span>
			<span>{at(end)}</span>
		</p>
	);
}
