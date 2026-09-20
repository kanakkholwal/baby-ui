import { createContext } from "svelte";

export type HoverCardContext = {
	readonly open: boolean;
	readonly contentId: string;
	schedule: (open: boolean) => void;
	setTrigger: (el: HTMLElement | undefined) => void;
	setContent: (el: HTMLElement | undefined) => void;
};

export const [getHoverCard, setHoverCard] = createContext<HoverCardContext>();
