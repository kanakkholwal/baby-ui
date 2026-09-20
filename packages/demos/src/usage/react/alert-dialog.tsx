"use client";

import { AlertDialog, Button } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button variant="destructive" onClick={() => setOpen(true)}>
				Delete project
			</Button>
			<AlertDialog
				open={open}
				onOpenChange={setOpen}
				title="Delete this project?"
				description="Every deployment and build log goes with it. This cannot be undone."
				confirmLabel="Delete"
				destructive
				onConfirm={() => console.log("deleted")}
			/>
		</>
	);
}
