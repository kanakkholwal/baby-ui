import { createContext } from "svelte";

export type TooltipContext = {
	readonly open: boolean;
	readonly contentId: string;
	show: (immediate?: boolean) => void;
	hide: () => void;
	setTrigger: (el: HTMLElement | undefined) => void;
	setContent: (el: HTMLElement | undefined) => void;
};

export const [getTooltip, setTooltip] = createContext<TooltipContext>();
