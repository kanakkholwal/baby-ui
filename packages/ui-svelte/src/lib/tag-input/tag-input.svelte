<script lang="ts">
import Badge from "../badge/badge.svelte";
import { cn } from "../lib/cn";
import { type TagInputSize, tagInput } from "./variants";

let {
	tags = $bindable<string[]>([]),
	placeholder = "Add a tag…",
	max,
	disabled = false,
	invalid = false,
	size = "md",
	label,
	class: classProp,
}: {
	tags?: string[];
	placeholder?: string;
	max?: number;
	disabled?: boolean;
	/** Marks the field invalid from outside, e.g. a form error. */
	invalid?: boolean;
	size?: TagInputSize;
	label?: string;
	class?: string;
} = $props();

let draft = $state("");

const s = $derived(tagInput({ size }));
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
	data-slot="tag-input"
	data-disabled={disabled || undefined}
	aria-invalid={invalid || undefined}
	class={cn(s.root(), classProp)}
>
	{#each tags as tag (tag)}
		<Badge variant="secondary" size={size === "sm" ? "sm" : "md"} class={s.chip()}>
			<span class={s.chipLabel()}>{tag}</span>
			<button
				type="button"
				aria-label="Remove {tag}"
				{disabled}
				onclick={() => (tags = tags.filter((t) => t !== tag))}
				class={s.chipRemove()}
			>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
					<path d="M18 6 6 18M6 6l12 12" />
				</svg>
			</button>
		</Badge>
	{/each}

	<input
		bind:value={draft}
		type="text"
		aria-label={label}
		aria-invalid={invalid || undefined}
		placeholder={full ? "" : placeholder}
		{disabled}
		{onkeydown}
		onblur={add}
		class={s.input()}
	/>

	<span role="status" class="sr-only">{tags.length} tags</span>
</div>
