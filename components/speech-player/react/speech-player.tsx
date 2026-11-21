"use client";

import { type ComponentProps, createContext, type ReactNode, useContext } from "react";
import { Button } from "../../button/react/button";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/react/use-controllable";
import { Progress } from "../../progress/react/progress";
import { Slider } from "../../slider/react/slider";
import {
	canSkip,
	chunkRatio,
	formatRate,
	nextRate,
	SPEECH_PLAYER_ICONS,
	SPEECH_RATES,
	type SpeechPlayerIcon,
} from "../chunks";
import {
	MAX_TICKS,
	type SpeechPlayerState,
	type SpeechPlayerVariant,
	type SpeechProgressShape,
	speechPlayer,
} from "../variants";

export type { SpeechPlayerState, SpeechPlayerVariant, SpeechProgressShape };

type Ctx = {
	state: SpeechPlayerState;
	variant: SpeechPlayerVariant;
	at: number;
	count: number;
	rate: number;
	setRate: (rate: number) => void;
};

const SpeechPlayerCtx = createContext<Ctx | null>(null);

function useSpeechPlayer() {
	const ctx = useContext(SpeechPlayerCtx);
	if (!ctx) throw new Error("SpeechPlayer parts must be used inside <SpeechPlayer>");
	return ctx;
}

function Icon({ name }: { name: SpeechPlayerIcon }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			<path d={SPEECH_PLAYER_ICONS[name]} />
		</svg>
	);
}

/** A pure render of the read-aloud session: the app owns the audio and tells it where it is. */
export function SpeechPlayer({
	state = "idle",
	variant = "card",
	at,
	count,
	rate: rateProp,
	defaultRate = 1,
	onRateChange,
	className,
	children,
	...props
}: Omit<ComponentProps<"div">, "children"> & {
	state?: SpeechPlayerState;
	variant?: SpeechPlayerVariant;
	/** The chunk being read, 1 to `count`; 0 before it starts. */
	at: number;
	count: number;
	rate?: number;
	defaultRate?: number;
	onRateChange?: (rate: number) => void;
	children?: ReactNode;
}) {
	const [rate, setRate] = useControllable(rateProp, defaultRate, onRateChange);
	return (
		<SpeechPlayerCtx.Provider value={{ state, variant, at, count, rate, setRate }}>
			<div
				data-slot="speech-player"
				data-state={state}
				className={cn(speechPlayer({ variant, state }).root(), className)}
				{...props}
			>
				{children}
			</div>
		</SpeechPlayerCtx.Provider>
	);
}

export function SpeechPlayerControls({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="speech-player-controls"
			className={cn(speechPlayer().controls(), className)}
			{...props}
		/>
	);
}

/** Play, pause or resume by state; a spinner while the voice is getting ready. */
export function SpeechPlayerPlay({
	onClick,
	className,
}: {
	onClick?: () => void;
	className?: string;
}) {
	const { state } = useSpeechPlayer();
	const playing = state === "playing";
	return (
		<Button
			data-slot="speech-player-play"
			size="icon"
			variant="secondary"
			loading={state === "preparing"}
			loadingLabel="Getting the voice ready"
			aria-label={playing ? "Pause" : state === "paused" ? "Resume" : "Read aloud"}
			disabled={!onClick}
			className={cn("rounded-full", className)}
			onClick={onClick}
		>
			<Icon name={playing ? "pause" : "play"} />
		</Button>
	);
}

/** Skips a chunk (a sentence or paragraph) back or forward; disabled at the ends. */
export function SpeechPlayerSkip({
	direction,
	onClick,
	className,
}: {
	direction: "previous" | "next";
	onClick?: () => void;
	className?: string;
}) {
	const { at, count } = useSpeechPlayer();
	return (
		<Button
			data-slot={`speech-player-${direction}`}
			size="icon"
			variant="ghost"
			aria-label={direction === "previous" ? "Previous passage" : "Next passage"}
			disabled={!onClick || !canSkip(at, count, direction === "previous" ? -1 : 1)}
			className={className}
			onClick={onClick}
		>
			<Icon name={direction} />
		</Button>
	);
}

/** Stops and resets. Renders only when a handler is given and something is playing or paused. */
export function SpeechPlayerStop({
	onClick,
	className,
}: {
	onClick?: () => void;
	className?: string;
}) {
	const { state } = useSpeechPlayer();
	if (!onClick || (state !== "playing" && state !== "paused")) return null;
	return (
		<Button
			data-slot="speech-player-stop"
			size="icon"
			variant="ghost"
			aria-label="Stop"
			className={className}
			onClick={onClick}
		>
			<Icon name="stop" />
		</Button>
	);
}

/** "2 of 5"; children replace it. */
export function SpeechPlayerPosition({
	className,
	children,
	...props
}: ComponentProps<"span">) {
	const { state, at, count } = useSpeechPlayer();
	return (
		<span
			data-slot="speech-player-position"
			aria-live="polite"
			className={cn(speechPlayer({ state }).position(), className)}
			{...props}
		>
			{children ?? (count > 1 && at > 0 ? `${at} of ${count}` : "")}
		</span>
	);
}

/** Progress by chunk. `scrub` is a seekable track with a tick per passage; it needs `onSeek`. */
export function SpeechPlayerProgress({
	label = "Reading progress",
	shape = "bar",
	onSeek,
}: {
	label?: string;
	shape?: SpeechProgressShape;
	/** With `scrub`: called with the passage number (1 to `count`) to jump to. */
	onSeek?: (passage: number) => void;
}) {
	const { state, at, count } = useSpeechPlayer();
	if (shape === "scrub" && onSeek && count > 1 && count <= MAX_TICKS) {
		return (
			<Slider
				size="sm"
				label={label}
				min={1}
				max={count}
				step={1}
				value={Math.max(1, at)}
				marks={Array.from({ length: count }, (_, i) => ({ value: i + 1 }))}
				onValueChange={(next) => {
					if (typeof next === "number") onSeek(next);
				}}
			/>
		);
	}
	return (
		<Progress
			size="sm"
			label={label}
			value={chunkRatio(at, count)}
			indeterminate={state === "preparing"}
		/>
	);
}

/** Speaking speed in one button: each press moves to the next speed and wraps around. */
export function SpeechPlayerRate({
	rates = SPEECH_RATES,
	className,
}: {
	rates?: number[];
	className?: string;
}) {
	const { rate, setRate } = useSpeechPlayer();
	return (
		<Button
			data-slot="speech-player-rate"
			variant="ghost"
			size="sm"
			aria-label={`Speaking speed ${formatRate(rate)}. Press to change.`}
			className={cn(speechPlayer().rate(), className)}
			onClick={() => setRate(nextRate(rate, rates))}
		>
			{formatRate(rate)}
		</Button>
	);
}
