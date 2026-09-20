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

const matches = $derived(
	options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase())),
);
const selected = $derived(options.find((o) => o.value === value));

$effect(() => {
	if (!open || !input || !floating) return;
	const stopAnchor = anchor(input, floating, { gap: 6, matchWidth: true });
	const stopDismiss = dismissable([input, floating], () => (open = false));
	return () => {
		stopAnchor();
		stopDismiss();
	};
});

$effect(() => {
	void query;
	index = 0;
});

function commit(option: ComboOption) {
	value = option.value;
	query = "";
	open = false;
	input?.focus();
}

function onkeydown(event: KeyboardEvent) {
	if (!open && event.key !== "Escape") open = true;
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
		bind:value={query}
		type="text"
		role="combobox"
		aria-expanded={open}
		aria-controls={open ? id : undefined}
		aria-autocomplete="list"
		aria-activedescendant={open ? `${id}-${index}` : undefined}
		aria-label={label}
		placeholder={selected ? selected.label : placeholder}
		onfocus={() => (open = true)}
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
		class="anchored z-50 overflow-y-auto rounded-xl border border-border bg-popover p-1 shadow-2xl"
	>
		{#each matches as option, i (option.value)}
			<button
				type="button"
				role="option"
				id="{id}-{i}"
				aria-selected={i === index}
				onclick={() => commit(option)}
				class={cn(
					"flex w-full items-center rounded-md px-2.5 py-1.5 text-left text-foreground text-sm transition-colors",
					i === index && "bg-foreground/[0.06]",
				)}
			>
				{option.label}
			</button>
		{:else}
			<p class="px-2.5 py-2 text-muted-foreground text-sm">{emptyLabel}</p>
		{/each}
	</div>
{/if}
