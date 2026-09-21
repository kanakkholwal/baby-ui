import { createContext, type Snippet } from "svelte";

export type AlertDialogContext = {
	readonly open: boolean;
	readonly titleId: string;
	readonly descriptionId: string;
	setOpen: (open: boolean) => void;
	setCancel: (el: HTMLElement | undefined) => void;
	/** The footer hoists itself here so it can sit in the frame rim below the surface. */
	footer: { children?: Snippet; class?: string } | undefined;
};

export const [getAlertDialog, setAlertDialog] = createContext<AlertDialogContext>();
