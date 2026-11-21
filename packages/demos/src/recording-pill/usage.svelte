<script lang="ts">
import {
	RecordingPill,
	RecordingPillCancel,
	RecordingPillIcon,
	RecordingPillLabel,
	RecordingPillMeter,
	RecordingPillTimer,
} from "@baby-ui/svelte";
</script>

<RecordingPill state="listening" level={0.4}>
	<RecordingPillIcon />
	<RecordingPillLabel>Listening</RecordingPillLabel>
	<RecordingPillMeter />
	<RecordingPillTimer seconds={42} />
	<RecordingPillCancel onclick={() => console.log("cancel")} />
</RecordingPill>
