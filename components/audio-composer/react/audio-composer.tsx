"use client";

import {
	type ComponentProps,
	createContext,
	type ReactNode,
	type PointerEvent as ReactPointerEvent,
	useContext,
} from "react";
import { Button } from "../../button/react/button";
import { Composer } from "../../composer/react/composer";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/react/use-controllable";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../select/react/select";
import {
	AUDIO_COMPOSER_ICONS,
	dialArc,
	dialPoint,
	dialRatio,
	durationToRatio,
	formatLength,
	ratioToDuration,
	stepDuration,
} from "../duration";
import {
	type AudioComposerVariant,
	type AudioDurationShape,
	audioComposer,
} from "../variants";

export type { AudioComposerVariant, AudioDurationShape };

type Ctx = {
	duration: number;
	setDuration: (seconds: number) => void;
	preset: string;
	setPreset: (preset: string) => void;
	presets: string[];
	min: number;
	max: number;
	step: number;
	loading: boolean;
};

const AudioComposerCtx = createContext<Ctx | null>(null);

/** The chosen length and style, for apps that build the request themselves. */
export function useAudioComposer() {
	const ctx = useContext(AudioComposerCtx);
	if (!ctx) throw new Error("AudioComposer parts must be used inside <AudioComposer>");
	return ctx;
}

/** A prompt box for generating audio. Put `ComposerInput`, `ComposerToolbar` and `ComposerSubmit` inside it. */
export function AudioComposer({
	presets,
	preset: presetProp,
	defaultPreset,
	onPresetChange,
	duration: durationProp,
	defaultDuration = 10,
	onDurationChange,
	min = 2,
	max = 60,
	step = 2,
	variant = "docked",
	onSubmit,
	loading = false,
	className,
	children,
	...props
}: Omit<ComponentProps<typeof Composer>, "onSubmit" | "variant"> & {
	/** The style choices, e.g. "Cinematic" or "Lo-fi". */
	presets: string[];
	preset?: string;
	defaultPreset?: string;
	onPresetChange?: (preset: string) => void;
	/** Length in seconds. Controlled, or `defaultDuration` to let it drive itself. */
	duration?: number;
	defaultDuration?: number;
	onDurationChange?: (seconds: number) => void;
	min?: number;
	max?: number;
	step?: number;
	variant?: AudioComposerVariant;
	/** Called with the trimmed prompt, the length in seconds and the style. */
	onSubmit?: (prompt: string, options: { duration: number; preset: string }) => void;
	children?: ReactNode;
}) {
	const [duration, setDuration] = useControllable(
		durationProp,
		defaultDuration,
		onDurationChange,
	);
	const [preset, setPreset] = useControllable(
		presetProp,
		defaultPreset ?? presets[0] ?? "",
		onPresetChange,
	);
	return (
		<AudioComposerCtx.Provider
			value={{
				duration,
				setDuration,
				preset,
				setPreset,
				presets,
				min,
				max,
				step,
				loading,
			}}
		>
			<section
				data-slot="audio-composer"
				className={cn(audioComposer({ variant }).root(), className)}
			>
				<Composer
					variant="filled"
					loading={loading}
					onSubmit={(prompt) => onSubmit?.(prompt, { duration, preset })}
					{...props}
				>
					{children}
				</Composer>
			</section>
		</AudioComposerCtx.Provider>
	);
}

function Glyph({ name }: { name: keyof typeof AUDIO_COMPOSER_ICONS }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			aria-hidden
		>
			<path d={AUDIO_COMPOSER_ICONS[name]} />
		</svg>
	);
}

