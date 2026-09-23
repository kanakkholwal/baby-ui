<script lang="ts">
import { tick } from "svelte";
import { cn } from "../lib/cn";
import { captureRows } from "../lib/flip";

export type ReorderItem = { id: string; label: string };

let {
	items = $bindable<ReorderItem[]>([]),
	label = "Reorderable list",
	disabled = false,
	class: classProp,
	onreorder,
}: {
	items?: ReorderItem[];
	label?: string;
	disabled?: boolean;
	class?: string;
	onreorder?: (items: ReorderItem[]) => void;
} = $props();

const uid = $props.id();
const THRESHOLD = 5;

let listEl = $state<HTMLOListElement>();
let grabbed = $state<string | null>(null);
let dragging = $state<string | null>(null);
let spoken = $state("");

let snapshot: ReorderItem[] | null = null;
let session: {
	id: string;
	node: HTMLElement;
	pointerId: number;
	startY: number;
	grabOffset: number;
	centers: { id: string; center: number }[];
} | null = null;

function indexOf(id: string) {
	return items.findIndex((item) => item.id === id);
}

function commit(next: ReorderItem[]) {
	const play = listEl ? captureRows(listEl, dragging ?? undefined) : null;
	items = next;
	onreorder?.(next);
	if (play) void tick().then(() => play());
}

function move(from: number, to: number) {
	if (to < 0 || to >= items.length || from === to) return;
	const next = [...items];
	const [moved] = next.splice(from, 1);
	if (moved) next.splice(to, 0, moved);
	commit(next);
}

function announce(id: string, verb: string) {
	const index = indexOf(id);
	if (index < 0) return;
	spoken = `${items[index]?.label}, ${verb} ${index + 1} of ${items.length}.`;
}

function grab(id: string) {
	snapshot = [...items];
	grabbed = id;
	announce(id, "grabbed at position");
}

function drop(id: string) {
	grabbed = null;
	snapshot = null;
	announce(id, "dropped at position");
}

function cancel() {
	const original = snapshot;
	const active = Boolean(dragging || grabbed);
	snapshot = null;
	grabbed = null;
	dragging = null;
	release();
	if (original && active) {
		items = original;
		onreorder?.(original);
		spoken = "Reorder cancelled, original order restored.";
	}
}

function release() {
	if (!session) return;
	session.node.style.removeProperty("translate");
	session.node.style.removeProperty("will-change");
	if (listEl?.hasPointerCapture(session.pointerId)) {
		listEl.releasePointerCapture(session.pointerId);
	}
	session = null;
}

function step(id: string, delta: -1 | 1) {
	const from = indexOf(id);
	move(from, from + delta);
	announce(id, "moved to position");
	void tick().then(() => {
		listEl?.querySelector<HTMLElement>(`[data-reorder-id="${CSS.escape(id)}"]`)?.focus({
			preventScroll: true,
		});
	});
}

function onkeydown(event: KeyboardEvent, id: string) {
	if (disabled) return;
	const held = grabbed === id;
	if (event.key === " " || event.key === "Enter") {
		event.preventDefault();
		if (held) drop(id);
		else grab(id);
	} else if (held && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
		event.preventDefault();
		step(id, event.key === "ArrowUp" ? -1 : 1);
	} else if (held && event.key === "Escape") {
		event.preventDefault();
		cancel();
	}
}

function reposition(clientY: number) {
	if (!session) return;
	const rowTop = session.node.getBoundingClientRect().top;
	const current = Number.parseFloat(session.node.style.translate.replace("px", "")) || 0;
	session.node.style.translate = `0 ${current + (clientY - session.grabOffset - rowTop)}px`;
}

function onpointerdown(event: PointerEvent, id: string) {
	if (disabled || grabbed || session || event.button !== 0) return;
	const node = event.currentTarget as HTMLElement;
	const rect = node.getBoundingClientRect();
	snapshot = [...items];
	session = {
		id,
		node,
		pointerId: event.pointerId,
		startY: event.clientY,
		grabOffset: event.clientY - rect.top,
		centers: [...(listEl?.querySelectorAll<HTMLElement>("[data-reorder-id]") ?? [])].map(
			(el) => {
				const box = el.getBoundingClientRect();
				return { id: el.dataset.reorderId ?? "", center: box.top + box.height / 2 };
			},
		),
	};
	event.preventDefault();
	node.focus({ preventScroll: true });
	listEl?.setPointerCapture(event.pointerId);
}

function onpointermove(event: PointerEvent) {
	if (!session || session.pointerId !== event.pointerId) return;
	if (!dragging) {
		if (Math.abs(event.clientY - session.startY) < THRESHOLD) return;
		dragging = session.id;
		session.node.style.setProperty("will-change", "translate");
	}
	reposition(event.clientY);

	// Centres were measured once, so the drop index is stable while rows animate.
	const from = indexOf(session.id);
	const to = session.centers.filter(
		(entry) => entry.id !== session?.id && event.clientY > entry.center,
	).length;
	if (from >= 0 && to !== from) move(from, to);
}

function onpointerup(event: PointerEvent) {
	if (!session || session.pointerId !== event.pointerId) return;
	const id = session.id;
	const moved = dragging === id;
	dragging = null;
	snapshot = null;
	release();
	if (moved) announce(id, "dropped at position");
}
</script>

<svelte:window
	{onpointermove}
	{onpointerup}
	onpointercancel={cancel}
	onblur={() => (session || grabbed ? cancel() : undefined)}
/>

<div class={cn("w-full", classProp)}>
	<ol bind:this={listEl} aria-label={label} class="m-0 flex list-none flex-col gap-1.5 p-0">
		{#each items as item, i (item.id)}
			{const lifted = grabbed === item.id || dragging === item.id}
			<li data-flip-key={item.id}>
				<button
					type="button"
					data-reorder-id={item.id}
					aria-pressed={lifted}
					aria-describedby="{uid}-hint"
					{disabled}
					onkeydown={(e) => onkeydown(e, item.id)}
					onpointerdown={(e) => onpointerdown(e, item.id)}
					ondragstart={(e) => e.preventDefault()}
					class={cn(
						"relative flex w-full touch-pinch-zoom select-none items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-foreground text-sm outline-none",
						"transition-[background-color,border-color,box-shadow] duration-[var(--duration-press)] ease-[var(--ease-out)] motion-reduce:transition-none",
						"focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
						lifted
							? "z-10 cursor-grabbing border-primary bg-card shadow-lg"
							: "cursor-grab border-border bg-card hover:border-border-strong enabled:active:cursor-grabbing",
					)}
				>
					<svg viewBox="0 0 10 14" aria-hidden="true" class="h-3.5 w-2.5 shrink-0 fill-current text-muted-foreground">
						<circle cx="2.5" cy="2.5" r="1.2" />
						<circle cx="7.5" cy="2.5" r="1.2" />
						<circle cx="2.5" cy="7" r="1.2" />
						<circle cx="7.5" cy="7" r="1.2" />
						<circle cx="2.5" cy="11.5" r="1.2" />
						<circle cx="7.5" cy="11.5" r="1.2" />
					</svg>
					<span class="min-w-0 flex-1 truncate">{item.label}</span>
					<span class="font-mono text-[11px] text-muted-foreground tabular-nums">{i + 1}</span>
				</button>
			</li>
		{/each}
	</ol>

	<span id="{uid}-hint" class="sr-only">
		Drag to reorder. With the keyboard, Space grabs the row, the arrow keys move it, Space drops
		it, and Escape restores the original order.
	</span>
	<span role="status" aria-live="polite" class="sr-only">{spoken}</span>
</div>
