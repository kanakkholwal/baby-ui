import { createContext } from "svelte";

export type DropdownMenuContext = {
	readonly open: boolean;
	readonly contentId: string;
	setOpen: (open: boolean) => void;
	close: () => void;
	setTrigger: (el: HTMLElement | undefined) => void;
	setContent: (el: HTMLElement | undefined) => void;
};

export const [getDropdownMenu, setDropdownMenu] = createContext<DropdownMenuContext>();
