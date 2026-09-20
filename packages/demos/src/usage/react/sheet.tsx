"use client";

import { useState } from "react";
import { Button, Sheet } from "@baby-ui/react";

export function Example() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setOpen(true)}>Open sheet</Button>
			<Sheet open={open} onOpenChange={setOpen} side="right" title="Filters">
				<p className="text-muted-foreground text-sm">Anything can live in the panel.</p>
			</Sheet>
		</>
	);
}
