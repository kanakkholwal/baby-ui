"use client";

import { MusicPlayer } from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";
import { TRACKS } from "../data/tracks";

type Props = Record<string, unknown>;

export function MusicPlayerDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof MusicPlayer>>(props);
	const [index, setIndex] = useState(0);
	const [playing, setPlaying] = useState(p.playing ?? false);
	const [position, setPosition] = useState(0);
	const [volume, setVolume] = useState(Number(props.volume ?? 1));
	const track = TRACKS[index % TRACKS.length] as (typeof TRACKS)[number];
	const duration = track.duration;

	useEffect(() => setPlaying(p.playing ?? false), [p.playing]);
	useEffect(() => setVolume(Number(props.volume ?? 1)), [props.volume]);

	// Stands in for real playback: the demo, not the component, advances the playhead.
	useEffect(() => {
		if (!playing) return;
		const id = setInterval(() => setPosition((p) => Math.min(duration, p + 1)), 1000);
		return () => clearInterval(id);
	}, [playing, duration]);

	useEffect(() => {
		if (playing && position >= duration) setPlaying(false);
	}, [playing, position, duration]);

	const go = (step: number) => {
		setIndex((i) => (i + step + TRACKS.length) % TRACKS.length);
		setPosition(0);
	};

	return (
		<div className="w-full max-w-xl">
			<MusicPlayer
				{...track}
				layout={p.layout ?? "vinyl"}
				playing={playing}
				onPlayingChange={setPlaying}
				position={position}
				onPositionChange={setPosition}
				volume={volume}
				onVolumeChange={setVolume}
				onPrevious={() => go(-1)}
				onNext={() => go(1)}
			/>
		</div>
	);
}
