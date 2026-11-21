<script lang="ts">
import { SPEECH_PLAYER_ICONS, type SpeechPlayerIcon } from "../chunks";

let { name }: { name: SpeechPlayerIcon } = $props();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.8"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<path d={SPEECH_PLAYER_ICONS[name]} />
</svg>
