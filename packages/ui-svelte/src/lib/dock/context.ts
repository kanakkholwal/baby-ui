import { createContext } from "svelte";

export type DockSpring = "snappy" | "gentle" | "bouncy";

/** Mirrors @baby-ui/tokens `spring[name].svelte`; inlined so a copied file stands alone. */
export const SPRING: Record<DockSpring, { stiffness: number; damping: number }> = {
	snappy: { stiffness: 0.3, damping: 0.95 },
	gentle: { stiffness: 0.15, damping: 0.85 },
	bouncy: { stiffness: 0.2, damping: 0.55 },
};

export type DockContext = {
	/** Viewport x of the cursor, or Infinity when the pointer is away. */
	readonly mouseX: number;
	readonly size: number;
	readonly magnification: number;
	readonly distance: number;
	readonly spring: DockSpring;
};

export const [getDock, setDock] = createContext<DockContext>();
