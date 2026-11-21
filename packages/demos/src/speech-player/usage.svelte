<script lang="ts">
import {
	SpeechPlayer,
	SpeechPlayerControls,
	SpeechPlayerPlay,
	SpeechPlayerPosition,
	SpeechPlayerProgress,
	SpeechPlayerRate,
	SpeechPlayerSkip,
} from "@baby-ui/svelte";
</script>

<SpeechPlayer state="playing" at={2} count={5}>
	<SpeechPlayerControls>
		<SpeechPlayerSkip direction="previous" onclick={() => console.log("previous")} />
		<SpeechPlayerPlay onclick={() => console.log("pause")} />
		<SpeechPlayerSkip direction="next" onclick={() => console.log("next")} />
		<SpeechPlayerPosition />
		<SpeechPlayerRate />
	</SpeechPlayerControls>
	<SpeechPlayerProgress />
</SpeechPlayer>
