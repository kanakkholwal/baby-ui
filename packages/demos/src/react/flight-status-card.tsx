import {
	type FlightStatus,
	FlightStatusCard,
	type FlightStatusDisplay,
	type FlightStatusTone,
} from "@baby-ui/react";
import { FLIGHT, flightRemaining } from "../data/flight";

type Props = Record<string, unknown>;

export function FlightStatusCardDemo({ props }: { props: Props }) {
	const progress = Number(props.progress ?? 45);
	return (
		<FlightStatusCard
			{...FLIGHT}
			departureCode={(props.departureCode as string) || "YYZ"}
			arrivalCode={(props.arrivalCode as string) || "HND"}
			status={(props.status as FlightStatus) ?? "departed"}
			progress={progress}
			remaining={flightRemaining(progress)}
			tone={(props.tone as FlightStatusTone) || undefined}
			display={(props.display as FlightStatusDisplay) ?? "matrix"}
		/>
	);
}
