<script lang="ts">
import type { Snippet } from "svelte";
import { type AnchorPlacement, anchor, dismissable, rove } from "../lib/anchor";
import { cn } from "../lib/cn";

export type MenuItem = {
	id: string;
	label: string;
	disabled?: boolean;
	destructive?: boolean;
};

let {
	trigger,
	items,
	open = $bindable(false),
	placement = "bottom-start",
	class: classProp,
	onselect,
}: {
	trigger: Snippet;
	items: MenuItem[];
	open?: boolean;
	placement?: AnchorPlacement;
	class?: string;
	onselect?: (id: string) => void;
} = $props();

const id = $props.id();
let triggerEl = $state<HTMLButtonElement>();
let floating = $state<HTMLDivElement>();
let index = $state(0);

const enabled = $derived(items.filter((i) => !i.disabled));

function close() {
	open = false;
	triggerEl?.focus();
}

$effect(() => {
	if (!open || !triggerEl || !floating) return;
	index = 0;
	const stopAnchor = anchor(triggerEl, floating, { placement, gap: 6 });
	const stopDismiss = dismissable([triggerEl, floating], close);
	return () => {
		stopAnchor();
		stopDismiss();
	};
});

$effect(() => {
	if (!open || !floating) return;
	const rows = [
		...floating.querySelectorAll<HTMLElement>("[role='menuitem']:not([disabled])"),
	];
	rows[index]?.focus();
});

function onkeydown(event: KeyboardEvent) {
	const next = rove(enabled as unknown as HTMLElement[], index, event.key);
	if (next === null) return;
	event.preventDefault();
	index = next;
}
</script>

<button
	bind:this={triggerEl}
	type="button"
	aria-haspopup="menu"
	aria-expanded={open}
	aria-controls={open ? id : undefined}
	onclick={() => (open = !open)}
	class="inline-flex rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
>
	{@render trigger()}
</button>

{#if open}
	<div
		bind:this={floating}
		{id}
		role="menu"
		tabindex="-1"
		{onkeydown}
		class={cn(
			"anchored z-50 min-w-44 rounded-xl border border-border bg-popover p-1 shadow-2xl",
			classProp,
		)}
	>
		{#each items as item (item.id)}
			<button
				type="button"
				role="menuitem"
				disabled={item.disabled}
				onclick={() => {
					onselect?.(item.id);
					close();
				}}
				class={cn(
					"flex w-full items-center rounded-md px-2.5 py-1.5 text-left text-sm outline-none transition-colors",
					"hover:bg-foreground/[0.06] focus-visible:bg-foreground/[0.06]",
					"disabled:pointer-events-none disabled:opacity-50",
					item.destructive ? "text-[var(--destructive)]" : "text-foreground",
				)}
			>
				{item.label}
			</button>
		{/each}
	</div>
{/if}
