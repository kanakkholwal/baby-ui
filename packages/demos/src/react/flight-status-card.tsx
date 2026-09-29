import { FlightStatusCard } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { FLIGHT, flightRemaining } from "../data/flight";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function FlightStatusCardDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof FlightStatusCard>>(props);
	const progress = Number(props.progress ?? 45);
	return (
		<FlightStatusCard
			{...FLIGHT}
			departureCode={p.departureCode || "YYZ"}
			arrivalCode={p.arrivalCode || "HND"}
			status={p.status ?? "departed"}
			progress={progress}
			remaining={flightRemaining(progress)}
			tone={p.tone || undefined}
			display={p.display ?? "matrix"}
		/>
	);
}
