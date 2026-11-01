"use client";

import { VoiceOrb } from "@baby-ui/react";

export function Example({ level, speaking }: { level: number; speaking: boolean }) {
	return (
		<VoiceOrb
			activity={level}
			active={speaking}
			label={speaking ? "Assistant is speaking" : "Assistant is idle"}
		/>
	);
}
