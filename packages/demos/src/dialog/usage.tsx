"use client";

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>Invite</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<div className="min-w-0">
						<DialogTitle>Invite a teammate</DialogTitle>
						<DialogDescription>They get read access by default.</DialogDescription>
					</div>
					<DialogClose />
				</DialogHeader>
				<DialogFooter>
					<Button size="sm" onClick={() => setOpen(false)}>
						Send invite
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
