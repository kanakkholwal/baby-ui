"use client";

import { useState } from "react";
import { Tabs } from "@baby-ui/react";

const tabs = [
	{ id: "overview", label: "Overview" },
	{ id: "activity", label: "Activity" },
	{ id: "settings", label: "Settings" },
];

export function Example() {
	const [value, setValue] = useState("overview");

	return (
		<Tabs
			tabs={tabs}
			value={value}
			onValueChange={setValue}
			panel={(active) => <p className="text-muted-foreground text-sm">Showing {active}.</p>}
		/>
	);
}
