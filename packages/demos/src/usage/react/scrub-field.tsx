"use client";

import { ScrubField } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [width, setWidth] = useState(324);

	return (
		<ScrubField label="W" value={width} onValueChange={setWidth} min={40} max={999} />
	);
}
