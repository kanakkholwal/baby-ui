import {
	VoicePicker,
	VoicePickerRow,
	VoicePickerSample,
	VoicePickerSelect,
	VoicePickerSpeed,
} from "@baby-ui/react";

const voices = [
	{ id: "amber", name: "Amber", detail: "British, warm" },
	{ id: "river", name: "River", detail: "American, calm" },
];

export function Example() {
	return (
		<VoicePicker voices={voices}>
			<VoicePickerRow>
				<VoicePickerSelect />
				<VoicePickerSample onPlay={() => console.log("play sample")} />
			</VoicePickerRow>
			<VoicePickerSpeed />
		</VoicePicker>
	);
}
