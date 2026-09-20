import { createContext } from "svelte";

export type SelectContext = {
	readonly open: boolean;
	readonly value: string;
	readonly contentId: string;
	readonly disabled: boolean;
	/** Item labels, registered on mount so the trigger can echo the selection. */
	readonly labels: Record<string, string>;
	register: (value: string, label: string) => void;
	setOpen: (open: boolean) => void;
	commit: (value: string) => void;
	setTrigger: (el: HTMLElement | undefined) => void;
	setContent: (el: HTMLElement | undefined) => void;
};

export const [getSelect, setSelect] = createContext<SelectContext>();
