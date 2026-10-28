"use client";

import { type DateRange, RangeCalendar } from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function RangeCalendarDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof RangeCalendar>>(props);
	const [range, setRange] = useState<DateRange | undefined>(() => {
		const from = new Date();
		return { from, to: new Date(from.getTime() + 5 * 86_400_000) };
	});

	// Two months side by side on wide screens, one on a phone.
	const [months, setMonths] = useState(2);
	useEffect(() => {
		const query = matchMedia("(min-width: 768px)");
		const sync = () => setMonths(query.matches ? 2 : 1);
		sync();
		query.addEventListener("change", sync);
		return () => query.removeEventListener("change", sync);
	}, []);

	return (
		<RangeCalendar
			selected={range}
			onSelect={setRange}
			numberOfMonths={months}
			size={p.size ?? "default"}
			className="rounded-lg border border-border"
		/>
	);
}
