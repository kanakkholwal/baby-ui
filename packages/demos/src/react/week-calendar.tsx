"use client";

import { WeekCalendar } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function WeekCalendarDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof WeekCalendar>>(props);
	return (
		<WeekCalendar
			key={String(props.defaultExpanded ?? false)}
			defaultExpanded={p.defaultExpanded ?? false}
			weekStartsOn={p.weekStartsOn ?? 0}
			locale={p.locale ?? "en-US"}
			variant={p.variant ?? "card"}
		/>
	);
}
