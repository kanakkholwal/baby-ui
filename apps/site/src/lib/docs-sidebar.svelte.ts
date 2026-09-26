import { PersistedState } from "./persisted-state.svelte";

/** Whether the desktop docs sidebar is open; the choice survives reloads. */
export const docsSidebar = new PersistedState("baby-ui:docs-sidebar-open", true);
