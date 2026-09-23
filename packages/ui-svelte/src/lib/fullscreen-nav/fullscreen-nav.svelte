<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import { cn } from "../lib/cn";

/** No backdrop: the panel itself is opaque and fills the viewport. */
const NAV_POPUP =
	"fixed inset-0 z-50 flex flex-col bg-background outline-none transition-[opacity,visibility] duration-[var(--duration-overlay)] ease-[var(--ease-out)] starting:opacity-0 data-[state=closed]:invisible data-[state=closed]:opacity-0 data-[state=closed]:duration-[var(--duration-exit)] motion-reduce:transition-none";

/** Each link follows on a delay set inline, so it cascades; driven by our own `data-state`
 * since bits-ui's open/closed attributes only apply to the popup itself. */
const NAV_LINK_MOTION =
	"transition-[opacity,translate] duration-[var(--duration-drawer)] ease-[var(--ease-out)] starting:translate-y-[0.3em] starting:opacity-0 data-[state=closed]:translate-y-[0.3em] data-[state=closed]:opacity-0 data-[state=closed]:delay-0 data-[state=closed]:duration-[var(--duration-exit)] motion-reduce:transition-none";

export type NavLink = { href: string; label: string };

let {
	links,
	open = $bindable(false),
	title = "Menu",
	class: classProp,
}: { links: NavLink[]; open?: boolean; title?: string; class?: string } = $props();

let firstLink = $state<HTMLAnchorElement>();

function refFirst(node: HTMLAnchorElement, isFirst: boolean) {
	if (isFirst) firstLink = node;
}
</script>

<DialogPrimitive.Root bind:open>
	<DialogPrimitive.Portal>
		<DialogPrimitive.Content
			data-slot="fullscreen-nav"
			onOpenAutoFocus={(event) => {
				event.preventDefault();
				firstLink?.focus();
			}}
			class={cn(NAV_POPUP, classProp)}
		>
			<div class="flex h-14 items-center justify-between px-4 md:px-6">
				<DialogPrimitive.Title class="font-semibold text-foreground text-sm">{title}</DialogPrimitive.Title>
				<DialogPrimitive.Close
					aria-label="Close"
					class="grid size-9 place-items-center rounded-2xl border border-border text-muted-foreground transition-colors hover:text-foreground"
				>
					<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
						<path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
					</svg>
				</DialogPrimitive.Close>
			</div>

			<nav class="flex flex-1 flex-col justify-center gap-2 px-6 pb-20">
				{#each links as link, i (link.href)}
					<a
						use:refFirst={i === 0}
						href={link.href}
						onclick={() => (open = false)}
						data-state={open ? "open" : "closed"}
						style:transition-delay="{60 + i * 45}ms"
						class={cn(
							NAV_LINK_MOTION,
							"font-heading font-semibold text-4xl text-foreground tracking-tight hover:text-muted-foreground sm:text-5xl",
						)}
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</DialogPrimitive.Content>
	</DialogPrimitive.Portal>
</DialogPrimitive.Root>
