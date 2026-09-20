"use client";

import { Button, Modal } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Modal
				open={open}
				onOpenChange={setOpen}
				title="Invite a teammate"
				description="They get read access by default."
				footer={
					<Button size="sm" onClick={() => setOpen(false)}>
						Send invite
					</Button>
				}
			>
				<p className="text-muted-foreground text-sm">
					Send an invite link to their work email.
				</p>
			</Modal>
		</>
	);
}
