"use client";

import {
	VoicePicker,
	VoicePickerRow,
	VoicePickerSample,
	VoicePickerSelect,
	VoicePickerSpeed,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";
import { VOICE_SAMPLES } from "../data/voices";

type Props = Record<string, unknown>;

export function VoicePickerDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof VoicePicker>>(props);
	const [sample, setSample] = useState<"idle" | "making" | "playing">("idle");
	const shown = p.sample ?? sample;

	// The demo plays the sample: a moment to make it, then a few seconds of audio.
	useEffect(() => {
		if (sample === "making") {
			const id = setTimeout(() => setSample("playing"), 900);
			return () => clearTimeout(id);
		}
		if (sample === "playing") {
			const id = setTimeout(() => setSample("idle"), 3000);
			return () => clearTimeout(id);
		}
	}, [sample]);

	return (
		<div className="w-full max-w-md">
			<VoicePicker voices={VOICE_SAMPLES} variant={p.variant} sample={shown}>
				<VoicePickerRow>
					<VoicePickerSelect />
					<VoicePickerSample
						onPlay={() => setSample("making")}
						onStop={() => setSample("idle")}
					/>
				</VoicePickerRow>
				<VoicePickerSpeed />
			</VoicePicker>
		</div>
	);
}
