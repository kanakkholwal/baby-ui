import { createContext } from "svelte";

export type AlertDialogContext = {
	readonly open: boolean;
	readonly titleId: string;
	readonly descriptionId: string;
	setOpen: (open: boolean) => void;
	setCancel: (el: HTMLElement | undefined) => void;
};

export const [getAlertDialog, setAlertDialog] = createContext<AlertDialogContext>();
