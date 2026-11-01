"use client";

import { Composer, ComposerInput, ComposerSubmit, ComposerToolbar } from "@baby-ui/react";
import { useState } from "react";

export function Example({ send }: { send: (text: string) => void }) {
	const [value, setValue] = useState("");
	return (
		<Composer value={value} onValueChange={setValue} onSubmit={send}>
			<ComposerInput placeholder="Ask anything…" />
			<ComposerToolbar>
				<ComposerSubmit />
			</ComposerToolbar>
		</Composer>
	);
}
