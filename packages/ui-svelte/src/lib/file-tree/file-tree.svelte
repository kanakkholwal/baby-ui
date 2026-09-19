<script lang="ts">
import { cn } from "../lib/cn.js";
import { type FileTreeNode, flatten } from "./types.js";

type Props = {
	tree: FileTreeNode[];
	class?: string;
	indent?: number;
	showGuides?: boolean;
	defaultExpanded?: boolean;
	onselect?: (id: string) => void;
};

let {
	tree,
	class: classProp,
	indent = 14,
	showGuides = true,
	defaultExpanded = true,
	onselect,
}: Props = $props();

let open = $state<Record<string, boolean>>({});
let selected = $state<string | null>(null);
let focused = $state<string | null>(null);
let root = $state<HTMLDivElement>();

const rows = $derived(flatten(tree, open, defaultExpanded));
const activeId = $derived(focused ?? rows[0]?.id ?? null);

function focusRow(id: string) {
	focused = id;
	root?.querySelector<HTMLElement>(`[data-row="${CSS.escape(id)}"]`)?.focus();
}

function move(from: string, delta: number) {
	const index = rows.findIndex((r) => r.id === from);
	const next = rows[index + delta];
	if (next) focusRow(next.id);
}

function onkeydown(event: KeyboardEvent, id: string) {
	const row = rows.find((r) => r.id === id);
	if (!row) return;

	switch (event.key) {
		case "ArrowDown":
			event.preventDefault();
			move(id, 1);
			break;
		case "ArrowUp":
			event.preventDefault();
			move(id, -1);
			break;
		case "ArrowRight":
			event.preventDefault();
			if (row.isFolder && !row.expanded) open[id] = true;
			else if (row.isFolder) move(id, 1);
			break;
		case "ArrowLeft": {
			event.preventDefault();
			if (row.isFolder && row.expanded) {
				open[id] = false;
				break;
			}
			const parent = id.split("/").slice(0, -1).join("/");
			if (parent) focusRow(parent);
			break;
		}
		case "Enter":
		case " ":
			event.preventDefault();
			select(row.id, row.isFolder, row.expanded);
			break;
	}
}

function select(id: string, isFolder: boolean, expanded: boolean) {
	if (isFolder) open[id] = !expanded;
	selected = id;
	onselect?.(id);
}
</script>

<div
	bind:this={root}
	role="tree"
	aria-label="Files"
	class={cn("select-none font-mono text-[13px]", classProp)}
>
	{#each rows as row (row.id)}
		<div
			role="treeitem"
			aria-level={row.depth + 1}
			aria-selected={selected === row.id}
			aria-expanded={row.isFolder ? row.expanded : undefined}
			data-row={row.id}
			tabindex={activeId === row.id ? 0 : -1}
			onkeydown={(e) => onkeydown(e, row.id)}
			onclick={() => select(row.id, row.isFolder, row.expanded)}
			onfocus={() => (focused = row.id)}
			style:padding-left="{row.depth * indent + 8}px"
			class={cn(
				"tree-row flex cursor-pointer items-center gap-1.5 rounded-md py-1 pr-2 outline-none transition-colors",
				"hover:bg-foreground/[0.06] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
				selected === row.id ? "bg-foreground/[0.06] text-foreground" : "text-muted-foreground",
				showGuides && row.depth > 0 && "border-border/60 border-l",
			)}
		>
			{#if row.isFolder}
				<svg
					viewBox="0 0 16 16"
					fill="none"
					aria-hidden="true"
					class="size-3.5 shrink-0 transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
					style:transform={row.expanded ? "rotate(90deg)" : "none"}
				>
					<path d="m6 4 4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			{:else}
				<span class="size-3.5 shrink-0"></span>
			{/if}
			<span class="truncate">{row.node.name}</span>
		</div>
	{/each}
</div>

<style>
	.tree-row {
		animation: tree-row-in 200ms var(--ease-out);
	}

	@keyframes tree-row-in {
		from {
			opacity: 0;
			transform: translateY(-2px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.tree-row {
			animation: none;
		}
	}
</style>
