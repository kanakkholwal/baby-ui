"use client";

import { type ComponentProps, createContext, type ReactNode, useContext } from "react";
import { Button } from "../../button/react/button";
import { Composer } from "../../composer/react/composer";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/react/use-controllable";
import { RollingDigits } from "../../rolling-digits/react/rolling-digits";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../select/react/select";
import { AUDIO_COMPOSER_ICONS, formatLength, stepDuration } from "../duration";
import { type AudioComposerVariant, audioComposer } from "../variants";

export type { AudioComposerVariant };

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
					variant="bare"
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

/** How long the clip will be: minus and plus buttons around the value. */
export function AudioComposerDuration({ className }: { className?: string }) {
	const { duration, setDuration, min, max, step, loading } = useAudioComposer();
	const styles = audioComposer();
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
				<RollingDigits value={duration} format={formatLength} startOnView={false} />
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
