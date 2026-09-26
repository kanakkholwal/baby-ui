import { sidebarGroups } from "$lib/server/registry";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = () => ({ groups: sidebarGroups() });
