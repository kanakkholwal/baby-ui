import {
	RecordingPill,
	RecordingPillCancel,
	RecordingPillIcon,
	RecordingPillLabel,
	RecordingPillMeter,
	RecordingPillTimer,
} from "@baby-ui/react";

export function Example() {
	return (
		<RecordingPill state="listening" level={0.4}>
			<RecordingPillIcon />
			<RecordingPillLabel>Listening</RecordingPillLabel>
			<RecordingPillMeter />
			<RecordingPillTimer seconds={42} />
			<RecordingPillCancel onClick={() => console.log("cancel")} />
		</RecordingPill>
	);
}
