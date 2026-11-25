<script lang="ts">
import { IconRefresh } from "@baby-ui/icons";
import { Button } from "@baby-ui/svelte/button";
import SidebarPageLayout from "#lib/components/sidebar-page-layout.svelte";
import { page } from "$app/state";
import type { LayoutProps } from "./$types";

let { data, children }: LayoutProps = $props();
</script>

<SidebarPageLayout groups={data.groups}>
	<!-- Keyed by path so moving to another page always starts from a fresh boundary. A crash in a
	     page's render or effects stays inside the content area; the header and sidebar survive. -->
	{#key page.url.pathname}
		<svelte:boundary onerror={(error) => console.error("Page crashed:", error)}>
			{@render children()}
			{#snippet failed(error, reset)}
				<div
					role="alert"
					class="mx-auto my-16 flex max-w-md flex-col items-center gap-3 rounded-[1.75rem] bg-card p-8 text-center"
				>
					<h1 class="m-0 font-semibold text-foreground text-xl tracking-[-0.015em]">This page crashed</h1>
					<p class="m-0 text-pretty text-muted-foreground text-sm">
						{error instanceof Error && error.message ? error.message : "Something failed while rendering."}
					</p>
					<div class="mt-2 flex items-center gap-2">
						<Button variant="dark" size="sm" class="rounded-full" onclick={reset}>
							<IconRefresh />
							Try again
						</Button>
						<Button href="/components" variant="secondary" size="sm" class="rounded-full">Browse components</Button>
					</div>
				</div>
			{/snippet}
		</svelte:boundary>
	{/key}
</SidebarPageLayout>
