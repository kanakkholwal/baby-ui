import { createContext } from "svelte";
import type { SheetSide } from "./variants";

export type { SheetSide };

export type SheetContext = {
	readonly open: boolean;
	readonly titleId: string;
	readonly descriptionId: string;
	setOpen: (open: boolean) => void;
};

export const [getSheet, setSheet] = createContext<SheetContext>();

/** Visibility, delayed by the exit, is what keeps a non-dialog overlay on screen to slide out. */
export const SHEET_OVERLAY = [
	"fixed inset-0 z-50 transition-[visibility] duration-0",
	"data-[state=closed]:invisible data-[state=closed]:delay-[var(--duration-overlay)]",
].join(" ");

export const SHEET_VEIL = [
	"absolute inset-0 bg-black/50 transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
	"data-[state=closed]:opacity-0 data-[state=closed]:duration-[var(--duration-exit)]",
	"starting:data-[state=open]:opacity-0",
].join(" ");
