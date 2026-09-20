<script lang="ts">
import { cn } from "../lib/cn";

export type CommandItem = {
	id: string;
	label: string;
	group?: string;
	shortcut?: string;
};

let {
	items,
	open = $bindable(false),
	placeholder = "Type a command or search…",
	emptyLabel = "No results",
	class: classProp,
	onselect,
}: {
	items: CommandItem[];
	open?: boolean;
	placeholder?: string;
	emptyLabel?: string;
	class?: string;
	onselect?: (id: string) => void;
} = $props();

const id = $props.id();
let query = $state("");
let index = $state(0);
let input = $state<HTMLInputElement>();
let dialog = $state<HTMLDialogElement>();

const matches = $derived(
	items.filter((i) => i.label.toLowerCase().includes(query.trim().toLowerCase())),
);

$effect(() => {
	if (!dialog) return;
	if (open && !dialog.open) {
		dialog.showModal();
		query = "";
		index = 0;
		input?.focus();
	}
	if (!open && dialog.open) dialog.close();
});

$effect(() => {
	void query;
	index = 0;
});

function run(item: CommandItem) {
	onselect?.(item.id);
	open = false;
}

function onkeydown(event: KeyboardEvent) {
	if (event.key === "ArrowDown") {
		event.preventDefault();
		index = (index + 1) % Math.max(1, matches.length);
	} else if (event.key === "ArrowUp") {
		event.preventDefault();
		index = (index - 1 + matches.length) % Math.max(1, matches.length);
	} else if (event.key === "Enter") {
		event.preventDefault();
		const match = matches[index];
		if (match) run(match);
	}
}
</script>

<dialog
	bind:this={dialog}
	aria-label="Command palette"
	onclose={() => (open = false)}
	oncancel={(e) => {
		e.preventDefault();
		open = false;
	}}
	onclick={(e) => {
		if (e.target === dialog) open = false;
	}}
	class="command-dialog mx-auto mt-[12vh] mb-auto bg-transparent p-0 text-foreground backdrop:bg-black/50"
>
	<div
		class={cn(
			"w-[min(34rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl",
			classProp,
		)}
	>
		<div class="flex items-center gap-2 border-border border-b px-3">
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4 shrink-0 text-muted-foreground">
				<circle cx="7.2" cy="7.2" r="4.2" stroke="currentColor" stroke-width="1.4" />
				<path d="m10.4 10.4 3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
			</svg>
			<input
				bind:this={input}
				bind:value={query}
				type="text"
				role="combobox"
				aria-expanded="true"
				aria-controls={id}
				aria-activedescendant="{id}-{index}"
				{placeholder}
				{onkeydown}
				class="h-12 w-full bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
			/>
		</div>

		<div {id} role="listbox" class="max-h-80 overflow-y-auto p-1.5">
			{#each matches as item, i (item.id)}
				<button
					type="button"
					role="option"
					id="{id}-{i}"
					aria-selected={i === index}
					onclick={() => run(item)}
					class={cn(
						"flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
						i === index ? "bg-foreground/[0.06] text-foreground" : "text-muted-foreground",
					)}
				>
					<span class="truncate">{item.label}</span>
					{#if item.shortcut}
						<kbd class="shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
							{item.shortcut}
						</kbd>
					{/if}
				</button>
			{:else}
				<p class="px-2.5 py-6 text-center text-muted-foreground text-sm">{emptyLabel}</p>
			{/each}
		</div>
	</div>
</dialog>
