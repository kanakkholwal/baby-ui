"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [value, setValue] = useState("");

	return (
		<Select value={value} onValueChange={setValue}>
			<SelectTrigger aria-label="Runtime">
				<SelectValue placeholder="Pick a runtime" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="node">Node 22</SelectItem>
				<SelectItem value="bun">Bun 1.2</SelectItem>
				<SelectItem value="deno" disabled>
					Deno 2
				</SelectItem>
			</SelectContent>
		</Select>
	);
}
