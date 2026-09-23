import type { Snippet } from "svelte";

export type SidebarNavItem = {
	key: string;
	label: string;
	icon?: Snippet;
	count?: string;
};
export type SidebarRecent = { id: string; label: string; prompt?: string };
export type SidebarWorkspace = { name: string; monogram: string };
export type SidebarWorkspaceAction = {
	label: string;
	icon?: Snippet;
	onSelect?: () => void;
};
