"use client";

import { Composer } from "@baby-ui/react";
import { useState } from "react";

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
