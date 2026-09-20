import { createContext } from "svelte";

export type CollapsibleContext = {
	readonly open: boolean;
	readonly contentId: string;
	toggle: () => void;
};

export const [getCollapsible, setCollapsible] = createContext<CollapsibleContext>();
