"use client";

import {
	AnimatedGradientText,
	Counter,
	CycleText,
	DoubleUnderline,
	GibberishText,
	GlitchText,
	JitterText,
	JumpingText,
	MetisText,
	MirrorText,
	RollText,
	StaggeredLetter,
	TextExplodeIMessage,
	TextTransition,
	Ticker,
	TypingText,
	WaveReveal,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function AnimatedGradientTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof AnimatedGradientText>>(props);
	return (
		<AnimatedGradientText
			as="h2"
			tone={p.tone ?? "primary"}
			durationSeconds={Number(props.durationSeconds ?? 3)}
			className="text-3xl font-semibold sm:text-4xl"
		>
			Ship it in seconds
		</AnimatedGradientText>
	);
}

export function DoubleUnderlineDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof DoubleUnderline>>(props);
	return (
		<p className="text-2xl text-foreground">
			Every{" "}
			<DoubleUnderline
				as="span"
				trigger={p.trigger ?? "hover"}
				durationMs={Number(props.durationMs ?? 500)}
			>
				component
			</DoubleUnderline>{" "}
			ships in both ports.
		</p>
	);
}

export function JitterTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof JitterText>>(props);
	return (
		<JitterText
			text={p.text || "Jitter"}
			durationSeconds={Number(props.durationSeconds ?? 0.6)}
			size={p.size ?? "lg"}
			className="text-foreground"
		/>
	);
}

export function JumpingTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof JumpingText>>(props);
	return (
		<JumpingText
			key={String(props.stepMs ?? "") + String(props.durationMs ?? "")}
			text={p.text || "This is a jumping text effect"}
			mode={p.mode ?? "word"}
			stepMs={Number(props.stepMs ?? 60)}
			durationMs={Number(props.durationMs ?? 500)}
			size={p.size ?? "md"}
			className="text-foreground"
		/>
	);
}

export function MirrorTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof MirrorText>>(props);
	return (
		<MirrorText
			key={String(props.durationMs ?? "") + String(props.staggerMs ?? "")}
			text={p.text || "This is a text"}
			direction={p.direction ?? "up"}
			durationMs={Number(props.durationMs ?? 500)}
			staggerMs={Number(props.staggerMs ?? 67)}
			className="text-4xl font-light uppercase"
		/>
	);
}

export function GibberishTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof GibberishText>>(props);
	return (
		<GibberishText
			key={p.text || "Gibberish"}
			text={p.text || "Gibberish"}
			speedMs={Number(props.speedMs ?? 24)}
			size={p.size ?? "lg"}
			className="text-foreground"
		/>
	);
}

export function GlitchTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof GlitchText>>(props);
	return (
		<GlitchText
			text={p.text || "Glitch"}
			size={p.size ?? "md"}
			intensity={Number(props.intensity ?? 5)}
			durationSeconds={Number(props.durationSeconds ?? 2.5)}
			baseColor={p.baseColor || undefined}
			colorA={p.colorA || undefined}
			colorB={p.colorB || undefined}
			blendMode={p.blendMode ?? "screen"}
			className="text-foreground"
		/>
	);
}

export function MetisTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof MetisText>>(props);
	return (
		<p className="text-lg text-foreground">
			Read the{" "}
			<MetisText
				direction={p.direction ?? "left"}
				durationMs={Number(props.durationMs ?? 300)}
			>
				full changelog
			</MetisText>
			.
		</p>
	);
}

export function RollTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof RollText>>(props);
	const groupHover = props.groupHover === true;
	const roll = (
		<RollText
			text={p.text || "Roll on hover"}
			groupHover={groupHover}
			disabled={props.disabled === true}
			stagger={p.stagger ?? "none"}
			staggerMs={Number(props.staggerMs ?? 32)}
			durationMs={Number(props.durationMs ?? 450)}
			size={p.size ?? "lg"}
			motion={p.motion ?? "slide"}
			className="font-semibold text-foreground"
		/>
	);
	if (!groupHover) return roll;
	return (
		<button
			type="button"
			data-roll-group
			className="rounded-lg border border-border px-6 py-4 text-left hover:bg-foreground/[0.06]"
		>
			{roll}
		</button>
	);
}

