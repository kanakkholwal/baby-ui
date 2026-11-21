<script lang="ts">
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import { formatRate, nextRate, SPEECH_RATES } from "../chunks";
import { speechPlayer } from "../variants";
import { getSpeechPlayer } from "./context";

/** Speaking speed in one button: each press moves to the next speed and wraps around. */
let { rates = SPEECH_RATES, class: classProp }: { rates?: number[]; class?: string } =
	$props();

const player = getSpeechPlayer();
</script>

<Button
	data-slot="speech-player-rate"
	variant="ghost"
	size="sm"
	aria-label={`Speaking speed ${formatRate(player.rate)}. Press to change.`}
	class={cn(speechPlayer().rate(), classProp)}
	onclick={() => (player.rate = nextRate(player.rate, rates))}
>
	{formatRate(player.rate)}
</Button>
