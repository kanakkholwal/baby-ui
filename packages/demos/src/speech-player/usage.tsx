import {
	SpeechPlayer,
	SpeechPlayerControls,
	SpeechPlayerPlay,
	SpeechPlayerPosition,
	SpeechPlayerProgress,
	SpeechPlayerRate,
	SpeechPlayerSkip,
} from "@baby-ui/react";

export function Example() {
	return (
		<SpeechPlayer state="playing" at={2} count={5}>
			<SpeechPlayerControls>
				<SpeechPlayerSkip direction="previous" onClick={() => console.log("previous")} />
				<SpeechPlayerPlay onClick={() => console.log("pause")} />
				<SpeechPlayerSkip direction="next" onClick={() => console.log("next")} />
				<SpeechPlayerPosition />
				<SpeechPlayerRate />
			</SpeechPlayerControls>
			<SpeechPlayerProgress />
		</SpeechPlayer>
	);
}
