<script lang="ts">
import Button from "../../button/svelte/button.svelte";
import { canSkip } from "../chunks";
import { getSpeechPlayer } from "./context";
import Icon from "./speech-player-icon.svelte";

/** Skips a chunk (a sentence or paragraph) back or forward; disabled at the ends. */
let {
	direction,
	onclick,
	class: classProp,
}: { direction: "previous" | "next"; onclick?: () => void; class?: string } = $props();

const player = getSpeechPlayer();
</script>

<Button
	data-slot={`speech-player-${direction}`}
	size="icon"
	variant="ghost"
	aria-label={direction === "previous" ? "Previous passage" : "Next passage"}
	disabled={!onclick || !canSkip(player.at, player.count, direction === "previous" ? -1 : 1)}
	class={classProp}
	{onclick}
>
	<Icon name={direction} />
</Button>
