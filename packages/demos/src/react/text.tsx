"use client";

import {
	AnimatedGradientText,
	BoldCopy,
	type BoldCopySize,
	CircularText,
	type CircularTextDirection,
	Counter,
	type CounterDirection,
	type CounterSize,
	CycleText,
	type CycleTextSize,
	DoubleUnderline,
	type DoubleUnderlineTrigger,
	GibberishText,
	type GibberishTextSize,
	GlitchText,
	type GlitchTextBlendMode,
	type GlitchTextSize,
	type GradientTextTone,
	JitterText,
	type JitterTextSize,
	JumpingText,
	type JumpingTextMode,
	type JumpingTextSize,
	MaskText,
	type MaskTextSize,
	MetisText,
	type MetisTextDirection,
	MirrorText,
	type MirrorTextDirection,
	type RollStagger,
	RollText,
	type RollTextSize,
	ScrollReveal,
	type ScrollRevealSize,
	SplitText,
	type SplitTextSize,
	StaggeredLetter,
	type StaggeredLetterDirection,
	SwapText,
	type SwapTextSize,
	TextBorderAnimation,
	type TextBorderAnimationSize,
	TextExplodeIMessage,
	type TextExplodeIMessageMode,
	type TextExplodeIMessageSize,
	TextFlip,
	type TextFlipSize,
	TextTransition,
	type TextTransitionVariant,
	Ticker,
	type TickerSize,
	TypingText,
	type TypingTextSize,
	UnderlineHoverText,
	type UnderlineHoverTextTone,
	WaveReveal,
	type WaveRevealDirection,
	type WaveRevealMode,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function AnimatedGradientTextDemo({ props }: { props: Props }) {
	return (
		<AnimatedGradientText
			as="h2"
			tone={(props.tone as GradientTextTone) ?? "primary"}
			durationSeconds={Number(props.durationSeconds ?? 3)}
			className="text-3xl font-semibold sm:text-4xl"
		>
			Ship it in seconds
		</AnimatedGradientText>
	);
}

export function DoubleUnderlineDemo({ props }: { props: Props }) {
	return (
		<p className="text-2xl text-foreground">
			Every{" "}
			<DoubleUnderline
				as="span"
				trigger={(props.trigger as DoubleUnderlineTrigger) ?? "hover"}
				durationMs={Number(props.durationMs ?? 500)}
			>
				component
			</DoubleUnderline>{" "}
			ships in both ports.
		</p>
	);
}

export function BoldCopyDemo({ props }: { props: Props }) {
	return (
		<BoldCopy
			text={(props.text as string) || "baby ui"}
			size={(props.size as BoldCopySize) ?? "xl"}
			durationMs={Number(props.durationMs ?? 300)}
		/>
	);
}

export function CircularTextDemo({ props }: { props: Props }) {
	return (
		<CircularText
			text={(props.text as string) || "CIRCULAR TEXT · CIRCULAR TEXT · "}
			spinSeconds={Number(props.spinSeconds ?? 30)}
			radius={Number(props.radius ?? 80)}
			direction={(props.direction as CircularTextDirection) ?? "clockwise"}
		/>
	);
}

export function JitterTextDemo({ props }: { props: Props }) {
	return (
		<JitterText
			text={(props.text as string) || "Jitter"}
			durationSeconds={Number(props.durationSeconds ?? 0.6)}
			size={(props.size as JitterTextSize) ?? "lg"}
			className="text-foreground"
		/>
	);
}

export function JumpingTextDemo({ props }: { props: Props }) {
	return (
		<JumpingText
			key={String(props.stepMs ?? "") + String(props.durationMs ?? "")}
			text={(props.text as string) || "This is a jumping text effect"}
			mode={(props.mode as JumpingTextMode) ?? "word"}
			stepMs={Number(props.stepMs ?? 60)}
			durationMs={Number(props.durationMs ?? 500)}
			size={(props.size as JumpingTextSize) ?? "md"}
			className="text-foreground"
		/>
	);
}

export function MaskTextDemo({ props }: { props: Props }) {
	return (
		<MaskText
			revealText={(props.revealText as string) || "Hello there"}
			baseText={(props.baseText as string) || "Move your cursor"}
			revealSize={Number(props.revealSize ?? 240)}
			durationMs={Number(props.durationMs ?? 500)}
			size={(props.size as MaskTextSize) ?? "md"}
		/>
	);
}

export function MirrorTextDemo({ props }: { props: Props }) {
	return (
		<MirrorText
			key={String(props.durationMs ?? "") + String(props.staggerMs ?? "")}
			text={(props.text as string) || "This is a text"}
			direction={(props.direction as MirrorTextDirection) ?? "up"}
			durationMs={Number(props.durationMs ?? 500)}
			staggerMs={Number(props.staggerMs ?? 67)}
			className="text-4xl font-light uppercase"
		/>
	);
}

export function GibberishTextDemo({ props }: { props: Props }) {
	return (
		<GibberishText
			key={(props.text as string) || "Gibberish"}
			text={(props.text as string) || "Gibberish"}
			speedMs={Number(props.speedMs ?? 24)}
			size={(props.size as GibberishTextSize) ?? "lg"}
			className="text-foreground"
		/>
	);
}

export function GlitchTextDemo({ props }: { props: Props }) {
	return (
		<GlitchText
			text={(props.text as string) || "Glitch"}
			size={(props.size as GlitchTextSize) ?? "md"}
			intensity={Number(props.intensity ?? 5)}
			durationSeconds={Number(props.durationSeconds ?? 2.5)}
			baseColor={(props.baseColor as string) || undefined}
			colorA={(props.colorA as string) || undefined}
			colorB={(props.colorB as string) || undefined}
			blendMode={(props.blendMode as GlitchTextBlendMode) ?? "screen"}
			className="text-foreground"
		/>
	);
}

export function MetisTextDemo({ props }: { props: Props }) {
	return (
		<p className="text-lg text-foreground">
			Read the{" "}
			<MetisText
				direction={(props.direction as MetisTextDirection) ?? "left"}
				durationMs={Number(props.durationMs ?? 300)}
			>
				full changelog
			</MetisText>
			.
		</p>
	);
}

export function UnderlineHoverTextDemo({ props }: { props: Props }) {
	return (
		<UnderlineHoverText
			text={(props.text as string) || "Underline hover"}
			tone={(props.tone as UnderlineHoverTextTone) ?? "default"}
			durationMs={Number(props.durationMs ?? 500)}
		/>
	);
}

export function TextBorderAnimationDemo({ props }: { props: Props }) {
	return (
		<TextBorderAnimation
			text={(props.text as string) || "Programming"}
			size={(props.size as TextBorderAnimationSize) ?? "lg"}
			durationMs={Number(props.durationMs ?? 300)}
		/>
	);
}

export function RollTextDemo({ props }: { props: Props }) {
	return (
		<RollText
			text={(props.text as string) || "Roll on hover"}
			groupHover={props.groupHover === true}
			disabled={props.disabled === true}
			stagger={(props.stagger as RollStagger) ?? "none"}
			staggerMs={Number(props.staggerMs ?? 32)}
			durationMs={Number(props.durationMs ?? 450)}
			size={(props.size as RollTextSize) ?? "md"}
			className="text-2xl font-semibold text-foreground"
		/>
	);
}

export function SplitTextDemo({ props }: { props: Props }) {
	return (
		<SplitText
			text={(props.text as string) || "BABY UI"}
			size={(props.size as SplitTextSize) ?? "md"}
			durationMs={Number(props.durationMs ?? 300)}
		/>
	);
}

export function StaggeredLetterDemo({ props }: { props: Props }) {
	return (
		<StaggeredLetter
			key={String(props.delayMs ?? "") + String(props.durationMs ?? "")}
			text={(props.text as string) || "Baby UI"}
			applyMask={props.applyMask === true}
			delayMs={Number(props.delayMs ?? 90)}
			durationMs={Number(props.durationMs ?? 500)}
			direction={(props.direction as StaggeredLetterDirection) ?? "drop"}
		/>
	);
}

export function SwapTextDemo({ props }: { props: Props }) {
	return (
		<SwapText
			initialText={(props.initialText as string) || "Hover me"}
			finalText={(props.finalText as string) || "Click me"}
			defaultActive={props.defaultActive === true}
			size={(props.size as SwapTextSize) ?? "lg"}
			supportsHover={props.supportsHover !== false}
			disableClick={props.disableClick === true}
			durationMs={Number(props.durationMs ?? 1000)}
		/>
	);
}

const FLIP_WORDS = ["fantastic", "love", "fire", "awesome"];

export function TextFlipDemo({ props }: { props: Props }) {
	return (
		<TextFlip
			label={(props.label as string) || "Coding is"}
			words={FLIP_WORDS}
			intervalMs={Number(props.intervalMs ?? 2000)}
			size={(props.size as TextFlipSize) ?? "lg"}
		/>
	);
}

export function TextTransitionDemo({ props }: { props: Props }) {
	return (
		<TextTransition
			key={
				(props.variant as string) +
				String(props.durationMs ?? "") +
				String(props.staggerMs ?? "")
			}
			text={(props.text as string) || "Ship it in seconds"}
			variant={(props.variant as TextTransitionVariant) ?? "blur-out-up"}
			durationMs={Number(props.durationMs ?? 560)}
			staggerMs={Number(props.staggerMs ?? 28)}
			className="text-3xl font-semibold text-foreground"
		/>
	);
}

export function TypingTextDemo({ props }: { props: Props }) {
	return (
		<TypingText
			key={String(props.smooth ?? "")}
			text={(props.text as string) || "Creates a typing effect for given text"}
			delay={Number(props.delay ?? 32)}
			repeat={props.repeat !== false}
			waitMs={Number(props.waitMs ?? 1000)}
			smooth={props.smooth === true}
			fadeDurationMs={Number(props.fadeDurationMs ?? 300)}
			grow={props.grow === true}
			hideCursorOnComplete={props.hideCursorOnComplete === true}
			size={(props.size as TypingTextSize) ?? "md"}
			className="text-foreground"
		/>
	);
}

const CYCLE_WORDS = ["designers", "developers", "founders", "teams"];

export function CycleTextDemo({ props }: { props: Props }) {
	return (
		<p className="text-2xl text-foreground">
			Built for{" "}
			<CycleText
				words={CYCLE_WORDS}
				defaultIndex={Number(props.defaultIndex ?? 0)}
				intervalMs={Number(props.intervalMs ?? 1300)}
				durationMs={Number(props.durationMs ?? 260)}
				size={(props.size as CycleTextSize) ?? "lg"}
				className="font-semibold text-primary"
			/>
		</p>
	);
}

export function WaveRevealDemo({ props }: { props: Props }) {
	return (
		<WaveReveal
			key={
				String(props.direction ?? "down") +
				String(props.blur ?? true) +
				String(props.mode ?? "") +
				String(props.staggerMs ?? "")
			}
			text={(props.text as string) || "Reveal letter or word one by one"}
			direction={(props.direction as WaveRevealDirection) ?? "down"}
			mode={(props.mode as WaveRevealMode) ?? "letter"}
			blur={props.blur !== false}
			staggerMs={Number(props.staggerMs ?? 50)}
			className="text-2xl font-medium text-foreground"
		/>
	);
}

export function CounterDemo({ props }: { props: Props }) {
	return (
		<Counter
			key={String(props.direction ?? "up") + String(props.durationMs ?? "")}
			value={Number(props.value ?? 12480)}
			direction={(props.direction as CounterDirection) ?? "up"}
			durationMs={Number(props.durationMs ?? 1200)}
			delayMs={Number(props.delayMs ?? 0)}
			triggerOnView={props.triggerOnView === true}
			size={(props.size as CounterSize) ?? "md"}
		/>
	);
}

export function TickerDemo({ props }: { props: Props }) {
	return (
		<Ticker
			value={(props.value as string) || "1,024"}
			durationMs={Number(props.durationMs ?? 500)}
			size={(props.size as TickerSize) ?? "md"}
		/>
	);
}

export function ScrollRevealDemo({ props }: { props: Props }) {
	return (
		<ScrollReveal
			text={
				(props.text as string) ||
				"Scroll inside this box to reveal each word of this sentence, one at a time, as you go."
			}
			minOpacity={Number(props.minOpacity ?? 0.5)}
			blur={props.blur !== false}
			size={(props.size as ScrollRevealSize) ?? "md"}
		/>
	);
}

export function TextExplodeIMessageDemo({ props }: { props: Props }) {
	return (
		<TextExplodeIMessage
			key={String(props.durationMs ?? "")}
			text={(props.text as string) || "Big news"}
			mode={(props.mode as TextExplodeIMessageMode) ?? "loop"}
			durationMs={Number(props.durationMs ?? 4000)}
			size={(props.size as TextExplodeIMessageSize) ?? "lg"}
		/>
	);
}
