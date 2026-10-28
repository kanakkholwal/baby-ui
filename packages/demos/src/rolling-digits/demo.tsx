"use client";

import { RollingDigits } from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const ROLLING_VALUES = [128400, 131250, 129600, 145000, 987000, 1024000];

export function RollingDigitsDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof RollingDigits>>(props);
	const [step, setStep] = useState(0);
	useEffect(() => {
		const id = setInterval(() => setStep((s) => (s + 1) % ROLLING_VALUES.length), 1800);
		return () => clearInterval(id);
	}, []);
	return (
		<div className="text-5xl">
			<RollingDigits
				value={ROLLING_VALUES[step] ?? 0}
				pad={props.pad === undefined ? undefined : Number(props.pad)}
				locale={p.locale || undefined}
				startOnView={props.startOnView !== false}
				stepMs={Number(props.stepMs ?? 80)}
				variant={p.variant ?? "roll"}
				durationMs={props.durationMs === undefined ? undefined : Number(props.durationMs)}
				coalesce={props.coalesce === true}
				direction={p.direction ?? "dynamic"}
				offset={Number(props.offset ?? 32)}
				size={p.size ?? "inherit"}
				className="font-semibold text-foreground tracking-tight"
			/>
		</div>
	);
}
