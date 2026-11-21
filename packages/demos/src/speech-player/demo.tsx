"use client";

import {
	SpeechPlayer,
	SpeechPlayerControls,
	SpeechPlayerPlay,
	SpeechPlayerPosition,
	SpeechPlayerProgress,
	SpeechPlayerRate,
	SpeechPlayerSkip,
	SpeechPlayerStop,
	VoiceOrb,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function SpeechPlayerDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof SpeechPlayer>>(props);
	const count = p.count ?? 5;
	const [at, setAt] = useState(2);
	const [state, setState] = useState<"idle" | "preparing" | "playing" | "paused">(
		"playing",
	);
	const shown = p.state ?? state;
	const chunk = Math.min(p.at ?? at, count);

	// The demo plays the audio: a passage every two seconds while playing.
	useEffect(() => {
		if (state !== "playing") return;
		const id = setInterval(() => setAt((n) => (n >= count ? 1 : n + 1)), 2000);
		return () => clearInterval(id);
	}, [state, count]);

	return (
		<div className="grid w-full max-w-md gap-4">
			<div className="flex justify-center">
				<VoiceOrb size="sm" activity={shown === "playing" ? 0.55 : 0} />
			</div>
			<SpeechPlayer state={shown} variant={p.variant} at={chunk} count={count}>
				<SpeechPlayerControls>
					<SpeechPlayerSkip direction="previous" onClick={() => setAt(chunk - 1)} />
					<SpeechPlayerPlay
						onClick={() => setState(shown === "playing" ? "paused" : "playing")}
					/>
					<SpeechPlayerSkip direction="next" onClick={() => setAt(chunk + 1)} />
					<SpeechPlayerStop onClick={() => (setState("idle"), setAt(0))} />
					<SpeechPlayerPosition />
					<SpeechPlayerRate />
				</SpeechPlayerControls>
				<SpeechPlayerProgress shape="scrub" onSeek={setAt} />
			</SpeechPlayer>
		</div>
	);
}
