import { createContext, type Snippet } from "svelte";
import type { DialogSize, DialogVariant } from "./variants";

export type { DialogSize, DialogVariant };

export type DialogContext = {
	readonly size: DialogSize;
	readonly variant: DialogVariant;
	readonly dismissOnBackdrop: boolean;
	/** The footer hoists itself here so it can sit in the frame rim below the surface. */
	footer: { children?: Snippet; class?: string } | undefined;
};

export const [getDialog, setDialog] = createContext<DialogContext>();

/** Command's own CommandDialog still renders a native `<dialog>` (pending its own cmdk
 * migration), so it keeps using this rather than Dialog's own bits-ui-flavored classes. */
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

/** The backdrop fades in step with the panel; bits-ui owns the top layer and inertness. */
export const DIALOG_BACKDROP = [
	"fixed inset-0 z-50 bg-black/50 opacity-0 backdrop-blur-[2px]",
	"transition-opacity duration-[var(--duration-exit)] ease-[var(--ease-out)]",
	"data-[state=open]:opacity-100 data-[state=open]:duration-[var(--duration-overlay)]",
	"starting:data-[state=open]:opacity-0",
	"motion-reduce:transition-none",
].join(" ");

/** The panel scales and lifts. Only the closed state carries a transform, so nothing collides. */
export const DIALOG_PANEL = [
	"fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 overflow-visible outline-none",
	"transition-[opacity,scale,translate] duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
	"data-[state=closed]:opacity-0 data-[state=closed]:scale-[var(--enter-scale)]",
	"data-[state=closed]:translate-y-[calc(var(--enter-lift)-50%)] data-[state=closed]:duration-[var(--duration-exit)]",
	"starting:data-[state=open]:opacity-0 starting:data-[state=open]:scale-[var(--enter-scale)]",
	"starting:data-[state=open]:translate-y-[calc(var(--enter-lift)-50%)]",
	"motion-reduce:transition-none",
].join(" ");
