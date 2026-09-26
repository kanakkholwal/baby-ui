/** Sample flights for the split-flap-display demos: [time, destination, gate]. */
const FLIGHTS = [
	["09:15", "LISBON", "A4"],
	["09:40", "TOKYO", "B12"],
	["10:05", "SEOUL", "C7"],
	["10:20", "OSLO", "A9"],
	["10:45", "MADRID", "D2"],
	["11:10", "BOSTON", "B3"],
	["11:30", "DUBAI", "C14"],
	["12:00", "ZURICH", "A1"],
] as const;

const STATUSES = ["BOARD", "OPEN", "DELAY", "FINAL", "CLOSED", "LATE"];

export const DEPARTURE_LINES = [
	"NOW BOARDING",
	"GATE B12",
	"FINAL CALL",
	"DEPARTED 09:40",
];

function line(
	time: string,
	dest: string,
	gate: string,
	status: string,
	columns: number,
): string {
	const destWidth = Math.max(1, columns - 18);
	return `${time.padEnd(5)} ${dest.slice(0, destWidth).padEnd(destWidth)} ${gate.padEnd(4)} ${status}`;
}

/** Board text for a demo tick: a header plus four or five rows, alternating so rows open and close. */
export function departuresBoard(tick: number, columns: number): string {
	const count = tick % 2 === 0 ? 4 : 5;
	const rows = Array.from({ length: count }, (_, i) => {
		const [time, dest, gate] = FLIGHTS[(tick + i) % FLIGHTS.length] ?? FLIGHTS[0];
		return line(
			time,
			dest,
			gate,
			STATUSES[(tick + i * 2) % STATUSES.length] ?? "",
			columns,
		);
	});
	return [line("TIME", "DEST", "GATE", "STATUS", columns), ...rows].join("\n");
}

export function departuresLine(tick: number): string {
	return DEPARTURE_LINES[tick % DEPARTURE_LINES.length] ?? "";
}
