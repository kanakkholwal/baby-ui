"use client";

import { useState } from "react";
import { Composer } from "@baby-ui/react";

export function Example() {
	const [value, setValue] = useState("");

	return (
		<Composer
			value={value}
			onValueChange={setValue}
			placeholder="Ask anything…"
			onSubmit={(text) => console.log(text)}
		/>
	);
}
