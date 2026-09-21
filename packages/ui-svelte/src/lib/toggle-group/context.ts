import { createContext } from "svelte";
import type { ToggleGroupSize } from "./variants";

export type { ToggleGroupSize };

export type ToggleGroupContext = {
	readonly size: ToggleGroupSize;
	readonly disabled: boolean;
	isOn: (value: string) => boolean;
	toggle: (value: string) => void;
};

export const [getToggleGroup, setToggleGroup] = createContext<ToggleGroupContext>();
