import { createContext } from "svelte";

export type SheetSide = "left" | "right" | "top" | "bottom";

export type SheetContext = {
	readonly open: boolean;
	readonly titleId: string;
	readonly descriptionId: string;
	setOpen: (open: boolean) => void;
};

export const [getSheet, setSheet] = createContext<SheetContext>();

export const SHEET_SIDE: Record<SheetSide, string> = {
	left: "inset-y-0 left-0 h-full w-[min(22rem,100vw)] border-r",
	right: "inset-y-0 right-0 h-full w-[min(22rem,100vw)] border-l",
	top: "inset-x-0 top-0 w-full max-h-[80vh] border-b",
	bottom: "inset-x-0 bottom-0 w-full max-h-[80vh] rounded-t-2xl border-t",
};
