<script lang="ts">
import {
	VoicePicker,
	VoicePickerRow,
	VoicePickerSample,
	VoicePickerSelect,
	VoicePickerSpeed,
} from "@baby-ui/svelte";

const voices = [
	{ id: "amber", name: "Amber", detail: "British, warm" },
	{ id: "river", name: "River", detail: "American, calm" },
];
</script>

<VoicePicker {voices}>
	<VoicePickerRow>
		<VoicePickerSelect />
		<VoicePickerSample onplay={() => console.log("play sample")} />
	</VoicePickerRow>
	<VoicePickerSpeed />
</VoicePicker>
