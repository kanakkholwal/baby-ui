"use client";

import {
	RecordingPill,
	RecordingPillCancel,
	RecordingPillIcon,
	RecordingPillLabel,
	RecordingPillMeter,
	RecordingPillTimer,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const LABEL = {
	starting: "Starting",
	listening: "Listening",
	working: "Transcribing…",
	notice: "Microphone not found",
} as const;

export function RecordingPillDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof RecordingPill>>(props);
	const state = p.state ?? "listening";
	const [seconds, setSeconds] = useState(12);
	const [level, setLevel] = useState(0.3);

	// The demo plays the session; the pill only renders what it is given.
	useEffect(() => {
		const clock = setInterval(() => setSeconds((s) => s + 1), 1000);
		const meter = setInterval(() => setLevel(0.15 + Math.random() * 0.45), 120);
		return () => {
			clearInterval(clock);
			clearInterval(meter);
		};
	}, []);

	return (
		<RecordingPill state={state} variant={p.variant} level={level}>
			<RecordingPillIcon />
			<RecordingPillLabel>{LABEL[state]}</RecordingPillLabel>
			<RecordingPillMeter />
			{state === "listening" ? <RecordingPillTimer seconds={seconds} /> : null}
			{state === "notice" ? null : <RecordingPillCancel onClick={() => setSeconds(0)} />}
		</RecordingPill>
	);
}
