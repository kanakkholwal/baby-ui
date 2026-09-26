"use client";

import {
	OgAuthorProfile,
	type OgAuthorProfileMode,
	type OgAuthorProfileTone,
} from "@baby-ui/react";
import { OG_AUTHOR_PROFILE } from "../data/og-samples";
import { OgFrame } from "./og-frame";

type Props = Record<string, unknown>;

export function OgAuthorProfileDemo({ props }: { props: Props }) {
	return (
		<OgFrame>
			<OgAuthorProfile
				{...OG_AUTHOR_PROFILE}
				name={(props.name as string) || "Ada Park"}
				role={(props.role as string) ?? undefined}
				bio={(props.bio as string) ?? undefined}
				handle={(props.handle as string) ?? undefined}
				site={(props.site as string) ?? undefined}
				mode={(props.mode as OgAuthorProfileMode) ?? "light"}
				tone={(props.tone as OgAuthorProfileTone) ?? "chart"}
			/>
		</OgFrame>
	);
}
