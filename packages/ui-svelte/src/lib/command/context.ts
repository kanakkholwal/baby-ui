import { createContext, type Snippet } from "svelte";
import type { DialogVariant } from "../dialog/context";

export type CommandContext = {
	/** Visible rows after filtering, for the count next to the search input. */
	readonly resultCount: number;
	/** The currently highlighted item's value, so the sliding marker knows when to remeasure. */
	readonly activeValue: string;
};

export const [getCommand, setCommand] = createContext<CommandContext>();

/** Bridges CommandDialog's variant/header to Command. Optional: standalone Command usage
 * outside a CommandDialog just skips it. */
export type CommandDialogState = {
	readonly open: boolean;
	readonly variant: DialogVariant;
	/** CommandHeader hoists here so CommandDialog can render it in the rim above the card. */
	header: { children?: Snippet; class?: string } | undefined;
};
export const [getCommandDialogState, setCommandDialogState, hasCommandDialogState] =
	createContext<CommandDialogState>();

/** Same choreography as a dialog panel, but the palette drops from above its shortcut. */
export const COMMAND_PANEL = [
	"transition-[opacity,scale,translate] duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
	"data-[state=closed]:opacity-0 data-[state=closed]:scale-[var(--enter-scale)]",
	"data-[state=closed]:-translate-y-[var(--enter-lift)] data-[state=closed]:duration-[var(--duration-exit)]",
	"starting:data-[state=open]:opacity-0 starting:data-[state=open]:scale-[var(--enter-scale)]",
	"starting:data-[state=open]:-translate-y-[var(--enter-lift)]",
	"motion-reduce:transition-none",
].join(" ");

/** One marker glides between rows, so an arrow-key run reads as a single object moving. */
export const COMMAND_MARKER = [
	"pointer-events-none absolute top-0 left-0 rounded-md bg-foreground/[0.06]",
	"transition-[translate,width,height] duration-[var(--duration-press)] ease-[var(--ease-out)]",
	"motion-reduce:transition-none",
].join(" ");
