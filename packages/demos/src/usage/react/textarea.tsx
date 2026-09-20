"use client";

import { Textarea } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [value, setValue] = useState("");

	return (
		<Textarea
			value={value}
			onChange={(e) => setValue(e.currentTarget.value)}
			label="Release notes"
			description="Markdown is supported."
			rows={3}
			maxLength={280}
			showCount
			autoGrow
		/>
	);
}
