<script lang="ts">
import { cn } from "../lib/cn";

let {
	tags = $bindable<string[]>([]),
	placeholder = "Add a tag…",
	max,
	disabled = false,
	label,
	class: classProp,
}: {
	tags?: string[];
	placeholder?: string;
	max?: number;
	disabled?: boolean;
	label?: string;
	class?: string;
} = $props();

let draft = $state("");
let input = $state<HTMLInputElement>();

const full = $derived(max !== undefined && tags.length >= max);

function add() {
	const value = draft.trim();
	if (!value || full || tags.includes(value)) {
		draft = "";
		return;
	}
	tags = [...tags, value];
	draft = "";
}

function onkeydown(event: KeyboardEvent) {
	if (event.key === "Enter" || event.key === ",") {
		event.preventDefault();
		add();
		return;
	}
	// Backspace on an empty field removes the last tag, which is the expected shortcut.
	if (event.key === "Backspace" && draft === "" && tags.length > 0) {
		tags = tags.slice(0, -1);
	}
}
</script>

<div
	class={cn(
		"flex w-full flex-wrap items-center gap-1.5 rounded-lg border border-input bg-background p-1.5",
		"focus-within:border-ring focus-within:ring-2 focus-within:ring-ring",
		disabled && "pointer-events-none opacity-50",
		classProp,
	)}
>
	{#each tags as tag (tag)}
		<span class="inline-flex h-6 items-center gap-1 rounded-md bg-card px-2 text-foreground text-xs">
			{tag}
			<button
				type="button"
				aria-label="Remove {tag}"
				onclick={() => (tags = tags.filter((t) => t !== tag))}
				class="text-muted-foreground transition-colors hover:text-foreground"
			>
				<svg viewBox="0 0 12 12" fill="none" aria-hidden="true" class="size-3">
					<path d="m3 3 6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			</button>
		</span>
	{/each}

	<input
		bind:this={input}
		bind:value={draft}
		type="text"
		aria-label={label}
		placeholder={full ? "" : placeholder}
		{disabled}
		{onkeydown}
		onblur={add}
		class="h-6 min-w-24 flex-1 bg-transparent px-1 text-foreground text-sm outline-none placeholder:text-muted-foreground"
	/>

	<span role="status" class="sr-only">{tags.length} tags</span>
</div>
