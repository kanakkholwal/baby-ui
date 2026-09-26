export const FLIGHT = {
	flight: "AC 001",
	departureCity: "Toronto",
	arrivalCity: "Tokyo",
	departureTime: "Mon, 6:14 PM",
	arrivalTime: "Tue, 7:14 AM",
	eta: "ETA 2:15 PM",
	etaNote: "Tokyo time",
	nextEvent: "Dinner in 2:34h",
};

/** "-7H 01M" style countdown for a 13h flight at `progress` percent. */
export function flightRemaining(progress: number): string {
	const left = Math.round((13 * 60 * (100 - progress)) / 100);
	return `-${Math.floor(left / 60)}H ${String(left % 60).padStart(2, "0")}M`;
}
