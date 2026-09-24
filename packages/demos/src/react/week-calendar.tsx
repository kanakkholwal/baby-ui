"use client";

import {
	WeekCalendar,
	type WeekCalendarVariant,
	type WeekStartsOn,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function WeekCalendarDemo({ props }: { props: Props }) {
	return (
		<WeekCalendar
			key={String(props.defaultExpanded ?? false)}
			defaultExpanded={Boolean(props.defaultExpanded ?? false)}
			weekStartsOn={Number(props.weekStartsOn ?? 0) as WeekStartsOn}
			locale={(props.locale as string) ?? "en-US"}
			variant={(props.variant as WeekCalendarVariant) ?? "card"}
		/>
	);
}
