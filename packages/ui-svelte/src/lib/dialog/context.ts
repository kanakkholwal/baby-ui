import { createContext } from "svelte";

export type DialogSize = "sm" | "md" | "lg" | "xl";

export type DialogContext = {
	readonly open: boolean;
	readonly titleId: string;
	readonly descriptionId: string;
	readonly size: DialogSize;
	readonly dismissOnBackdrop: boolean;
	setOpen: (open: boolean) => void;
};

export const [getDialog, setDialog] = createContext<DialogContext>();

export const DIALOG_WIDTH: Record<DialogSize, string> = {
	sm: "max-w-sm",
	md: "max-w-lg",
	lg: "max-w-2xl",
	xl: "max-w-4xl",
};
