<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { speechPlayer } from "../variants";
import { getSpeechPlayer } from "./context";

/** "2 of 5"; children replace it. */
let { class: classProp, children }: { class?: string; children?: Snippet } = $props();

const player = getSpeechPlayer();
const position = $derived(speechPlayer({ state: player.state }).position());
</script>

<span data-slot="speech-player-position" aria-live="polite" class={cn(position, classProp)}>
	{#if children}
		{@render children()}
	{:else if player.count > 1 && player.at > 0}
		{player.at} of {player.count}
	{/if}
</span>
