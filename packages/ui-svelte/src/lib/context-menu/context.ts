import { createContext } from "svelte";

export type ContextMenuContext = {
	readonly open: boolean;
	readonly contentId: string;
	readonly point: { x: number; y: number };
	openAt: (x: number, y: number) => void;
	close: () => void;
};

export const [getContextMenu, setContextMenu] = createContext<ContextMenuContext>();
