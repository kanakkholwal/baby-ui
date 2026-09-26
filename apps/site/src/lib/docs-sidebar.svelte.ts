import { PersistedState } from "./persisted-state.svelte";

/** Whether the desktop docs sidebar is open; the choice survives reloads. */
export const docsSidebar = new PersistedState("baby-ui:docs-sidebar-open", true);

/** Whether the right "On this page" rail is open, from xl up. */
export const outlineSidebar = new PersistedState("baby-ui:outline-sidebar-open", true);

/** Classes for a right-rail panel: slides past the right gutter while closed, on the drawer curve. */
export const outlinePanelClass = (open: boolean) => [
	"ease-[var(--ease-drawer)] in-data-[ready]:transition-[translate] motion-reduce:transition-none",
	open
		? "translate-x-0 duration-[var(--duration-drawer)]"
		: "translate-x-[22rem] duration-[var(--duration-overlay)]",
];
