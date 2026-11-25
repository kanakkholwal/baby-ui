<script lang="ts">
import { IconBrandGithub, IconBrandX, IconGlobe } from "@baby-ui/icons";
import { Button } from "@baby-ui/svelte/button";
import Logo from "#lib/components/logo.svelte";
import { page } from "$app/state";

const RESOURCES = [
	{ href: "/docs", label: "Docs" },
	{ href: "/docs/installation", label: "Installation" },
	{ href: "/llms.txt", label: "llms.txt" },
	{ href: "/r/registry.json", label: "registry.json" },
	{ href: "https://docvia.dev", label: "Docs by docvia", external: true },
];
const PORTFOLIO = "https://kanakkholwal.eu.org";
const SOCIALS = [
	{ href: "https://x.com/kanakkholwal", label: "Kanak on X", icon: IconBrandX },
	{ href: PORTFOLIO, label: "Kanak's portfolio", icon: IconGlobe },
];
const year = new Date().getFullYear();
const LINK =
	"rounded-sm text-foreground/70 text-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring";
const HEAD = "m-0 mb-4 font-medium text-foreground text-sm";
</script>

<footer class="px-4 pt-8 pb-4 md:px-8 md:pb-6">
	<div class="mx-auto max-w-7xl rounded-3xl bg-card p-6 md:p-10">
		<div class="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12">
			<div class="col-span-2 flex flex-col gap-4 md:col-span-4">
				<a href="/" class="flex w-fit items-center gap-2 rounded-md font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring">
					<Logo class="size-6" />
					Baby UI
				</a>
				<p class="m-0 max-w-72 text-pretty text-muted-foreground text-sm leading-6">
					Copy-paste components for React and Svelte, built from one spec and one token layer.
				</p>
				<div class="flex items-center gap-1.5">
					<Button
						href="https://github.com/kanakkholwal/baby-ui"
						target="_blank"
						rel="noreferrer noopener"
						size="sm"
						variant="secondary"
						class="rounded-full"
					>
						<IconBrandGithub />
						Star on GitHub
					</Button>
					{#each SOCIALS as social (social.href)}
						<Button
							href={social.href}
							target="_blank"
							rel="noreferrer noopener"
							size="icon-sm"
							variant="ghost"
							aria-label={social.label}
							class="rounded-full text-muted-foreground hover:text-foreground"
						>
							<social.icon />
						</Button>
					{/each}
				</div>
			</div>

			<nav aria-label="Categories" class="col-span-2 md:col-span-4">
				<p class={HEAD}>Components</p>
				<ul class="m-0 grid list-none gap-x-6 gap-y-2.5 p-0 sm:grid-cols-2">
					{#each page.data.categories ?? [] as group (group.category)}
						<li>
							<a href={group.href} class="{LINK} flex items-center justify-between gap-3">
								{group.label}
								<span class="text-muted-foreground text-xs tabular-nums">{group.count}</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<nav aria-label="Picks" class="md:col-span-2">
				<p class={HEAD}>Worth a look</p>
				<ul class="m-0 list-none space-y-2.5 p-0">
					{#each page.data.footerPicks ?? [] as pick (pick.slug)}
						<li><a href={pick.href} class={LINK}>{pick.name}</a></li>
					{/each}
				</ul>
			</nav>

			<nav aria-label="Resources" class="md:col-span-2">
				<p class={HEAD}>Resources</p>
				<ul class="m-0 list-none space-y-2.5 p-0">
					{#each RESOURCES as link (link.href)}
						<li>
							<a
								href={link.href}
								class={LINK}
								target={link.external ? "_blank" : undefined}
								rel={link.external ? "noopener" : undefined}>{link.label}</a
							>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<div class="mt-12 flex flex-col gap-2 text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between">
			<p class="m-0">Components are yours once copied. Apache License 2.0.</p>
			<p class="m-0">
				© {year} Baby UI. Built by
				<a
					href={PORTFOLIO}
					target="_blank"
					rel="noopener noreferrer"
					class="font-medium text-foreground underline-offset-4 hover:underline">Kanak</a
				>.
			</p>
		</div>
	</div>
</footer>
