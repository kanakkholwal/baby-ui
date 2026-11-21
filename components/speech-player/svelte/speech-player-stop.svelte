<script lang="ts">
import Button from "../../button/svelte/button.svelte";
import { getSpeechPlayer } from "./context";
import Icon from "./speech-player-icon.svelte";

/** Stops and resets. Renders only when a handler is given and something is playing or paused. */
let { onclick, class: classProp }: { onclick?: () => void; class?: string } = $props();

const player = getSpeechPlayer();
</script>

{#if onclick && (player.state === "playing" || player.state === "paused")}
	<Button data-slot="speech-player-stop" size="icon" variant="ghost" aria-label="Stop" class={classProp} {onclick}>
		<Icon name="stop" />
	</Button>
{/if}
