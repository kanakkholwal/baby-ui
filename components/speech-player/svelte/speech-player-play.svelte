<script lang="ts">
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import { getSpeechPlayer } from "./context";
import Icon from "./speech-player-icon.svelte";

/** Play, pause or resume by state; a spinner while the voice is getting ready. */
let { onclick, class: classProp }: { onclick?: () => void; class?: string } = $props();

const player = getSpeechPlayer();
const playing = $derived(player.state === "playing");
</script>

<Button
	data-slot="speech-player-play"
	size="icon"
	variant="secondary"
	loading={player.state === "preparing"}
	loadingLabel="Getting the voice ready"
	aria-label={playing ? "Pause" : player.state === "paused" ? "Resume" : "Read aloud"}
	disabled={!onclick}
	class={cn("rounded-full", classProp)}
	{onclick}
>
	<Icon name={playing ? "pause" : "play"} />
</Button>
