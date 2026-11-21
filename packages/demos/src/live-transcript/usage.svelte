<script lang="ts">
import {
	LiveTranscript,
	LiveTranscriptBody,
	LiveTranscriptStatus,
} from "@baby-ui/svelte";
</script>

<LiveTranscript committed="Let's move the review to Thursday" tentative="afternoon and">
	<LiveTranscriptBody>Say something to start.</LiveTranscriptBody>
	<LiveTranscriptStatus>Transcribing…</LiveTranscriptStatus>
</LiveTranscript>
