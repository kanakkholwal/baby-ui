import { FlightStatusCard } from "@baby-ui/react";

export function Example() {
	return (
		<FlightStatusCard
			flight="AC 001"
			departureCode="YYZ"
			departureCity="Toronto"
			departureTime="Mon, 6:14 PM"
			arrivalCode="HND"
			arrivalCity="Tokyo"
			arrivalTime="Tue, 7:14 AM"
			status="departed"
			progress={45}
			remaining="-7H 01M"
		/>
	);
}
