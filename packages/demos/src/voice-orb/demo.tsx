"use client";

import { Button, VoiceOrb } from "@baby-ui/react";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function VoiceOrbDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof VoiceOrb>>(props);
	// The demo fakes a voice: bursts of syllables while "speaking", near silence otherwise.
	const [speaking, setSpeaking] = useState(true);
	const [activity, setActivity] = useState(0);
	const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
	const stream = useRef<MediaStream | null>(null);

	useEffect(() => {
		if (!speaking || analyser) {
			setActivity(0);
			return;
		}
		let frame = 0;
		const tick = (now: number) => {
			const syllable = Math.max(0, Math.sin(now / 140) * Math.sin(now / 410));
			setActivity(Math.min(1, syllable * 0.9 + Math.random() * 0.08));
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [speaking, analyser]);

	useEffect(
		() => () => {
			for (const track of stream.current?.getTracks() ?? []) track.stop();
		},
		[],
	);

	const toggleMic = async () => {
		if (analyser) {
			for (const track of stream.current?.getTracks() ?? []) track.stop();
			setAnalyser(null);
			return;
		}
		stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
		const context = new AudioContext();
		const node = context.createAnalyser();
		node.fftSize = 1024;
		context.createMediaStreamSource(stream.current).connect(node);
		setAnalyser(node);
	};

	return (
		<div className="flex flex-col items-center gap-5">
			<VoiceOrb
				activity={activity}
				analyser={analyser}
				variant={p.variant}
				size={p.size ?? "lg"}
				label={
					analyser
						? "Listening"
						: speaking
							? "Assistant is speaking"
							: "Assistant is idle"
				}
			/>
			<p className="m-0 text-muted-foreground text-sm" aria-live="polite">
				{analyser ? "Listening to your microphone" : speaking ? "Speaking" : "Idle"}
			</p>
			<div className="flex gap-2">
				<Button
					size="sm"
					variant="secondary"
					className="rounded-full"
					disabled={!!analyser}
					onClick={() => setSpeaking((s) => !s)}
				>
					{speaking ? "Stop speaking" : "Speak"}
				</Button>
				<Button size="sm" variant="ghost" className="rounded-full" onClick={toggleMic}>
					{analyser ? "Stop microphone" : "Use microphone"}
				</Button>
			</div>
		</div>
	);
}
