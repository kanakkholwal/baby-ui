<script lang="ts">
import { Button } from "@baby-ui/svelte/button";
import { outlineSidebar, playgroundOutlineDrawer } from "#lib/docs-sidebar.svelte.js";
import { prefs } from "#lib/preferences.svelte.js";
import SidebarToggleIcon from "./sidebar-toggle-icon.svelte";

const open = $derived(
	prefs.layout === "library" ? outlineSidebar.current : playgroundOutlineDrawer.current,
);

function toggle() {
	if (prefs.layout === "library") outlineSidebar.current = !outlineSidebar.current;
	else playgroundOutlineDrawer.current = !playgroundOutlineDrawer.current;
}
</script>

<!-- xl only: below that the rail is the "On this page" drawer, which has its own trigger. -->
<Button
	variant="secondary"
	size="icon-sm"
	onclick={toggle}
	aria-expanded={open}
	aria-controls="outline-sidebar"
	aria-label={open ? "Hide page outline" : "Show page outline"}
	title={open ? "Hide page outline" : "Show page outline"}
	class="hidden shrink-0 self-start rounded-full text-muted-foreground hover:text-foreground xl:inline-flex"
>
	<SidebarToggleIcon {open} class="size-4 -scale-x-100" />
</Button>
