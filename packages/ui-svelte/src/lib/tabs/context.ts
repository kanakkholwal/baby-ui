import { createContext } from "svelte";

export type TabsVariant =
	| "pill"
	| "underline"
	| "segment"
	| "soft"
	| "outline"
	| "enclosed";
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
	soft: "gap-1",
	outline: "gap-1",
	enclosed: "gap-1 border-border border-b",
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
	soft: "rounded-lg",
	outline: "rounded-lg",
	enclosed: "rounded-t-lg",
};

/** The sliding marker, measured from the active trigger. */
export const TABS_INDICATOR: Record<TabsVariant, string> = {
	pill: "top-1 bottom-1 rounded-full bg-primary",
	segment: "top-0.5 bottom-0.5 rounded-md border border-border bg-background shadow-sm",
	underline: "-bottom-px h-0.5 rounded-full bg-primary",
	soft: "inset-y-0 rounded-lg bg-foreground/[0.06]",
	outline: "inset-y-0 rounded-lg border border-border",
	enclosed:
		"-bottom-px top-0 rounded-t-lg border border-border border-b-background bg-background",
};

/** Active label colour per variant; pill sits on the primary fill, the rest on a surface. */
export const TABS_ACTIVE: Record<TabsVariant, string> = {
	pill: "aria-selected:text-primary-foreground",
	segment: "aria-selected:text-foreground",
	underline: "aria-selected:text-foreground",
	soft: "aria-selected:text-foreground",
	outline: "aria-selected:text-foreground",
	enclosed: "aria-selected:text-foreground",
};
