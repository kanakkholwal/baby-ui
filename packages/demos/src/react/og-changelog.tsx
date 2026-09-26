"use client";

import { OgChangelog, type OgChangelogMode, type OgChangelogTone } from "@baby-ui/react";
import { OG_CHANGELOG } from "../data/og-samples";
import { OgFrame } from "./og-frame";

type Props = Record<string, unknown>;

export function OgChangelogDemo({ props }: { props: Props }) {
	return (
		<OgFrame>
			<OgChangelog
				{...OG_CHANGELOG}
				version={(props.version as string) || "v2.4.0"}
				headline={
					(props.headline as string) || "Charts land, dialogs grow from their trigger"
				}
				site={(props.site as string) || "baby ui"}
				date={(props.date as string) ?? undefined}
				mode={(props.mode as OgChangelogMode) ?? "light"}
				tone={(props.tone as OgChangelogTone) ?? "chart"}
			/>
		</OgFrame>
	);
}
