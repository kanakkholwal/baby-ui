import { createContext } from "svelte";
import type { RadioSize, RadioVariant } from "./variants";

export type { RadioSize, RadioVariant };

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
