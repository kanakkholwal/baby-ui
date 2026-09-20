<script lang="ts">
import { cn } from "../lib/cn";

export type CommandItem = {
	id: string;
	label: string;
	description?: string;
	group?: string;
	shortcut?: string;
};

let {
	items,
	open = $bindable(false),
	placeholder = "Type a command or search…",
	emptyLabel = "No results",
	footer,
	class: classProp,
	onselect,
}: {
	items: CommandItem[];
	open?: boolean;
	placeholder?: string;
	emptyLabel?: string;
	footer?: string;
	class?: string;
	onselect?: (id: string) => void;
} = $props();

const uid = $props.id();
let query = $state("");
let index = $state(0);
let input = $state<HTMLInputElement>();
let listEl = $state<HTMLDivElement>();
let dialog = $state<HTMLDialogElement>();

const matches = $derived.by(() => {
	const q = query.trim().toLowerCase();
	if (!q) return items;
	return items.filter(
		(i) => i.label.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q),
	);
});

// Group order follows first appearance, so the list never reshuffles as you type.
const groups = $derived.by(() => {
	const out: { name: string; items: { item: CommandItem; i: number }[] }[] = [];
	matches.forEach((item, i) => {
		const name = item.group ?? "";
		let bucket = out.find((g) => g.name === name);
		if (!bucket) {
			bucket = { name, items: [] };
			out.push(bucket);
		}
		bucket.items.push({ item, i });
	});
	return out;
});

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

$effect(() => {
	listEl
		?.querySelector(`#${CSS.escape(`${uid}-${index}`)}`)
		?.scrollIntoView({ block: "nearest" });
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
	} else if (event.key === "Home") {
		event.preventDefault();
		index = 0;
	} else if (event.key === "End") {
		event.preventDefault();
		index = Math.max(0, matches.length - 1);
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
			"flex max-h-[min(30rem,70dvh)] w-[min(34rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl",
			classProp,
		)}
	>
		<div class="flex shrink-0 items-center gap-2 border-border border-b px-3">
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
				aria-controls="{uid}-list"
				aria-activedescendant="{uid}-{index}"
				{placeholder}
				{onkeydown}
				class="h-12 w-full bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
			/>
		</div>

		<div
			bind:this={listEl}
			id="{uid}-list"
			role="listbox"
			class="scroll-area min-h-0 flex-1 overflow-y-auto overscroll-contain py-1.5"
		>
			{#each groups as group (group.name)}
				{#if group.name}
					<p
						class="px-4 pt-2 pb-1 font-semibold text-[11px] text-muted-foreground uppercase tracking-wider"
					>
						{group.name}
					</p>
				{/if}
				<div class="px-1.5">
					{#each group.items as entry (entry.item.id)}
						<button
							type="button"
							role="option"
							id="{uid}-{entry.i}"
							aria-selected={entry.i === index}
							onpointermove={() => (index = entry.i)}
							onclick={() => run(entry.item)}
							class={cn(
								"flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
								entry.i === index
									? "bg-foreground/[0.06] text-foreground"
									: "text-muted-foreground",
							)}
						>
							<span class="min-w-0">
								<span class="block truncate">{entry.item.label}</span>
								{#if entry.item.description}
									<span class="block truncate text-muted-foreground text-xs">
										{entry.item.description}
									</span>
								{/if}
							</span>
							{#if entry.item.shortcut}
								<kbd
									class="shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
								>
									{entry.item.shortcut}
								</kbd>
							{/if}
						</button>
					{/each}
				</div>
			{:else}
				<p class="px-4 py-10 text-center text-muted-foreground text-sm">{emptyLabel}</p>
			{/each}
		</div>

		{#if footer}
			<p class="shrink-0 border-border border-t px-4 py-2 text-[11px] text-muted-foreground">
				{footer}
			</p>
		{/if}
	</div>
</dialog>
