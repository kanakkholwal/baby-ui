import { createContext } from "svelte";

export type PopoverContext = {
	readonly open: boolean;
	readonly contentId: string;
	setOpen: (open: boolean) => void;
	setTrigger: (el: HTMLElement | undefined) => void;
	setContent: (el: HTMLElement | undefined) => void;
};

export const [getPopover, setPopover] = createContext<PopoverContext>();
