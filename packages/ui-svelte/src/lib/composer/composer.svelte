<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

let {
	value = $bindable(""),
	placeholder = "Send a message…",
	disabled = false,
	busy = false,
	maxRows = 8,
	toolbar,
	class: classProp,
	onsubmit,
}: {
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	busy?: boolean;
	maxRows?: number;
	toolbar?: Snippet;
	class?: string;
	onsubmit?: (value: string) => void;
} = $props();

let field = $state<HTMLTextAreaElement>();

$effect(() => {
	void value;
	if (!field) return;
	const line = Number.parseFloat(getComputedStyle(field).lineHeight) || 20;
	field.style.height = "auto";
	field.style.height = `${Math.min(field.scrollHeight, line * maxRows)}px`;
});

function submit() {
	const text = value.trim();
	if (!text || busy) return;
	onsubmit?.(text);
	value = "";
}

// Enter sends, Shift+Enter breaks the line. The reverse strands anyone writing prose.
function onkeydown(event: KeyboardEvent) {
	if (event.key === "Enter" && !event.shiftKey) {
		event.preventDefault();
		submit();
	}
}
</script>

<div
	class={cn(
		"flex w-full flex-col gap-2 rounded-2xl border border-input bg-background p-2",
		"focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40",
		disabled && "pointer-events-none opacity-50",
		classProp,
	)}
>
	<textarea
		bind:this={field}
		bind:value
		rows="1"
		{placeholder}
		{disabled}
		{onkeydown}
		class="max-h-48 w-full resize-none bg-transparent px-2 py-1.5 text-foreground text-sm outline-none placeholder:text-muted-foreground"
	></textarea>

	<div class="flex items-center justify-between gap-2">
		<div class="flex items-center gap-1">{@render toolbar?.()}</div>
		<button
			type="button"
			onclick={submit}
			disabled={busy || value.trim() === ""}
			aria-label={busy ? "Sending" : "Send message"}
			class="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition-[transform,scale,translate] duration-[var(--duration-press)] ease-[var(--ease-out)] active:scale-[var(--press-scale)] disabled:pointer-events-none disabled:opacity-40"
		>
			{#if busy}
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="spinner size-3.5">
					<circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1.8" opacity="0.3" />
					<path d="M14.2 8A6.2 6.2 0 0 0 8 1.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
				</svg>
			{:else}
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
					<path d="M8 13V3.5M4 7l4-4 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			{/if}
		</button>
	</div>
</div>
