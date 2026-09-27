import { createContext, getContext, hasContext, type Snippet, setContext } from "svelte";
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
// A plain key, not createContext: its tuple has no `has` member on some Svelte 5 releases.
const DIALOG_STATE = Symbol("command-dialog-state");
export const setCommandDialogState = (state: CommandDialogState) =>
	setContext(DIALOG_STATE, state);
/** Undefined outside a CommandDialog. */
export const getCommandDialogState = (): CommandDialogState | undefined =>
	hasContext(DIALOG_STATE) ? getContext<CommandDialogState>(DIALOG_STATE) : undefined;

/** Opened from the keyboard many times a day, so it appears at once; only closing fades. */
export const COMMAND_PANEL = [
	"transition-opacity duration-0",
	"data-[state=closed]:opacity-0 data-[state=closed]:duration-[var(--duration-exit)] data-[state=closed]:ease-[var(--ease-out)]",
	"motion-reduce:transition-none",
].join(" ");

/** One marker for the active row. It snaps: arrow keys repeat too fast for motion to help. */
export const COMMAND_MARKER =
	"pointer-events-none absolute top-0 left-0 rounded-md bg-foreground/[0.06]";
