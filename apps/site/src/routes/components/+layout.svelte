<script lang="ts">
import SiteSidebar from "$lib/components/site-sidebar.svelte";
import type { LayoutProps } from "./$types";

let { data, children }: LayoutProps = $props();
</script>

<div
	class="grid min-w-0 grid-cols-[minmax(0,1fr)] px-4 [--left-sidebar-width:15rem] [--right-sidebar-width:20rem] md:grid-cols-[var(--left-sidebar-width)_minmax(0,1fr)] md:gap-4 md:px-6 xl:grid-cols-[var(--left-sidebar-width)_minmax(0,1fr)_var(--right-sidebar-width)] xl:gap-8 xl:px-8"
>
	<div class="hidden min-w-0 md:block">
		<div
			class="scrollbar-hide fixed top-14 bottom-0 w-(--left-sidebar-width) overflow-y-auto py-6 pr-4"
		>
			<SiteSidebar groups={data.groups} />
		</div>
	</div>
	{@render children()}
</div>