export function StaggeredLetterDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof StaggeredLetter>>(props);
	return (
		<StaggeredLetter
			key={String(props.delayMs ?? "") + String(props.durationMs ?? "")}
			text={p.text || "Baby UI"}
			applyMask={props.applyMask === true}
			delayMs={Number(props.delayMs ?? 90)}
			durationMs={Number(props.durationMs ?? 500)}
			direction={p.direction ?? "drop"}
		/>
	);
}

export function TextTransitionDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof TextTransition>>(props);
	return (
		<TextTransition
			key={
				(p.variant ?? "blur-out-up") +
				String(props.durationMs ?? "") +
				String(props.staggerMs ?? "")
			}
			text={p.text || "Ship it in seconds"}
			variant={p.variant ?? "blur-out-up"}
			durationMs={Number(props.durationMs ?? 560)}
			staggerMs={Number(props.staggerMs ?? 28)}
			className="text-3xl font-semibold text-foreground"
		/>
	);
}

export function TypingTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof TypingText>>(props);
	return (
		<TypingText
			key={String(props.smooth ?? "")}
			text={p.text || "Creates a typing effect for given text"}
			delay={Number(props.delay ?? 32)}
			repeat={props.repeat !== false}
			waitMs={Number(props.waitMs ?? 1000)}
			smooth={props.smooth === true}
			fadeDurationMs={Number(props.fadeDurationMs ?? 300)}
			grow={props.grow === true}
			hideCursorOnComplete={props.hideCursorOnComplete === true}
			size={p.size ?? "md"}
			className="text-foreground"
		/>
	);
}

const CYCLE_WORDS = ["designers", "developers", "founders", "teams"];

export function CycleTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof CycleText>>(props);
	return (
		<p className="text-2xl text-foreground">
			Built for{" "}
			<CycleText
				words={CYCLE_WORDS}
				defaultIndex={Number(props.defaultIndex ?? 0)}
				intervalMs={Number(props.intervalMs ?? 1300)}
				durationMs={Number(props.durationMs ?? 260)}
				size={p.size ?? "lg"}
				className="font-semibold text-primary"
			/>
		</p>
	);
}

export function WaveRevealDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof WaveReveal>>(props);
	return (
		<WaveReveal
			key={
				String(props.direction ?? "down") +
				String(props.blur ?? true) +
				String(props.mode ?? "") +
				String(props.staggerMs ?? "")
			}
			text={p.text || "Reveal letter or word one by one"}
			direction={p.direction ?? "down"}
			mode={p.mode ?? "letter"}
			blur={props.blur !== false}
			staggerMs={Number(props.staggerMs ?? 50)}
			className="text-2xl font-medium text-foreground"
		/>
	);
}

export function CounterDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Counter>>(props);
	return (
		<Counter
			key={String(props.direction ?? "up") + String(props.durationMs ?? "")}
			value={Number(props.value ?? 12480)}
			direction={p.direction ?? "up"}
			durationMs={Number(props.durationMs ?? 1200)}
			delayMs={Number(props.delayMs ?? 0)}
			triggerOnView={props.triggerOnView === true}
			size={p.size ?? "md"}
		/>
	);
}

const TICKER_VALUES = ["1,024", "1,387", "2,941", "2,108", "9,999", "10,240"];

export function TickerDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Ticker>>(props);
	const [step, setStep] = useState(0);
	useEffect(() => {
		const id = setInterval(() => setStep((s) => (s + 1) % TICKER_VALUES.length), 1800);
		return () => clearInterval(id);
	}, []);
	return (
		<Ticker
			value={p.value || (TICKER_VALUES[step] ?? "")}
			durationMs={Number(props.durationMs ?? 500)}
			size={p.size ?? "md"}
		/>
	);
}

export function TextExplodeIMessageDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof TextExplodeIMessage>>(props);
	return (
		<TextExplodeIMessage
			key={String(props.durationMs ?? "")}
			text={p.text || "Big news"}
			mode={p.mode ?? "loop"}
			durationMs={Number(props.durationMs ?? 4000)}
			size={p.size ?? "lg"}
		/>
	);
}
