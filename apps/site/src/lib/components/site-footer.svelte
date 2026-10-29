<script lang="ts">
import { IconBrandGithub, IconBrandX, IconGlobe } from "@baby-ui/icons";
import { Button } from "@baby-ui/svelte";
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
const LINK = "text-foreground/70 text-sm transition-colors hover:text-foreground";
const HEAD = "mb-4 font-medium text-muted-foreground text-xs";
</script>

<footer class="overflow-hidden px-4 pt-16 md:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="border-border border-t pt-12 pb-10">
			<div class="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12">
				<div class="col-span-2 flex flex-col gap-4 md:col-span-4">
					<a href="/" class="flex items-center gap-2 font-semibold text-foreground text-sm">
						<Logo class="size-5" />
						Baby UI
					</a>
					<p class="max-w-64 text-foreground/70 text-sm leading-6">
						Copy-paste components for React and Svelte, built from one spec and one token layer.
					</p>
					<div class="flex items-center gap-1.5">
						<Button
							href="https://github.com/kanakkholwal/baby-ui"
							target="_blank"
							rel="noreferrer noopener"
							size="sm"
							variant="outline"
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
					<p class="text-muted-foreground text-xs">
						Built by
						<a
							href={PORTFOLIO}
							target="_blank"
							rel="noopener noreferrer"
							class="font-medium text-foreground underline-offset-4 hover:underline"
						>Kanak</a>
					</p>
				</div>

				<nav aria-label="Categories" class="md:col-span-3">
					<p class={HEAD}>Components</p>
					<ul class="space-y-2.5">
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

				<nav aria-label="Picks" class="md:col-span-3">
					<p class={HEAD}>Worth a look</p>
					<ul class="space-y-2.5">
						{#each page.data.footerPicks ?? [] as pick (pick.slug)}
							<li><a href={pick.href} class={LINK}>{pick.name}</a></li>
						{/each}
					</ul>
				</nav>

				<nav aria-label="Resources" class="col-span-2 md:col-span-2">
					<p class={HEAD}>Resources</p>
					<ul class="space-y-2.5">
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
		</div>

		<div class="flex flex-col gap-2 border-border border-t py-6 text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between">
			<p>Components are yours once copied. Apache License 2.0.</p>
			<p>© {year} Baby UI.</p>
		</div>
	</div>

	<p
		aria-hidden="true"
		class="pointer-events-none mx-auto -mb-[0.22em] max-w-7xl select-none text-center font-normal text-[clamp(4rem,19vw,16rem)] text-foreground/[0.05] leading-none tracking-[-0.07em] before:content-['Baby_UI']"
	></p>
</footer>
