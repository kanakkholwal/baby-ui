"use client";

import {
	Button,
	ResponsiveDialog,
	ResponsiveDialogClose,
	ResponsiveDialogContent,
	ResponsiveDialogDescription,
	ResponsiveDialogFooter,
	ResponsiveDialogHeader,
	ResponsiveDialogTitle,
	ResponsiveDialogTrigger,
} from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [open, setOpen] = useState(false);

	return (
		<ResponsiveDialog open={open} onOpenChange={setOpen}>
			<ResponsiveDialogTrigger>Edit profile</ResponsiveDialogTrigger>
			<ResponsiveDialogContent>
				<ResponsiveDialogHeader>
					<ResponsiveDialogTitle>Edit profile</ResponsiveDialogTitle>
					<ResponsiveDialogDescription>
						Dialog on desktop, Drawer on mobile.
					</ResponsiveDialogDescription>
				</ResponsiveDialogHeader>
				<ResponsiveDialogFooter>
					<ResponsiveDialogClose>Cancel</ResponsiveDialogClose>
					<Button onClick={() => setOpen(false)}>Save</Button>
				</ResponsiveDialogFooter>
			</ResponsiveDialogContent>
		</ResponsiveDialog>
	);
}
