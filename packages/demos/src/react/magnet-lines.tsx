"use client";

import { MagnetLines, type MagnetLinesSize, type MagnetLinesTone } from "@baby-ui/react";

type Props = Record<string, unknown>;

export function MagnetLinesDemo({ props }: { props: Props }) {
	return (
		<MagnetLines
			rows={Number(props.rows ?? 9)}
			columns={Number(props.columns ?? 9)}
			size={(props.size as MagnetLinesSize) ?? "md"}
			tone={(props.tone as MagnetLinesTone) ?? "muted"}
			baseAngle={Number(props.baseAngle ?? 0)}
		/>
	);
}
