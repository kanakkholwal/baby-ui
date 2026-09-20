import { createContext } from "svelte";

export type ToggleGroupSize = "sm" | "md" | "lg" | "xl";

export type ToggleGroupContext = {
	readonly size: ToggleGroupSize;
	readonly disabled: boolean;
	isOn: (value: string) => boolean;
	toggle: (value: string) => void;
};

export const [getToggleGroup, setToggleGroup] = createContext<ToggleGroupContext>();

export const TOGGLE_GROUP_ITEM: Record<ToggleGroupSize, string> = {
	sm: "h-6 px-2 text-[11px]",
	md: "h-7 px-2.5 text-xs",
	lg: "h-9 px-3 text-sm",
	xl: "h-11 px-4 text-base",
};
