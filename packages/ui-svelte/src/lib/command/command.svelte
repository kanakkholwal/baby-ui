<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getCommandDialogState, hasCommandDialogState, setCommand } from "./context";

let {
	children,
	value = $bindable(""),
	class: classProp,
	...rest
}: {
	children?: Snippet;
	value?: string;
	class?: string;
} & HTMLAttributes<HTMLDivElement> = $props();

const listId = $props.id();
let query = $state("");
let activeId = $state("");
let listEl = $state<HTMLElement>();
let resultCount = $state(0);
const dialogState = hasCommandDialogState() ? getCommandDialogState() : undefined;

function options() {
	return [...(listEl?.querySelectorAll<HTMLElement>("[role='option']") ?? [])];
}

setCommand({
	get query() {
		return query;
	},
	get activeId() {
		return activeId;
	},
	listId,
	setQuery: (next) => {
		query = next;
		activeId = "";
	},
	setActive: (id) => (activeId = id),
	matches: (haystack) => {
		const q = query.trim().toLowerCase();
		return !q || haystack.toLowerCase().includes(q);
	},
	select: () => {
		const rows = options();
		const row = rows.find((r) => r.id === activeId) ?? rows[0];
		row?.click();
	},
	get resultCount() {
		return resultCount;
	},
	setList: (el) => (listEl = el),
	setResultCount: (count) => (resultCount = count),
	move: (delta) => {
		const rows = options();
		if (!rows.length) return;
		const i = rows.findIndex((r) => r.id === activeId);
		const next = rows[(i + delta + rows.length) % rows.length];
		if (next) {
			activeId = next.id;
			next.scrollIntoView({ block: "nearest" });
		}
	},
	first: () => {
		const row = options()[0];
		if (row) activeId = row.id;
	},
	last: () => {
		const rows = options();
		const row = rows[rows.length - 1];
		if (row) activeId = row.id;
	},
});

// The first visible row is highlighted, so Enter always has a target.
$effect(() => {
	void query;
	if (!activeId) {
		const row = options()[0];
		if (row) activeId = row.id;
	}
});

$effect(() => {
	void value;
});

// The native <dialog> stays mounted through a close for the exit transition, so a stale
// search would otherwise survive into the next open; clear it the moment one starts.
$effect(() => {
	if (dialogState?.open) {
		query = "";
		activeId = "";
	}
});
</script>

<div
	{...rest}
	data-slot="command"
	class={cn(
		"relative flex min-h-0 flex-col overflow-hidden rounded-[11px] bg-card text-foreground",
		classProp,
	)}
>
	{@render children?.()}
</div>
