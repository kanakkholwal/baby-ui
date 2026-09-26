<script lang="ts">
import { outlineSidebar } from "$lib/docs-sidebar.svelte";
import SidebarToggleIcon from "./sidebar-toggle-icon.svelte";
</script>

<!-- xl only: below that the rail is the "On this page" drawer, which has its own trigger. -->
<button
	type="button"
	onclick={() => (outlineSidebar.current = !outlineSidebar.current)}
	aria-expanded={outlineSidebar.current}
	aria-controls="outline-sidebar"
	aria-label={outlineSidebar.current ? "Hide page outline" : "Show page outline"}
	title={outlineSidebar.current ? "Hide page outline" : "Show page outline"}
	class="hidden size-8 shrink-0 place-items-center self-start rounded-xl border border-border bg-card/20 text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:grid"
>
	<SidebarToggleIcon open={outlineSidebar.current} class="size-4 -scale-x-100" />
</button>
