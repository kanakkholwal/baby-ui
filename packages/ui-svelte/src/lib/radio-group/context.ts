import { createContext } from "svelte";

export type RadioSize = "sm" | "md" | "lg" | "xl";
export type RadioVariant = "default" | "card";

export type RadioGroupContext = {
	readonly value: string;
	readonly name: string | undefined;
	readonly size: RadioSize;
	readonly variant: RadioVariant;
	readonly disabled: boolean;
	setValue: (value: string) => void;
	step: (from: string, delta: -1 | 1) => void;
};

export const [getRadioGroup, setRadioGroup] = createContext<RadioGroupContext>();

export const RADIO_RING: Record<RadioSize, string> = {
	sm: "size-3.5",
	md: "size-4",
	lg: "size-5",
	xl: "size-6",
};

export const RADIO_DOT: Record<RadioSize, string> = {
	sm: "size-1.5",
	md: "size-2",
	lg: "size-2.5",
	xl: "size-3",
};

export const RADIO_TEXT: Record<RadioSize, string> = {
	sm: "text-xs",
	md: "text-sm",
	lg: "text-sm",
	xl: "text-base",
};
