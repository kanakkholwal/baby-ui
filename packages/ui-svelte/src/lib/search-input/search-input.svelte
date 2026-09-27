<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";
import InputGroup from "../input-group/input-group.svelte";
import InputGroupAddon from "../input-group/input-group-addon.svelte";
import InputGroupButton from "../input-group/input-group-button.svelte";
import InputGroupInput from "../input-group/input-group-input.svelte";
import { cn } from "../lib/cn";
import Shortcut from "../shortcut/shortcut.svelte";
import Spinner from "../spinner/spinner.svelte";
import { type SearchInputSize, searchInput } from "./variants";

let {
	value = $bindable(""),
	onValueChange,
	onSearch,
	debounceMs = 250,
	loading = false,
	shortcut,
	size = "md",
	clearLabel = "Clear search",
	loadingLabel = "Searching",
	placeholder = "Search…",
	class: classProp,
	onkeydown,
	"aria-label": ariaLabel = "Search",
	...rest
}: Omit<HTMLInputAttributes, "value" | "size" | "type"> & {
	/** Bindable query. */
	value?: string;
	onValueChange?: (value: string) => void;
	/** Fires once typing pauses for `debounceMs`, and at once on clear or Enter. */
	onSearch?: (query: string) => void;
	debounceMs?: number;
	/** Swaps the leading icon for a spinner while results load. */
	loading?: boolean;
	/** Focuses the field, e.g. `"mod+k"`. The hint shows while the field is empty. */
	shortcut?: string;
	size?: SearchInputSize;
	clearLabel?: string;
	loadingLabel?: string;
} = $props();

const s = $derived(searchInput({ size }));
let input = $state<HTMLInputElement | null>(null);
let skip = true;

// Debounced; the first run is skipped so mounting with a value doesn't search.
$effect(() => {
	const query = value;
	const wait = debounceMs;
	if (skip) {
		skip = false;
		return;
	}
	const timer = setTimeout(() => onSearch?.(query), wait);
	return () => clearTimeout(timer);
});

function update(next: string) {
	value = next;
	onValueChange?.(next);
}

function clear() {
	update("");
	onSearch?.("");
	input?.focus();
}
</script>

<InputGroup {size} data-slot="search-input" class={cn(s.root(), classProp)}>
	<InputGroupAddon>
		{#if loading}
			<Spinner size="sm" label={loadingLabel} />
		{:else}
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class={s.icon()}>
				<path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
				<path d="M21 21l-6 -6" />
			</svg>
		{/if}
	</InputGroupAddon>
	<InputGroupInput
		bind:ref={input}
		type="search"
		{value}
		{placeholder}
		aria-label={ariaLabel}
		class={s.input()}
		oninput={(e) => update(e.currentTarget.value)}
		onkeydown={(e) => {
			if (e.key === "Escape" && value) {
				e.preventDefault();
				clear();
			} else if (e.key === "Enter") onSearch?.(value);
			onkeydown?.(e);
		}}
		{...rest}
	/>
	{#if value}
		<InputGroupAddon align="inline-end">
			<InputGroupButton size="icon-xs" aria-label={clearLabel} class={s.clear()} onclick={clear}>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
					<path d="M18 6 6 18M6 6l12 12" />
				</svg>
			</InputGroupButton>
		</InputGroupAddon>
	{/if}
	{#if shortcut}
		<!-- Kept mounted while hidden so the shortcut still focuses a non-empty field. -->
		<InputGroupAddon align="inline-end" class={value ? "hidden" : undefined}>
			<Shortcut {shortcut} size="sm" joined ontrigger={() => input?.focus()} />
		</InputGroupAddon>
	{/if}
</InputGroup>
