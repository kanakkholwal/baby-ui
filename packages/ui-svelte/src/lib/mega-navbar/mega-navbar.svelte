<script lang="ts">
import type { Snippet } from "svelte";
import Collapsible from "../collapsible/collapsible.svelte";
import CollapsibleContent from "../collapsible/collapsible-content.svelte";
import { cn } from "../lib/cn";
import Sheet from "../sheet/sheet.svelte";
import SheetContent from "../sheet/sheet-content.svelte";
import SheetHeader from "../sheet/sheet-header.svelte";
import SheetTitle from "../sheet/sheet-title.svelte";
import type { MegaMenuGroup, MegaNavLink } from "./types";

let {
	brand,
	groups,
	links = [],
	actions,
	mobileActions,
	active,
	sticky = true,
	blur = true,
	class: className,
}: {
	brand?: Snippet;
	groups: MegaMenuGroup[];
	links?: MegaNavLink[];
	actions?: Snippet;
	mobileActions?: Snippet;
	active?: string;
	sticky?: boolean;
	blur?: boolean;
	class?: string;
} = $props();

function isCurrent(href: string) {
	if (!active) return false;
	return active === href || active.startsWith(`${href}/`);
}

let scrolled = $state(false);
let mobileOpen = $state(false);
let openDesktopGroup = $state(-1);
let openMobileGroup = $state(0);
let box = $state({ width: 0, height: 0, left: 0 });

let row: HTMLDivElement | undefined = $state();
let panels: (HTMLDivElement | undefined)[] = $state([]);
let triggers: (HTMLButtonElement | undefined)[] = $state([]);
let closeTimer: ReturnType<typeof setTimeout> | null = null;

function measure() {
	if (openDesktopGroup < 0 || !row) return;
	const panel = panels[openDesktopGroup];
	const trigger = triggers[openDesktopGroup];
	if (!panel || !trigger) return;
	const rowRect = row.getBoundingClientRect();
	const triggerRect = trigger.getBoundingClientRect();
	const width = panel.scrollWidth;
	const ideal = triggerRect.left - rowRect.left + triggerRect.width / 2 - width / 2;
	box = { width, height: panel.scrollHeight, left: Math.max(0, ideal) };
}

$effect(() => {
	void openDesktopGroup;
	measure();
});

function cancelClose() {
	if (closeTimer) clearTimeout(closeTimer);
	closeTimer = null;
}
function scheduleClose() {
	cancelClose();
	closeTimer = setTimeout(() => (openDesktopGroup = -1), 140);
}

// Navigating from inside the sheet should leave it closed.
$effect(() => {
	void active;
	mobileOpen = false;
});

const footerActions = $derived(mobileActions ?? actions);
</script>

<svelte:window
	onscroll={() => {
		if (sticky) scrolled = window.scrollY > 8;
	}}
	onresize={measure}
/>

