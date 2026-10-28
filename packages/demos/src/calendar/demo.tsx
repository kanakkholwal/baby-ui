"use client";

import { Calendar } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function CalendarDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Calendar>>(props);
	const [date, setDate] = useState<Date | undefined>(() => new Date());

	return (
		<Calendar
			mode="single"
			selected={date}
			onSelect={setDate}
			captionLayout={p.captionLayout ?? "dropdown"}
			size={p.size ?? "default"}
			className="rounded-lg border border-border"
		/>
	);
}
