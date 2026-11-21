<script lang="ts">
import { WaveformTrim, WaveformTrimTimes, WaveformTrimTrack } from "@baby-ui/svelte";

const peaks = [0.2, 0.5, 0.8, 0.4, 0.9, 0.6, 0.3, 0.7, 0.5, 0.2];
let range = $state<[number, number]>([0.1, 0.9]);
</script>

<WaveformTrim {peaks} duration={12} bind:range>
	<WaveformTrimTrack />
	<WaveformTrimTimes />
</WaveformTrim>
