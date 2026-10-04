"use client";

import {
	Avatar,
	AvatarFallback,
	Button,
	VideoPlayer,
	VideoPlayerContent,
	VideoPlayerControlBar,
	VideoPlayerEndScreen,
	VideoPlayerError,
	VideoPlayerFullscreenButton,
	VideoPlayerLoadingIndicator,
	VideoPlayerLoopButton,
	VideoPlayerPipButton,
	VideoPlayerPlayButton,
	VideoPlayerPlaybackRate,
	VideoPlayerQuality,
	VideoPlayerSeekBackwardButton,
	VideoPlayerSeekForwardButton,
	VideoPlayerTimeDisplay,
	VideoPlayerTimeRange,
	VideoPlayerViewport,
	VideoPlayerVolume,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { SAMPLE_VIDEO } from "../data/media";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function VideoPlayerDemo({ props }: { props: Props }) {
	const p = controlProps<
		ComponentProps<typeof VideoPlayer> &
			ComponentProps<typeof VideoPlayerTimeDisplay> &
			ComponentProps<typeof VideoPlayerEndScreen>
	>(props);
	const variant = p.variant ?? "default";
	const overVideo = variant === "overlay" || variant === "cinema";
	const [loop, setLoop] = useState(Boolean(props.loop));
	const [muted, setMuted] = useState(Boolean(props.muted));
	const [volume, setVolume] = useState(Number(props.volume ?? 1));
	const [playbackRate, setPlaybackRate] = useState(Number(props.playbackRate ?? 1));

	useEffect(() => setLoop(Boolean(props.loop)), [props.loop]);
	useEffect(() => setMuted(Boolean(props.muted)), [props.muted]);
	useEffect(() => setVolume(Number(props.volume ?? 1)), [props.volume]);
	useEffect(() => setPlaybackRate(Number(props.playbackRate ?? 1)), [props.playbackRate]);

	return (
		<div className="w-full max-w-2xl">
			<VideoPlayer
				variant={variant}
				loop={loop}
				onLoopChange={setLoop}
				muted={muted}
				onMutedChange={setMuted}
				volume={volume}
				onVolumeChange={setVolume}
				playbackRate={playbackRate}
				onPlaybackRateChange={setPlaybackRate}
			>
				<VideoPlayerViewport>
					<VideoPlayerContent src={SAMPLE_VIDEO} crossOrigin="anonymous" />
					{overVideo ? <VideoPlayerPlayButton size="lg" /> : null}
					<VideoPlayerLoadingIndicator />
					<VideoPlayerError />
					<VideoPlayerEndScreen when={p.when ?? "ended"}>
						<div className="flex items-center gap-2 text-sm">
							<Avatar size="sm">
								<AvatarFallback>BF</AvatarFallback>
							</Avatar>
							<span className="opacity-80">
								<span className="font-semibold opacity-100">Blender Foundation</span>{" "}
								shared a video
							</span>
						</div>
						<VideoPlayerPlayButton size="lg" />
						<p className="font-semibold text-xl">Big Buck Bunny</p>
						<Button
							size="sm"
							href="https://peach.blender.org"
							target="_blank"
							rel="noreferrer"
						>
							Watch the making-of
						</Button>
					</VideoPlayerEndScreen>
				</VideoPlayerViewport>
				<VideoPlayerControlBar>
					<VideoPlayerPlayButton />
					{variant === "cinema" ? (
						<>
							<VideoPlayerSeekBackwardButton />
							<VideoPlayerSeekForwardButton />
						</>
					) : null}
					<VideoPlayerTimeRange />
					<VideoPlayerTimeDisplay
						showDuration={p.showDuration ?? true}
						remaining={p.remaining ?? false}
					/>
					<VideoPlayerVolume />
					<VideoPlayerPlaybackRate />
					<VideoPlayerQuality />
					<VideoPlayerLoopButton />
					{variant === "cinema" ? <VideoPlayerPipButton /> : null}
					<VideoPlayerFullscreenButton />
				</VideoPlayerControlBar>
			</VideoPlayer>
		</div>
	);
}
