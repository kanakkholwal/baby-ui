<script lang="ts">
import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
import Logo from "$lib/components/logo.svelte";
import { sidebarGroups } from "$lib/registry";

const FOOTER_LIMIT = 6;
const groups = sidebarGroups();
const base = groups.find((g) => g.category === "base");
const agents = groups.find((g) => g.category === "agents");
const year = new Date().getFullYear();
</script>

<footer class="border-border border-t px-4 pt-14 pb-10 md:px-6 xl:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="grid grid-cols-2 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
			<div class="col-span-2 md:col-span-1">
				<a href="/" class="flex items-center gap-2 font-semibold text-foreground text-sm">
					<Logo class="size-5" />
					Baby UI
				</a>
				<p class="mt-3 max-w-[220px] text-muted-foreground text-sm leading-6">
					Copy-paste components for React and Svelte, built from one spec and one token
					layer.
				</p>
				<a
					href="https://github.com/kanakkholwal/baby-ui"
					target="_blank"
					rel="noreferrer noopener"
					aria-label="GitHub"
					class="mt-5 grid size-9 place-items-center rounded-2xl border border-border bg-card/20 text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
				>
					<IconBrandGithub size={16} stroke={1.6} />
				</a>
			</div>

			{#if base}
				<div>
					<p class="mb-4 font-semibold text-[11px] text-muted-foreground uppercase tracking-wider">
						Base
					</p>
					<ul class="space-y-2.5">
						{#each base.items.slice(0, FOOTER_LIMIT) as item (item.slug)}
							<li>
								<a
									href={item.href}
									class="text-muted-foreground text-sm transition-colors hover:text-foreground"
								>
									{item.name}
								</a>
							</li>
						{/each}
						<li>
							<a
								href="/components/base"
								class="font-medium text-foreground text-sm transition-colors hover:text-muted-foreground"
							>
								View all ({base.items.length})
							</a>
						</li>
					</ul>
				</div>
			{/if}

			{#if agents}
				<div>
					<p class="mb-4 font-semibold text-[11px] text-muted-foreground uppercase tracking-wider">
						Agents
					</p>
					<ul class="space-y-2.5">
						{#each agents.items.slice(0, FOOTER_LIMIT) as item (item.slug)}
							<li>
								<a
									href={item.href}
									class="text-muted-foreground text-sm transition-colors hover:text-foreground"
								>
									{item.name}
								</a>
							</li>
						{/each}
						<li>
							<a
								href="/components/agents"
								class="font-medium text-foreground text-sm transition-colors hover:text-muted-foreground"
							>
								View all ({agents.items.length})
							</a>
						</li>
					</ul>
				</div>
			{/if}

			<div>
				<p class="mb-4 font-semibold text-[11px] text-muted-foreground uppercase tracking-wider">
					Resources
				</p>
				<ul class="space-y-2.5">
					<li>
						<a href="/docs" class="text-muted-foreground text-sm transition-colors hover:text-foreground">
							Docs
						</a>
					</li>
					<li>
						<a
							href="/docs/installation"
							class="text-muted-foreground text-sm transition-colors hover:text-foreground"
						>
							Installation
						</a>
					</li>
					<li>
						<a
							href="/docs/changelog"
							class="text-muted-foreground text-sm transition-colors hover:text-foreground"
						>
							Changelog
						</a>
					</li>
					<li>
						<a
							href="/llms.txt"
							class="text-muted-foreground text-sm transition-colors hover:text-foreground"
						>
							llms.txt
						</a>
					</li>
					<li>
						<a
							href="/r/registry.json"
							class="text-muted-foreground text-sm transition-colors hover:text-foreground"
						>
							registry.json
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div
			class="mt-14 flex flex-col gap-3 border-border border-t pt-6 text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between"
		>
			<p>Components are yours once copied. Apache License 2.0.</p>
			<p>© {year} Baby UI.</p>
		</div>
	</div>
</footer>
