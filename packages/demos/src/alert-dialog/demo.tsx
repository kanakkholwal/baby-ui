"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";
import { BTN } from "../shared/dialogs";

type Props = Record<string, unknown>;

export function AlertDialogDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof AlertDialog>>(props);
	const pAction = controlProps<ComponentProps<typeof AlertDialogAction>>(props);
	const [done, setDone] = useState(false);
	return (
		<div className="flex flex-col items-center gap-3">
			<AlertDialog variant={p.variant ?? "default"}>
				<AlertDialogTrigger className={BTN}>Delete project</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete this project?</AlertDialogTitle>
						<AlertDialogDescription>
							This removes every deployment and cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							destructive={pAction.destructive ?? true}
							onClick={() => setDone(true)}
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			{done ? <p className="text-muted-foreground text-xs">Confirmed</p> : null}
		</div>
	);
}
