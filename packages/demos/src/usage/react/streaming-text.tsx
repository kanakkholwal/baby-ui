"use client";

import { StreamingText } from "@baby-ui/react";

export function Example() {
	return (
		<StreamingText
			content={"Pistachio is trending up this month."
				.split(" ")
				.map((text) => ({ text }))}
		/>
	);
}
