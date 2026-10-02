"use client";

import { NpmStats } from "@baby-ui/react";
import { useState } from "react";
import { DEMO_NPM_PACKAGES } from "../../data/npm-stats";

export function Example() {
	const [packages] = useState(DEMO_NPM_PACKAGES);
	return (
		<div className="w-full max-w-4xl">
			<NpmStats packages={packages} locale="en-US" />
		</div>
	);
}