{#snippet chevronDown(cls: string)}
	<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class={cls}>
		<path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
{/snippet}

{#snippet arrowUpRight(cls: string)}
	<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class={cls}>
		<path d="M5 11 11 5M6 5h5v5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
{/snippet}

{#snippet arrowRight(cls: string)}
	<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class={cls}>
		<path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
{/snippet}

<div
	data-slot="mega-navbar"
	class={cn(
		"@container w-full",
		sticky ? "sticky inset-x-0 top-0 z-50" : "relative",
		"border-b transition-colors duration-[var(--duration-dropdown)] motion-reduce:transition-none",
		scrolled ? cn("border-border bg-background/85", blur && "backdrop-blur") : "border-transparent",
		className,
	)}
>
	<nav aria-label="Primary" class="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-6">
		{#if brand}
			<span class="flex shrink-0 items-center gap-2.5 py-1 pr-2">{@render brand()}</span>
		{/if}

		<div class="hidden flex-1 items-center justify-center @3xl:flex">
			<div
				bind:this={row}
				class="relative hidden items-center gap-1 @3xl:flex"
				onmouseleave={scheduleClose}
				onmouseenter={cancelClose}
				role="presentation"
			>
				{#each groups as group, i (group.label)}
					{@const isOpen = openDesktopGroup === i}
					<button
						bind:this={triggers[i]}
						type="button"
						aria-expanded={isOpen}
						aria-controls="mega-navbar-panel"
						onmouseenter={() => {
							cancelClose();
							openDesktopGroup = i;
						}}
						onfocus={() => {
							cancelClose();
							openDesktopGroup = i;
						}}
						onclick={() => (openDesktopGroup = openDesktopGroup === i ? -1 : i)}
						onkeydown={(e) => {
							if (e.key === "Escape") {
								openDesktopGroup = -1;
								triggers[i]?.focus();
							}
						}}
						class={cn(
							"inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 font-medium text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
							isOpen || isCurrent(group.href)
								? "text-foreground"
								: "text-muted-foreground hover:text-foreground",
						)}
					>
						{group.label}
						{@render chevronDown(cn("size-3.5 transition-transform duration-[var(--duration-dropdown)] motion-reduce:transition-none", isOpen && "rotate-180"))}
					</button>
				{/each}

				<div
					id="mega-navbar-panel"
					aria-hidden={openDesktopGroup < 0}
					onmouseenter={cancelClose}
					onmouseleave={scheduleClose}
					role="presentation"
					class={cn(
						"absolute top-full z-50 origin-top overflow-hidden rounded-xl border border-border bg-card shadow-2xl",
						"transition-[width,height,transform,opacity] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
						openDesktopGroup >= 0 ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
					)}
					style="width:{box.width}px;height:{box.height}px;transform:translate3d({box.left}px, {openDesktopGroup >= 0 ? 8 : 2}px, 0) scale({openDesktopGroup >= 0 ? 1 : 0.98});"
				>
					{#each groups as group, i (group.label)}
						{@const isOpen = openDesktopGroup === i}
						<div
							bind:this={panels[i]}
							inert={!isOpen}
							class={cn(
								"absolute inset-x-0 top-0 w-max transition-opacity duration-[var(--duration-dropdown)] motion-reduce:transition-none",
								isOpen ? "opacity-100" : "pointer-events-none opacity-0",
							)}
						>
							<ul class="grid w-[34rem] grid-cols-2 gap-1 p-2">
								{#each group.items as item (item.href)}
									<li>
										<a
											href={item.href}
											target={item.external ? "_blank" : undefined}
											rel={item.external ? "noreferrer" : undefined}
											onclick={() => (openDesktopGroup = -1)}
											aria-current={isCurrent(item.href) ? "page" : undefined}
											class="flex gap-3 rounded-lg p-3 transition-colors hover:bg-foreground/[0.06] aria-[current=page]:bg-foreground/[0.06] motion-reduce:transition-none"
										>
											{#if item.icon}
												<span class="mt-0.5 shrink-0 text-muted-foreground [&_svg]:size-4">
													{@render item.icon()}
												</span>
											{/if}
											<span class="min-w-0">
												<span class="flex items-center gap-1 font-medium text-foreground text-sm">
													{item.label}
													{#if item.external}
														{@render arrowUpRight("size-3 text-muted-foreground")}
													{/if}
												</span>
												{#if item.description}
													<span class="mt-0.5 block text-muted-foreground text-xs">{item.description}</span>
												{/if}
											</span>
										</a>
									</li>
								{/each}
							</ul>
							{#if group.footer}
								<a
									href={group.footer.href}
									onclick={() => (openDesktopGroup = -1)}
									class="group/cta flex items-center justify-between gap-4 border-border border-t bg-foreground/[0.02] px-5 py-3 transition-colors hover:bg-foreground/[0.06] motion-reduce:transition-none"
								>
									<span class="font-medium text-foreground text-sm">{group.footer.label}</span>
									<span class="flex items-center gap-1.5 text-muted-foreground text-xs">
										{group.footer.hint}
										{@render arrowRight("size-3.5 transition-transform group-hover/cta:translate-x-0.5 motion-reduce:transition-none")}
									</span>
								</a>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<ul class="flex items-center gap-1">
				{#each links as link (link.href)}
					<li>
						<a
							href={link.href}
							target={link.external ? "_blank" : undefined}
							rel={link.external ? "noreferrer" : undefined}
							aria-current={isCurrent(link.href) ? "page" : undefined}
							class={cn(
								"inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-2 font-medium text-sm transition-colors hover:text-foreground motion-reduce:transition-none",
								isCurrent(link.href) ? "text-foreground" : "text-muted-foreground",
							)}
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<div class="ml-auto flex shrink-0 items-center gap-2 @3xl:ml-0">
			{#if actions}
				<span class="hidden items-center gap-2 @3xl:flex">{@render actions()}</span>
			{/if}
			<button
				type="button"
				onclick={() => (mobileOpen = true)}
				aria-expanded={mobileOpen}
				aria-label="Open menu"
				class="grid size-9 cursor-pointer place-items-center rounded-lg text-foreground transition-colors hover:bg-foreground/[0.06] @3xl:hidden motion-reduce:transition-none"
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-5">
					<path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
				</svg>
			</button>
		</div>
	</nav>
</div>

<Sheet bind:open={mobileOpen}>
	<SheetContent side="right" class="w-full gap-0 p-0 sm:max-w-sm">
		<SheetHeader class="border-border border-b px-5 py-4">
			<SheetTitle class="flex items-center gap-2.5">
				{#if brand}{@render brand()}{/if}
			</SheetTitle>
		</SheetHeader>
		<nav aria-label="Mobile" class="flex-1 overflow-y-auto px-3 py-3">
			{#each groups as group, i (group.label)}
				{@const isOpen = openMobileGroup === i}
				<Collapsible
					open={isOpen}
					class="border-border border-b last:border-b-0"
				>
					<button
						type="button"
						aria-expanded={isOpen}
						onclick={() => (openMobileGroup = openMobileGroup === i ? -1 : i)}
						class="flex min-h-12 w-full items-center justify-between gap-4 px-2 text-left font-medium text-foreground"
					>
						{group.label}
						{@render chevronDown(cn("size-4 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-dropdown)] motion-reduce:transition-none", isOpen && "rotate-180"))}
					</button>
					<CollapsibleContent class="px-0 pb-2">
						<ul>
							{#each group.items as item (item.href)}
								<li>
									<a
										href={item.href}
										target={item.external ? "_blank" : undefined}
										rel={item.external ? "noreferrer" : undefined}
										onclick={() => (mobileOpen = false)}
										aria-current={isCurrent(item.href) ? "page" : undefined}
										class={cn(
											"flex min-h-12 items-center gap-3 rounded-lg px-2 py-2 transition-colors motion-reduce:transition-none",
											isCurrent(item.href) ? "bg-foreground/[0.06]" : "hover:bg-foreground/[0.06]",
										)}
									>
										{#if item.icon}
											<span class="shrink-0 text-muted-foreground [&_svg]:size-4">
												{@render item.icon()}
											</span>
										{/if}
										<span class="min-w-0 flex-1">
											<span class="flex items-center gap-1 font-medium text-foreground text-sm">
												{item.label}
												{#if item.external}
													{@render arrowUpRight("size-3 text-muted-foreground")}
												{/if}
											</span>
											{#if item.description}
												<span class="mt-0.5 block text-muted-foreground text-xs">{item.description}</span>
											{/if}
										</span>
									</a>
								</li>
							{/each}
						</ul>
					</CollapsibleContent>
				</Collapsible>
			{/each}
			<ul class="mt-1 pt-1">
				{#each links as link (link.href)}
					<li>
						<a
							href={link.href}
							target={link.external ? "_blank" : undefined}
							rel={link.external ? "noreferrer" : undefined}
							onclick={() => (mobileOpen = false)}
							aria-current={isCurrent(link.href) ? "page" : undefined}
							class={cn(
								"flex min-h-12 items-center rounded-lg px-2 font-medium text-foreground transition-colors motion-reduce:transition-none",
								isCurrent(link.href) ? "bg-foreground/[0.06]" : "hover:bg-foreground/[0.06]",
							)}
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		{#if footerActions}
			<div class="mt-auto flex flex-col gap-2 border-border border-t px-5 py-4">
				{@render footerActions()}
			</div>
		{/if}
	</SheetContent>
</Sheet>
