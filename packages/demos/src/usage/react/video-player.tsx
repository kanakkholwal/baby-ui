import {
	VideoPlayer,
	VideoPlayerContent,
	VideoPlayerControlBar,
	VideoPlayerError,
	VideoPlayerFullscreenButton,
	VideoPlayerLoadingIndicator,
	VideoPlayerPlayButton,
	VideoPlayerPlaybackRate,
	VideoPlayerTimeDisplay,
	VideoPlayerTimeRange,
	VideoPlayerViewport,
	VideoPlayerVolume,
} from "@baby-ui/react";

export function Example() {
	return (
		<VideoPlayer variant="cinema">
			<VideoPlayerViewport>
				<VideoPlayerContent src="/lesson.m3u8" />
				<VideoPlayerPlayButton size="lg" />
				<VideoPlayerLoadingIndicator />
				<VideoPlayerError />
			</VideoPlayerViewport>
			<VideoPlayerControlBar>
				<VideoPlayerPlayButton />
				<VideoPlayerTimeRange />
				<VideoPlayerTimeDisplay />
				<VideoPlayerVolume />
				<VideoPlayerPlaybackRate rates={[1, 1.5, 2]} />
				<VideoPlayerFullscreenButton />
			</VideoPlayerControlBar>
		</VideoPlayer>
	);
}
