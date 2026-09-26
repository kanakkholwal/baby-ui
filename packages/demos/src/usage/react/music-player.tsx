"use client";

import { MusicPlayer } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [playing, setPlaying] = useState(false);
	return (
		<MusicPlayer
			title="Northern Lights"
			artist="Aurora Hall"
			cover="https://picsum.photos/id/1040/480/480"
			duration={214}
			src="/audio/northern-lights.mp3"
			playing={playing}
			onPlayingChange={setPlaying}
		/>
	);
}
