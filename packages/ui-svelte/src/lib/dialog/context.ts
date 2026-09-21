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

/** The <dialog> itself fades with its backdrop; allow-discrete keeps it on screen to exit. */
export const DIALOG_SURFACE = [
	"m-auto overflow-visible bg-transparent p-0 text-foreground opacity-0",
	"transition-[opacity,display,overlay] transition-discrete duration-[var(--duration-exit)] ease-[var(--ease-out)]",
	"open:opacity-100 open:duration-[var(--duration-overlay)] starting:open:opacity-0",
	"backdrop:bg-black/50 backdrop:opacity-0 backdrop:backdrop-blur-[2px]",
	"backdrop:transition-[opacity,display,overlay] backdrop:transition-discrete",
	"backdrop:duration-[var(--duration-exit)] backdrop:ease-[var(--ease-out)]",
	"open:backdrop:opacity-100 open:backdrop:duration-[var(--duration-overlay)]",
	"starting:open:backdrop:opacity-0",
].join(" ");

/** The panel scales and lifts. Only the closed state carries a transform, so nothing collides. */
export const DIALOG_PANEL = [
	"transition-[opacity,scale,translate] duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
	"data-[state=closed]:opacity-0 data-[state=closed]:scale-[var(--enter-scale)]",
	"data-[state=closed]:translate-y-[var(--enter-lift)] data-[state=closed]:duration-[var(--duration-exit)]",
	"starting:data-[state=open]:opacity-0 starting:data-[state=open]:scale-[var(--enter-scale)]",
	"starting:data-[state=open]:translate-y-[var(--enter-lift)]",
	"motion-reduce:transition-none",
].join(" ");
