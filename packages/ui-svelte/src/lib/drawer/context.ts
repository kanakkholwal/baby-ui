import { createContext } from "svelte";

export type DrawerDirection = "top" | "bottom" | "left" | "right";

export type DrawerContext = {
	readonly direction: DrawerDirection;
};

export const [getDrawer, setDrawer] = createContext<DrawerContext>();

/** vaul eases with cubic-bezier(0.32, 0.72, 0, 1), our `--ease-drawer`; only the surface is ours. */
export const DRAWER_CONTENT: Record<DrawerDirection, string> = {
	bottom:
		"inset-x-0 bottom-0 mx-auto max-h-[92dvh] w-full max-w-2xl rounded-t-3xl border-b-0",
	top: "inset-x-0 top-0 mx-auto max-h-[92dvh] w-full max-w-2xl rounded-b-3xl border-t-0",
	left: "inset-y-0 left-0 h-full w-80 max-w-[85vw] rounded-r-3xl border-l-0",
	right: "inset-y-0 right-0 h-full w-80 max-w-[85vw] rounded-l-3xl border-r-0",
};

export const DRAWER_SURFACE: Record<DrawerDirection, string> = {
	bottom: "rounded-[20px] rounded-b-none",
	top: "rounded-[20px] rounded-t-none",
	left: "rounded-[20px] rounded-l-none",
	right: "rounded-[20px] rounded-r-none",
};
