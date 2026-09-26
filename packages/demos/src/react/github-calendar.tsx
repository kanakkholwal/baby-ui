"use client";

import {
	GithubCalendar,
	type GithubCalendarShape,
	type GithubCalendarSize,
	type GithubCalendarTone,
	type GithubCalendarVariant,
	type GithubCalendarWeekStart,
} from "@baby-ui/react";
import { CONTRIBUTIONS } from "../data/contributions";

type Props = Record<string, unknown>;

export function GithubCalendarDemo({ props }: { props: Props }) {
	return (
		<GithubCalendar
			days={CONTRIBUTIONS}
			title="@baby-ui"
			locale="en-US"
			variant={(props.variant as GithubCalendarVariant) ?? "default"}
			shape={(props.shape as GithubCalendarShape) ?? "rounded"}
			size={(props.size as GithubCalendarSize) ?? "md"}
			tone={(props.tone as GithubCalendarTone) ?? "scale"}
			weekStart={(props.weekStart as GithubCalendarWeekStart) ?? "sunday"}
			showTotal={(props.showTotal as boolean) ?? true}
			showLegend={(props.showLegend as boolean) ?? true}
		/>
	);
}
