<script lang="ts">
import type { Snippet } from "svelte";
import { session } from "#lib/session.svelte.js";
import { goto } from "$app/navigation";
import { page } from "$app/state";

let { children }: { children: Snippet } = $props();

const LINKS = [
	{ href: "/account", label: "Account" },
	{ href: "/account/downloads", label: "Downloads" },
];

// The session lives in this browser only, so the server renders the frame and the client decides.
let ready = $state(false);
$effect(() => {
	ready = true;
	if (!session.current)
		void goto(`/login?next=${encodeURIComponent(page.url.pathname)}`, {
			replaceState: true,
		});
});
</script>

<div class="mx-auto grid w-full max-w-6xl gap-8 px-4 pt-24 pb-16 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-14 md:px-6 md:pt-28">
	<nav aria-label="Profile" class="flex flex-col gap-1 text-sm">
		<p class="hidden px-3 pb-1 text-muted-foreground md:block">Profile</p>
		<ul class="flex gap-1 md:flex-col">
			{#each LINKS as link (link.href)}
				{@const current = page.url.pathname === link.href}
				<li>
					<a
						href={link.href}
						aria-current={current ? "page" : undefined}
						class={[
							"block rounded-lg px-3 py-1.5 outline-none transition-colors duration-(--duration-fast)",
							"focus-visible:ring-2 focus-visible:ring-ring",
							current
								? "bg-foreground/[0.06] text-foreground"
								: "text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground",
						]}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	<div class="min-w-0">
		{#if ready && session.current}{@render children()}{/if}
	</div>
</div>
