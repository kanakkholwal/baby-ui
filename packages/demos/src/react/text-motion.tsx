"use client";

import {
	DiaText,
	type DiaTextSize,
	MorphText,
	type MorphTextSize,
	RevealText,
	type RevealTextSize,
	type RevealTextSplit,
	type RevealTextTrigger,
	RollingDigits,
	type RollingDigitsDirection,
	type RollingDigitsSize,
	ShimmerText,
	type ShimmerTextSize,
	TextInertia,
	type TextInertiaSize,
	TextLoop,
	type TextLoopDirection,
	type TextLoopSize,
	Typewriter,
	type TypewriterCursor,
} from "@baby-ui/react";
import { useEffect, useState } from "react";

type Props = Record<string, unknown>;

const DIA_WORDS = ["smooth.", "focused.", "refined."];
const LOOP_ITEMS = ["Design", "Build", "Ship", "Iterate"];
const MORPH_WORDS = ["fast", "fluid", "alive"];
const INERTIA_TEXT =
	"Crafting refined, pixel-perfect web experiences that balance design clarity with technical excellence. Every interaction should feel responsive, intentional, and calm enough to disappear into the work.";

export function DiaTextDemo({ props }: { props: Props }) {
	return (
		<p className="max-w-4xl text-center font-light text-3xl text-foreground tracking-tight sm:text-4xl">
			Make interfaces feel{" "}
			<DiaText
				text={DIA_WORDS}
				repeat
				durationMs={Number(props.durationMs ?? 1500)}
				delayMs={Number(props.delayMs ?? 0)}
				repeatDelayMs={Number(props.repeatDelayMs ?? 500)}
				fixedWidth={Boolean(props.fixedWidth ?? false)}
				size={(props.size as DiaTextSize) ?? "inherit"}
			/>
		</p>
	);
}

export function MorphTextDemo({ props }: { props: Props }) {
	return (
		<p className="max-w-4xl text-center font-light text-2xl text-foreground tracking-tight sm:text-4xl">
			Build software that feels{" "}
			<MorphText
				words={MORPH_WORDS}
				defaultIndex={Number(props.defaultIndex ?? 0)}
				intervalMs={Number(props.intervalMs ?? 3000)}
				subtext={(props.subtext as string) || undefined}
				size={(props.size as MorphTextSize) ?? "inherit"}
				className="font-semibold"
			/>
		</p>
	);
}

export function RevealTextDemo({ props }: { props: Props }) {
	const split = (props.split as RevealTextSplit) ?? "word";
	const trigger = (props.trigger as RevealTextTrigger) ?? "mount";
	return (
		<RevealText
			key={`${split}-${trigger}-${props.staggerMs}-${props.blur}`}
			as="h2"
			text="Design meets motion, one word at a time"
			split={split}
			trigger={trigger}
			once={Boolean(props.once ?? true)}
			staggerMs={Number(props.staggerMs ?? 90)}
			delayMs={Number(props.delayMs ?? 0)}
			blur={Number(props.blur ?? 12)}
			size={(props.size as RevealTextSize) ?? "inherit"}
			className="text-center font-semibold text-2xl text-foreground tracking-tight"
		/>
	);
}

export function ShimmerTextDemo({ props }: { props: Props }) {
	return (
		<ShimmerText
			text="Agent is thinking ..."
			durationMs={Number(props.durationMs ?? 2000)}
			spread={Number(props.spread ?? 2)}
			size={(props.size as ShimmerTextSize) ?? "inherit"}
			className="font-light text-lg tracking-tight"
		/>
	);
}

export function TextInertiaDemo({ props }: { props: Props }) {
	return (
		<TextInertia
			text={INERTIA_TEXT}
			intensity={Number(props.intensity ?? 1)}
			size={(props.size as TextInertiaSize) ?? "inherit"}
			className="w-full max-w-3xl justify-start text-left text-foreground text-lg leading-relaxed sm:text-xl"
		/>
	);
}

export function TextLoopDemo({ props }: { props: Props }) {
	return (
		<p className="max-w-4xl text-center font-light text-foreground text-lg tracking-tight sm:text-xl">
			<TextLoop
				items={LOOP_ITEMS}
				defaultIndex={Number(props.defaultIndex ?? 0)}
				intervalMs={Number(props.intervalMs ?? 1000)}
				durationMs={Number(props.durationMs ?? 300)}
				direction={(props.direction as TextLoopDirection) ?? "up"}
				size={(props.size as TextLoopSize) ?? "inherit"}
				className="font-medium"
			/>{" "}
			software that ships faster.
		</p>
	);
}

export function TypewriterDemo({ props }: { props: Props }) {
	return (
		<Typewriter
			text="Typing like a person, typos and all."
			durationMs={Number(props.durationMs ?? 3000)}
			loop={Boolean(props.loop ?? true)}
			cursor={(props.cursor as TypewriterCursor) ?? "bar"}
			className="font-mono text-foreground text-xl"
		/>
	);
}

const ROLLING_VALUES = [1284, 1312, 1296, 1450, 9870, 10240];

export function RollingDigitsDemo({ props }: { props: Props }) {
	const [step, setStep] = useState(0);
	useEffect(() => {
		const id = setInterval(() => setStep((s) => (s + 1) % ROLLING_VALUES.length), 1800);
		return () => clearInterval(id);
	}, []);
	return (
		<RollingDigits
			value={ROLLING_VALUES[step] ?? 0}
			pad={props.pad === undefined ? undefined : Number(props.pad)}
			locale={(props.locale as string) || "en-US"}
			startOnView={props.startOnView !== false}
			stepMs={Number(props.stepMs ?? 80)}
			coalesce={props.coalesce === true}
			direction={(props.direction as RollingDigitsDirection) ?? "dynamic"}
			offset={Number(props.offset ?? 32)}
			size={(props.size as RollingDigitsSize) ?? "inherit"}
			className="font-semibold text-5xl text-foreground tracking-tight"
		/>
	);
}
