"use client";

import {
	AnimatedGradientText,
	BoldCopy,
	type BoldCopySize,
	CircularText,
	type CircularTextDirection,
	Counter,
	type CounterDirection,
	CycleText,
	type CycleTextSize,
	DoubleUnderline,
	type DoubleUnderlineTrigger,
	GibberishText,
	type GibberishTextSize,
	GlitchText,
	type GlitchTextSize,
	type GradientTextTone,
	JitterText,
	type JitterTextSize,
	JumpingText,
	type JumpingTextMode,
	MaskText,
	MetisText,
	type MetisTextDirection,
	MirrorText,
	type MirrorTextDirection,
	type RollStagger,
	RollText,
	ScrollReveal,
	SplitText,
	type SplitTextSize,
	StaggeredLetter,
	type StaggeredLetterDirection,
	SwapText,
	type SwapTextSize,
	TextBorderAnimation,
	type TextBorderAnimationSize,
	TextExplodeIMessage,
	TextFlip,
	type TextFlipSize,
	TextTransition,
	type TextTransitionVariant,
	Ticker,
	TypingText,
	type TypingTextSize,
	UnderlineHoverText,
	type UnderlineHoverTextTone,
	WaveReveal,
	type WaveRevealDirection,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function AnimatedGradientTextDemo({ props }: { props: Props }) {
	return (
		<AnimatedGradientText
			as="h2"
			tone={(props.tone as GradientTextTone) ?? "primary"}
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
		/>
	);
}

export function CircularTextDemo({ props }: { props: Props }) {
	return (
		<CircularText
			text="CIRCULAR TEXT · CIRCULAR TEXT · "
			direction={(props.direction as CircularTextDirection) ?? "clockwise"}
		/>
	);
}

export function JitterTextDemo({ props }: { props: Props }) {
	return (
		<JitterText
			text="Jitter"
			size={(props.size as JitterTextSize) ?? "lg"}
			className="text-foreground"
		/>
	);
}

export function JumpingTextDemo({ props }: { props: Props }) {
	return (
		<JumpingText
			text="This is a jumping text effect"
			mode={(props.mode as JumpingTextMode) ?? "word"}
			className="text-foreground"
		/>
	);
}

export function MaskTextDemo() {
	return <MaskText revealText="Hello there" baseText="Move your cursor" />;
}

export function MirrorTextDemo({ props }: { props: Props }) {
	return (
		<MirrorText
			text={(props.text as string) || "This is a text"}
			direction={(props.direction as MirrorTextDirection) ?? "up"}
			className="text-4xl font-light uppercase"
		/>
	);
}

export function GibberishTextDemo({ props }: { props: Props }) {
	return (
		<GibberishText
			key={(props.text as string) || "Gibberish"}
			text={(props.text as string) || "Gibberish"}
			size={(props.size as GibberishTextSize) ?? "lg"}
			className="text-foreground"
		/>
	);
}

export function GlitchTextDemo({ props }: { props: Props }) {
	return (
		<GlitchText
			text="Glitch"
			size={(props.size as GlitchTextSize) ?? "md"}
			className="text-foreground"
		/>
	);
}

export function MetisTextDemo({ props }: { props: Props }) {
	return (
		<p className="text-lg text-foreground">
			Read the{" "}
			<MetisText direction={(props.direction as MetisTextDirection) ?? "left"}>
				full changelog
			</MetisText>
			.
		</p>
	);
}

export function UnderlineHoverTextDemo({ props }: { props: Props }) {
	return (
		<UnderlineHoverText
			text="Underline hover"
			tone={(props.tone as UnderlineHoverTextTone) ?? "default"}
		/>
	);
}

export function TextBorderAnimationDemo({ props }: { props: Props }) {
	return (
		<TextBorderAnimation
			text={(props.text as string) || "Programming"}
			size={(props.size as TextBorderAnimationSize) ?? "lg"}
		/>
	);
}

export function RollTextDemo({ props }: { props: Props }) {
	return (
		<RollText
			text="Roll on hover"
			stagger={(props.stagger as RollStagger) ?? "none"}
			className="text-2xl font-semibold text-foreground"
		/>
	);
}

export function SplitTextDemo({ props }: { props: Props }) {
	return (
		<SplitText
			text={(props.text as string) || "BABY UI"}
			size={(props.size as SplitTextSize) ?? "md"}
		/>
	);
}

export function StaggeredLetterDemo({ props }: { props: Props }) {
	return (
		<StaggeredLetter
			text="Baby UI"
			direction={(props.direction as StaggeredLetterDirection) ?? "drop"}
		/>
	);
}

export function SwapTextDemo({ props }: { props: Props }) {
	return (
		<SwapText
			initialText="Hover me"
			finalText="Click me"
			size={(props.size as SwapTextSize) ?? "lg"}
			supportsHover={props.supportsHover !== false}
		/>
	);
}

const FLIP_WORDS = ["fantastic", "love", "fire", "awesome"];

export function TextFlipDemo({ props }: { props: Props }) {
	return (
		<TextFlip
			label="Coding is"
			words={FLIP_WORDS}
			size={(props.size as TextFlipSize) ?? "lg"}
		/>
	);
}

export function TextTransitionDemo({ props }: { props: Props }) {
	return (
		<TextTransition
			text="Ship it in seconds"
			variant={(props.variant as TextTransitionVariant) ?? "blur-out-up"}
			className="text-3xl font-semibold text-foreground"
		/>
	);
}

export function TypingTextDemo({ props }: { props: Props }) {
	return (
		<TypingText
			text="Creates a typing effect for given text"
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
				size={(props.size as CycleTextSize) ?? "lg"}
				className="font-semibold text-primary"
			/>
		</p>
	);
}

export function WaveRevealDemo({ props }: { props: Props }) {
	return (
		<WaveReveal
			key={String(props.direction ?? "down") + String(props.blur ?? true)}
			text="Reveal letter or word one by one"
			direction={(props.direction as WaveRevealDirection) ?? "down"}
			blur={props.blur !== false}
			className="text-2xl font-medium text-foreground"
		/>
	);
}

export function CounterDemo({ props }: { props: Props }) {
	return (
		<Counter
			key={String(props.direction ?? "up")}
			value={12480}
			direction={(props.direction as CounterDirection) ?? "up"}
			triggerOnView={false}
		/>
	);
}

export function TickerDemo() {
	return <Ticker value="1,024" />;
}

export function ScrollRevealDemo() {
	return (
		<ScrollReveal text="Scroll inside this box to reveal each word of this sentence, one at a time, as you go." />
	);
}

export function TextExplodeIMessageDemo() {
	return <TextExplodeIMessage text="Big news" mode="loop" />;
}
