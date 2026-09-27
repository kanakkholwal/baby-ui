import { NumberInput } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [seats, setSeats] = useState<number | null>(5);
	return (
		<NumberInput label="Seats" value={seats} onValueChange={setSeats} min={1} max={50} />
	);
}
