"use client";

import { useState } from "react";
import { Input, Label } from "@baby-ui/react";

export function Example() {
	const [value, setValue] = useState("");

	return (
		<div className="flex flex-col gap-1.5">
			<Label htmlFor="project">Project name</Label>
			<Input
				id="project"
				value={value}
				onChange={(e) => setValue(e.currentTarget.value)}
				placeholder="acme-web"
			/>
		</div>
	);
}
