import { LiveTranscript, LiveTranscriptBody, LiveTranscriptStatus } from "@baby-ui/react";

export function Example() {
	return (
		<LiveTranscript
			committed="Let's move the review to Thursday"
			tentative="afternoon and"
		>
			<LiveTranscriptBody>Say something to start.</LiveTranscriptBody>
			<LiveTranscriptStatus>Transcribing…</LiveTranscriptStatus>
		</LiveTranscript>
	);
}
