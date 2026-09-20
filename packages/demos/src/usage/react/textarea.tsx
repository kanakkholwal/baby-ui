"use client";

import { useState } from "react";
import { Label, Textarea } from "@baby-ui/react";

export function Example() {
	const [value, setValue] = useState("");

	return (
		<div className="flex flex-col gap-1.5">
			<Label htmlFor="notes">Release notes</Label>
			<Textarea
				id="notes"
				value={value}
				onChange={(e) => setValue(e.currentTarget.value)}
				rows={3}
				autoGrow
			/>
		</div>
	);
}
