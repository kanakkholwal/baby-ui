<script lang="ts">
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
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { SAMPLE_VIDEO } from "../data/media";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(
	controlProps<
		ComponentProps<typeof VideoPlayer> &
			ComponentProps<typeof VideoPlayerTimeDisplay> &
			ComponentProps<typeof VideoPlayerEndScreen>
	>(props),
);
const variant = $derived(p.variant ?? "default");
const overVideo = $derived(variant === "overlay" || variant === "cinema");

let loop = $state(false);
let muted = $state(false);
let volume = $state(1);
let playbackRate = $state(1);

$effect(() => {
	loop = Boolean(props.loop);
});
$effect(() => {
	muted = Boolean(props.muted);
});
$effect(() => {
	volume = Number(props.volume ?? 1);
});
$effect(() => {
	playbackRate = Number(props.playbackRate ?? 1);
});
</script>

<div class="w-full max-w-2xl">
	<VideoPlayer {variant} bind:loop bind:muted bind:volume bind:playbackRate>
		<VideoPlayerViewport>
			<VideoPlayerContent src={SAMPLE_VIDEO} crossorigin="anonymous" />
			{#if overVideo}
				<VideoPlayerPlayButton size="lg" />
			{/if}
			<VideoPlayerLoadingIndicator />
			<VideoPlayerError />
			<VideoPlayerEndScreen when={p.when ?? "ended"}>
				<div class="flex items-center gap-2 text-sm">
					<Avatar size="sm">
						<AvatarFallback>BF</AvatarFallback>
					</Avatar>
					<span class="opacity-80">
						<span class="font-semibold opacity-100">Blender Foundation</span> shared a video
					</span>
				</div>
				<VideoPlayerPlayButton size="lg" />
				<p class="font-semibold text-xl">Big Buck Bunny</p>
				<Button size="sm" href="https://peach.blender.org" target="_blank" rel="noreferrer">
					Watch the making-of
				</Button>
			</VideoPlayerEndScreen>
		</VideoPlayerViewport>
		<VideoPlayerControlBar>
			<VideoPlayerPlayButton />
			{#if variant === "cinema"}
				<VideoPlayerSeekBackwardButton />
				<VideoPlayerSeekForwardButton />
			{/if}
			<VideoPlayerTimeRange />
			<VideoPlayerTimeDisplay
				showDuration={p.showDuration ?? true}
				remaining={p.remaining ?? false}
			/>
			<VideoPlayerVolume />
			<VideoPlayerPlaybackRate />
			<VideoPlayerQuality />
			<VideoPlayerLoopButton />
			{#if variant === "cinema"}
				<VideoPlayerPipButton />
			{/if}
			<VideoPlayerFullscreenButton />
		</VideoPlayerControlBar>
	</VideoPlayer>
</div>
