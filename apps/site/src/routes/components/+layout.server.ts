import { sidebarGroups } from "$lib/registry";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = () => ({ groups: sidebarGroups() });
