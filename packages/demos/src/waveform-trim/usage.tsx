import { WaveformTrim, WaveformTrimTimes, WaveformTrimTrack } from "@baby-ui/react";
import { useState } from "react";

const peaks = [0.2, 0.5, 0.8, 0.4, 0.9, 0.6, 0.3, 0.7, 0.5, 0.2];

export function Example() {
	const [range, setRange] = useState<[number, number]>([0.1, 0.9]);
	return (
		<WaveformTrim peaks={peaks} duration={12} range={range} onRangeChange={setRange}>
			<WaveformTrimTrack />
			<WaveformTrimTimes />
		</WaveformTrim>
	);
}
