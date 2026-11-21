"use client";

import { type ComponentProps, createContext, type ReactNode, useContext } from "react";
import { Button } from "../../button/react/button";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/react/use-controllable";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../select/react/select";
import { Slider } from "../../slider/react/slider";
import { type VoicePickerVariant, type VoiceSampleState, voicePicker } from "../variants";
import {
	EQ_BARS,
	formatSpeed,
	nextSpeed,
	swatchBackground,
	VOICE_SPEEDS,
} from "../voice";

export type { VoicePickerVariant, VoiceSampleState };

export type Voice = {
	id: string;
	name: string /** Accent, gender or style, shown dimmer. */;
	detail?: string;
};

type Ctx = {
	voices: Voice[];
	voice: string;
	setVoice: (id: string) => void;
	speed: number;
	setSpeed: (speed: number) => void;
	sample: VoiceSampleState;
	variant: VoicePickerVariant;
};

const VoicePickerCtx = createContext<Ctx | null>(null);

export function useVoicePicker() {
	const ctx = useContext(VoicePickerCtx);
	if (!ctx) throw new Error("VoicePicker parts must be used inside <VoicePicker>");
	return ctx;
}

/** Choose a voice, hear it, set the speed. The app owns the audio and reports `sample`. */
export function VoicePicker({
	voices,
	value,
	defaultValue,
	onValueChange,
	speed: speedProp,
	defaultSpeed = 1,
	onSpeedChange,
	sample = "idle",
	variant = "stack",
	className,
	children,
	...props
}: Omit<ComponentProps<"div">, "children" | "defaultValue"> & {
	voices: Voice[];
	value?: string;
	defaultValue?: string;
	onValueChange?: (id: string) => void;
	speed?: number;
	defaultSpeed?: number;
	onSpeedChange?: (speed: number) => void;
	/** `making` while the sample is prepared, `playing` while it is heard. */
	sample?: VoiceSampleState;
	variant?: VoicePickerVariant;
	children?: ReactNode;
}) {
	const [voice, setVoice] = useControllable(
		value,
		defaultValue ?? voices[0]?.id ?? "",
		onValueChange,
	);
	const [speed, setSpeed] = useControllable(speedProp, defaultSpeed, onSpeedChange);
	return (
		<VoicePickerCtx.Provider
			value={{ voices, voice, setVoice, speed, setSpeed, sample, variant }}
		>
			<div
				data-slot="voice-picker"
				data-sample={sample}
				className={cn(voicePicker({ variant }).root(), className)}
				{...props}
			>
				{children}
			</div>
		</VoicePickerCtx.Provider>
	);
}

function Swatch({ id }: { id: string }) {
	return (
		<span
			aria-hidden
			className={voicePicker().swatch()}
			style={{ background: swatchBackground(id) }}
		/>
	);
}

export function VoicePickerSelect({ className }: { className?: string }) {
	const { voices, voice, setVoice } = useVoicePicker();
	const styles = voicePicker();
	const items = voices.map((v) => ({
		value: v.id,
		label: (
			<span className={styles.label()}>
				<Swatch id={v.id} />
				<span className={styles.name()}>{v.name}</span>
				{v.detail ? <span className={styles.detail()}>{v.detail}</span> : null}
			</span>
		),
	}));
	return (
		<Select items={items} value={voice} onValueChange={setVoice}>
			<SelectTrigger
				data-slot="voice-picker-select"
				className={cn("min-w-0 flex-1", className)}
			>
				<SelectValue placeholder="Choose a voice" />
			</SelectTrigger>
			<SelectContent>
				{items.map((item) => (
					<SelectItem key={item.value} value={item.value}>
						{item.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

/** Hear the chosen voice. Renders as a stop button while the sample plays. */
export function VoicePickerSample({
	onPlay,
	onStop,
	className,
}: {
	onPlay?: () => void;
	onStop?: () => void;
	className?: string;
}) {
	const { sample } = useVoicePicker();
	const styles = voicePicker({ sample });
	const busy = sample !== "idle";
	return (
		<Button
			data-slot="voice-picker-sample"
			variant="secondary"
			loading={sample === "making"}
			loadingLabel="Making a sample"
			disabled={busy ? !onStop : !onPlay}
			className={className}
			onClick={busy ? onStop : onPlay}
		>
			{sample === "playing" ? (
				<span aria-hidden className={styles.eq()}>
					{EQ_BARS.map((h, i) => (
						<i
							// biome-ignore lint/suspicious/noArrayIndexKey: four fixed bars, order never changes.
							key={i}
							className={styles.eqBar()}
							style={{ height: `${h * 100}%`, animationDelay: `${i * 140}ms` }}
						/>
					))}
				</span>
			) : null}
			{sample === "playing" ? "Stop" : "Sample"}
		</Button>
	);
}

/** A slider in `stack`; in `inline` there is no room for a track, so it is one button that cycles speeds. */
export function VoicePickerSpeed({
	min = 0.5,
	max = 2,
	step = 0.05,
	speeds = VOICE_SPEEDS,
	className,
}: {
	min?: number;
	max?: number;
	step?: number;
	/** The speeds the inline button cycles through. */
	speeds?: number[];
	className?: string;
}) {
	const { speed, setSpeed, variant } = useVoicePicker();
	const styles = voicePicker({ variant });
	if (variant === "inline") {
		return (
			<Button
				data-slot="voice-picker-speed"
				variant="ghost"
				aria-label={`Speaking speed ${formatSpeed(speed)}. Press to change.`}
				className={cn("tabular-nums", className)}
				onClick={() => setSpeed(nextSpeed(speed, speeds))}
			>
				{formatSpeed(speed)}
			</Button>
		);
	}
	return (
		<div data-slot="voice-picker-speed" className={cn(styles.speed(), className)}>
			<span className={styles.speedValue()}>{formatSpeed(speed)}</span>
			<div className={styles.speedTrack()}>
				<Slider
					min={min}
					max={max}
					step={step}
					label="Speaking speed"
					value={speed}
					onValueChange={(next) => {
						if (typeof next === "number") setSpeed(next);
					}}
				/>
			</div>
		</div>
	);
}

export function VoicePickerRow({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="voice-picker-row"
			className={cn(voicePicker().row(), className)}
			{...props}
		/>
	);
}
