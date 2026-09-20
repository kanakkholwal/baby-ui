<script lang="ts">
import { anchor, dismissable, rove } from "../lib/anchor";
import { cn } from "../lib/cn";

export type ComboOption = { value: string; label: string };

let {
	options,
	value = $bindable(""),
	placeholder = "Search…",
	emptyLabel = "No matches",
	class: classProp,
	label,
}: {
	options: ComboOption[];
	value?: string;
	placeholder?: string;
	emptyLabel?: string;
	class?: string;
	label?: string;
} = $props();

const id = $props.id();
let open = $state(false);
let query = $state("");
let input = $state<HTMLInputElement>();
let floating = $state<HTMLDivElement>();
let index = $state(0);

const selected = $derived(options.find((o) => o.value === value));
const matches = $derived(
	options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase())),
);

// Closed, the field reads as the current selection; open, it is the search box.
const display = $derived(open ? query : (selected?.label ?? ""));

$effect(() => {
	if (!open || !input || !floating) return;
	const stopAnchor = anchor(input, floating, { gap: 6, matchWidth: true });
	const stopDismiss = dismissable([input, floating], close);
	return () => {
		stopAnchor();
		stopDismiss();
	};
});

$effect(() => {
	void query;
	index = 0;
});

function show() {
	if (open) return;
	query = "";
	index = Math.max(
		0,
		options.findIndex((o) => o.value === value),
	);
	open = true;
}

function close() {
	open = false;
	query = "";
}

function commit(option: ComboOption) {
	value = option.value;
	close();
	input?.focus();
}

function onkeydown(event: KeyboardEvent) {
	if (event.key === "Escape") {
		if (open) {
			event.preventDefault();
			close();
		}
		return;
	}
	if (event.key === "Tab") {
		close();
		return;
	}
	if (!open) show();
	if (event.key === "Enter") {
		event.preventDefault();
		const match = matches[index];
		if (match) commit(match);
		return;
	}
	if (matches.length === 0) return;
	const next = rove(matches as unknown as HTMLElement[], index, event.key);
	if (next === null) return;
	event.preventDefault();
	index = next;
}
</script>

<div class={cn("relative w-64", classProp)}>
	<input
		bind:this={input}
		type="text"
		role="combobox"
		value={display}
		aria-expanded={open}
		aria-controls={open ? id : undefined}
		aria-autocomplete="list"
		aria-activedescendant={open ? `${id}-${index}` : undefined}
		aria-label={label}
		{placeholder}
		onpointerdown={show}
		oninput={(e) => {
			show();
			query = e.currentTarget.value;
		}}
		{onkeydown}
		class="h-9 w-full rounded-lg border border-input bg-background px-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
	/>
</div>

{#if open}
	<div
		bind:this={floating}
		{id}
		role="listbox"
		style:max-height="min(14rem, var(--anchor-available-height, 14rem))"
		class="anchored scroll-area z-50 overflow-y-auto rounded-xl border border-border bg-popover p-1 shadow-2xl"
	>
		{#each matches as option, i (option.value)}
			<button
				type="button"
				role="option"
				id="{id}-{i}"
				aria-selected={i === index}
				onpointermove={() => (index = i)}
				onclick={() => commit(option)}
				class={cn(
					"flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-left text-foreground text-sm transition-colors",
					i === index && "bg-foreground/[0.06]",
				)}
			>
				{option.label}
				{#if option.value === value}
					<svg viewBox="0 0 14 14" fill="none" aria-hidden="true" class="size-3.5 shrink-0">
						<path d="M3 7.4 5.6 10 11 4.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				{/if}
			</button>
		{:else}
			<p class="px-2.5 py-2 text-muted-foreground text-sm">{emptyLabel}</p>
		{/each}
	</div>
{/if}
