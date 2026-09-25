<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import { cn } from "../lib/cn";
import { type FullscreenNavVariant, fullscreenNav } from "./variants";

export type NavLink = { href: string; label: string };

let {
	links,
	open = $bindable(false),
	title = "Menu",
	variant = "fade",
	class: classProp,
}: {
	links: NavLink[];
	open?: boolean;
	title?: string;
	variant?: FullscreenNavVariant;
	class?: string;
} = $props();

const styles = $derived(fullscreenNav({ variant }));

let firstLink = $state<HTMLAnchorElement>();

function refFirst(node: HTMLAnchorElement, isFirst: boolean) {
	if (isFirst) firstLink = node;
}
</script>

<DialogPrimitive.Root bind:open>
	<DialogPrimitive.Portal>
		<DialogPrimitive.Content
			data-slot="fullscreen-nav"
			data-variant={variant}
			onOpenAutoFocus={(event) => {
				event.preventDefault();
				firstLink?.focus();
			}}
			class={cn(styles.popup(), classProp)}
		>
			<div class={styles.header()}>
				<DialogPrimitive.Title class={styles.title()}>{title}</DialogPrimitive.Title>
				<DialogPrimitive.Close
					aria-label="Close"
					class={styles.close()}
				>
					<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
						<path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
					</svg>
				</DialogPrimitive.Close>
			</div>

			<nav class={styles.nav()}>
				{#each links as link, i (link.href)}
					<a
						use:refFirst={i === 0}
						href={link.href}
						onclick={() => (open = false)}
						data-state={open ? "open" : "closed"}
						style:transition-delay="{60 + i * 45}ms"
						class={styles.link()}
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</DialogPrimitive.Content>
	</DialogPrimitive.Portal>
</DialogPrimitive.Root>
