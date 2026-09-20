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

/** Only the closed state translates, so the open state needs no competing utility. */
export const SHEET_PANEL = [
	"absolute flex flex-col gap-4 overflow-y-auto border-border bg-background p-6",
	"transition-transform duration-[var(--duration-drawer)] ease-[var(--ease-drawer)]",
	"data-[state=closed]:duration-[var(--duration-overlay)]",
	"data-[state=closed]:data-[side=left]:-translate-x-full",
	"data-[state=closed]:data-[side=right]:translate-x-full",
	"data-[state=closed]:data-[side=top]:-translate-y-full",
	"data-[state=closed]:data-[side=bottom]:translate-y-full",
	"starting:data-[state=open]:data-[side=left]:-translate-x-full",
	"starting:data-[state=open]:data-[side=right]:translate-x-full",
	"starting:data-[state=open]:data-[side=top]:-translate-y-full",
	"starting:data-[state=open]:data-[side=bottom]:translate-y-full",
	"motion-reduce:transition-none",
].join(" ");
