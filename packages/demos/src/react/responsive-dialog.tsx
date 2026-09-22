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
	type ResponsiveDialogVariant,
} from "@baby-ui/react";
import { useState } from "react";

type Props = Record<string, unknown>;

const BTN =
	"inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm";

export function ResponsiveDialogDemo({ props }: { props: Props }) {
	const [open, setOpen] = useState(false);
	return (
		<div className="flex flex-col items-center gap-3">
			<ResponsiveDialog
				open={open}
				onOpenChange={setOpen}
				variant={(props.variant as ResponsiveDialogVariant) ?? "default"}
			>
				<ResponsiveDialogTrigger className={BTN}>Edit profile</ResponsiveDialogTrigger>
				<ResponsiveDialogContent>
					<ResponsiveDialogHeader>
						<ResponsiveDialogTitle>Edit profile</ResponsiveDialogTitle>
						<ResponsiveDialogDescription>
							Dialog on desktop, Drawer on mobile — the same markup renders both.
						</ResponsiveDialogDescription>
					</ResponsiveDialogHeader>
					<ResponsiveDialogFooter>
						<ResponsiveDialogClose className={BTN}>Cancel</ResponsiveDialogClose>
						<Button onClick={() => setOpen(false)}>Save</Button>
					</ResponsiveDialogFooter>
				</ResponsiveDialogContent>
			</ResponsiveDialog>
			<p className="text-muted-foreground text-xs">
				Resize below 768px (or open on a phone) to see it switch to a Drawer.
			</p>
		</div>
	);
}