function DurationDial({ className }: { className?: string }) {
	const { duration, setDuration, min, max, step, loading } = useAudioComposer();
	const styles = audioComposer();
	const ratio = durationToRatio(duration, min, max);
	const [kx, ky] = dialPoint(ratio, 15, 20);

	function turn(event: ReactPointerEvent<HTMLDivElement>) {
		const box = event.currentTarget.getBoundingClientRect();
		const dx = event.clientX - (box.left + box.width / 2);
		const dy = event.clientY - (box.top + box.height / 2);
		setDuration(ratioToDuration(dialRatio(dx, dy), step, min, max));
	}

	return (
		<div
			data-slot="audio-composer-duration"
			className={cn(styles.dialGroup(), className)}
		>
			<div
				role="slider"
				data-disabled={loading ? "" : undefined}
				tabIndex={loading ? -1 : 0}
				aria-label="Length"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={duration}
				aria-valuetext={formatLength(duration)}
				className={styles.dial()}
				onPointerDown={(event) => {
					event.currentTarget.setPointerCapture(event.pointerId);
					turn(event);
				}}
				onPointerMove={(event) => {
					if (event.currentTarget.hasPointerCapture(event.pointerId)) turn(event);
				}}
				onKeyDown={(event) => {
					const dir =
						event.key === "ArrowLeft" || event.key === "ArrowDown"
							? -1
							: event.key === "ArrowRight" || event.key === "ArrowUp"
								? 1
								: 0;
					if (!dir) return;
					event.preventDefault();
					setDuration(stepDuration(duration, dir, step, min, max));
				}}
			>
				<svg
					viewBox="0 0 40 40"
					aria-hidden
					className="size-full"
					strokeWidth="3"
					strokeLinecap="round"
				>
					<path d={dialArc(1, 15, 20)} className={styles.dialTrack()} />
					<path d={dialArc(ratio, 15, 20)} className={styles.dialArc()} />
					<circle cx={kx} cy={ky} r="3.2" className={styles.dialKnob()} stroke="none" />
				</svg>
			</div>
			<span aria-live="polite" className={styles.dialValue()}>
				{formatLength(duration)}
			</span>
		</div>
	);
}

/** How long the clip will be: minus and plus buttons, or with `shape="dial"` a knob you turn. */
export function AudioComposerDuration({
	shape = "stepper",
	className,
}: {
	shape?: AudioDurationShape;
	className?: string;
}) {
	const { duration, setDuration, min, max, step, loading } = useAudioComposer();
	const styles = audioComposer();
	if (shape === "dial") return <DurationDial className={className} />;
	return (
		// biome-ignore lint/a11y/useSemanticElements: a fieldset brings default borders and layout into the toolbar.
		<div
			data-slot="audio-composer-duration"
			role="group"
			aria-label="Length"
			className={cn(styles.stepper(), className)}
		>
			<Button
				variant="ghost"
				size="icon-sm"
				aria-label="Shorter"
				disabled={loading || duration <= min}
				onClick={() => setDuration(stepDuration(duration, -1, step, min, max))}
			>
				<Glyph name="minus" />
			</Button>
			<span aria-live="polite" className={styles.value()}>
				{formatLength(duration)}
			</span>
			<Button
				variant="ghost"
				size="icon-sm"
				aria-label="Longer"
				disabled={loading || duration >= max}
				onClick={() => setDuration(stepDuration(duration, 1, step, min, max))}
			>
				<Glyph name="plus" />
			</Button>
		</div>
	);
}

/** The style choice. */
export function AudioComposerStyle({ className }: { className?: string }) {
	const { presets: choices, preset, setPreset, loading } = useAudioComposer();
	return (
		<Select
			items={choices.map((c) => ({ value: c, label: c }))}
			value={preset}
			onValueChange={setPreset}
			disabled={loading}
		>
			<SelectTrigger
				data-slot="audio-composer-style"
				aria-label="Style"
				className={cn(audioComposer().style(), className)}
			>
				<SelectValue placeholder="Style" />
			</SelectTrigger>
			<SelectContent>
				{choices.map((c) => (
					<SelectItem key={c} value={c}>
						{c}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

/** The group on the right of the toolbar: put `ComposerSubmit` last. */
export function AudioComposerTools({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="audio-composer-tools"
			className={cn(audioComposer().tools(), className)}
			{...props}
		/>
	);
}
