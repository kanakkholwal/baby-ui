<script lang="ts">
import { cn } from "../lib/cn";

export type ReorderItem = { id: string; label: string };

let {
	items = $bindable<ReorderItem[]>([]),
	label = "Reorderable list",
	class: classProp,
}: { items?: ReorderItem[]; label?: string; class?: string } = $props();

let dragging = $state<string | null>(null);

function move(from: number, to: number) {
	if (to < 0 || to >= items.length) return;
	const next = [...items];
	const [moved] = next.splice(from, 1);
	if (moved) next.splice(to, 0, moved);
	items = next;
}

// Keyboard reordering is the accessible path; drag is the accelerator, not the API.
function onkeydown(event: KeyboardEvent, index: number) {
	if (!event.altKey) return;
	if (event.key === "ArrowUp") {
		event.preventDefault();
		move(index, index - 1);
	} else if (event.key === "ArrowDown") {
		event.preventDefault();
		move(index, index + 1);
	}
}
</script>

<ul aria-label={label} class={cn("flex flex-col gap-1.5", classProp)}>
	{#each items as item, i (item.id)}
		<li
			draggable="true"
			ondragstart={() => (dragging = item.id)}
			ondragend={() => (dragging = null)}
			ondragover={(e) => e.preventDefault()}
			ondrop={() => {
				const from = items.findIndex((x) => x.id === dragging);
				if (from >= 0) move(from, i);
				dragging = null;
			}}
			class={cn(
				"flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-foreground text-sm transition-opacity",
				dragging === item.id && "opacity-50",
			)}
		>
			<button
				type="button"
				aria-label="Reorder {item.label}. Hold Alt and press the arrow keys."
				onkeydown={(e) => onkeydown(e, i)}
				class="cursor-grab text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
					<path d="M6 4h.01M10 4h.01M6 8h.01M10 8h.01M6 12h.01M10 12h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
				</svg>
			</button>
			<span class="flex-1">{item.label}</span>
			<span class="font-mono text-[11px] text-muted-foreground tabular-nums">{i + 1}</span>
		</li>
	{/each}
</ul>
