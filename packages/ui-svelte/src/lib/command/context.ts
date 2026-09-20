import { createContext } from "svelte";

export type CommandContext = {
	readonly query: string;
	readonly listId: string;
	readonly activeId: string;
	setQuery: (query: string) => void;
	setActive: (id: string) => void;
	/** True when an item's value or keywords contain the current query. */
	matches: (haystack: string) => boolean;
	select: () => void;
	setList: (el: HTMLElement | undefined) => void;
	move: (delta: number) => void;
	first: () => void;
	last: () => void;
};

export const [getCommand, setCommand] = createContext<CommandContext>();
