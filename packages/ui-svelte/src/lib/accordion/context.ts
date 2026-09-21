import { createContext } from "svelte";

export type AccordionContext = {
	readonly type: "single" | "multiple";
	isOpen: (value: string) => boolean;
	toggle: (value: string) => void;
};

export type AccordionItemContext = {
	readonly value: string;
	readonly open: boolean;
	readonly disabled: boolean;
	readonly triggerId: string;
	readonly contentId: string;
};

export const [getAccordion, setAccordion] = createContext<AccordionContext>();
export const [getAccordionItem, setAccordionItem] = createContext<AccordionItemContext>();
