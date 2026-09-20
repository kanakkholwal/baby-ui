import { createContext } from "svelte";

export type TabsVariant = "pill" | "underline" | "segment";
export type TabsSize = "sm" | "md" | "lg" | "xl";

export type TabsContext = {
	readonly value: string;
	readonly variant: TabsVariant;
	readonly size: TabsSize;
	setValue: (value: string) => void;
};

export const [getTabs, setTabs] = createContext<TabsContext>();

export const TABS_LIST: Record<TabsVariant, string> = {
	pill: "gap-1 rounded-full bg-card p-1",
	segment: "gap-0.5 rounded-lg bg-card p-0.5",
	underline: "gap-1 border-border border-b",
};

export const TABS_TRIGGER: Record<TabsSize, string> = {
	sm: "h-7 px-2.5 text-xs",
	md: "h-8 px-3.5 text-sm",
	lg: "h-10 px-4 text-sm",
	xl: "h-12 px-5 text-base",
};

export const TABS_RADIUS: Record<TabsVariant, string> = {
	pill: "rounded-full",
	segment: "rounded-md",
	underline: "rounded-md",
};
