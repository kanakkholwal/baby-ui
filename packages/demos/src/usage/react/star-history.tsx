"use client";

import { StarHistory } from "@baby-ui/react";
import { useState } from "react";
import { DEMO_STAR_HISTORIES_LIST } from "../../data/star-history";

export function Example() {
	const [history] = useState(DEMO_STAR_HISTORIES_LIST[0]);
	if (!history) return null;
	return (
		<div className="w-full max-w-4xl">
			<StarHistory history={history} locale="en-US" />
		</div>
	);
}
