"use client";

import {
	Button,
	WaveformTrim,
	WaveformTrimTimes,
	WaveformTrimTrack,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";
import { WAVEFORM_SAMPLE } from "../data/waveform";

type Props = Record<string, unknown>;
const DURATION = 24;

export function WaveformTrimDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof WaveformTrim>>(props);
	const [range, setRange] = useState<[number, number]>([0.12, 0.84]);
	const [position, setPosition] = useState(0.12);
	const [playing, setPlaying] = useState(false);

	// The demo plays the audio inside the kept range and loops; the component only draws the playhead.
	useEffect(() => {
		if (!playing) return;
		const id = setInterval(() => {
			setPosition((now) => {
				const next = now + 1 / (DURATION * 20);
				return next >= range[1] ? range[0] : Math.max(next, range[0]);
			});
		}, 50);
		return () => clearInterval(id);
	}, [playing, range]);

	return (
		<div className="grid w-full max-w-xl gap-3">
			<WaveformTrim
				peaks={WAVEFORM_SAMPLE}
				variant={p.variant}
				duration={p.duration ?? DURATION}
				range={range}
				onRangeChange={setRange}
				position={position}
				onSeek={setPosition}
			>
				<WaveformTrimTrack />
				<WaveformTrimTimes />
			</WaveformTrim>
			<div className="flex justify-end">
				<Button variant="secondary" size="sm" onClick={() => setPlaying((on) => !on)}>
					{playing ? "Pause" : "Play selection"}
				</Button>
			</div>
		</div>
	);
}
