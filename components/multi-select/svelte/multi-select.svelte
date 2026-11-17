<script lang="ts">
import Badge from "../../badge/svelte/badge.svelte";
import Command from "../../command/svelte/command.svelte";
import CommandEmpty from "../../command/svelte/command-empty.svelte";
import CommandGroup from "../../command/svelte/command-group.svelte";
import CommandInput from "../../command/svelte/command-input.svelte";
import CommandItem from "../../command/svelte/command-item.svelte";
import CommandList from "../../command/svelte/command-list.svelte";
import CommandSeparator from "../../command/svelte/command-separator.svelte";
import { cn } from "../../lib/cn";
import Popover from "../../popover/svelte/popover.svelte";
import PopoverContent from "../../popover/svelte/popover-content.svelte";
import PopoverTrigger from "../../popover/svelte/popover-trigger.svelte";
import RollingDigits from "../../rolling-digits/svelte/rolling-digits.svelte";
import {
	MULTI_SELECT_CHIP,
	MULTI_SELECT_LABELS,
	type MultiSelectLabels,
	type MultiSelectOption,
	type MultiSelectSize,
	multiSelect,
	toggleValue,
} from "../variants";

let {
	options,
	value = $bindable([]),
	onValueChange,
	open = $bindable(false),
	name,
	clearable = false,
	max,
	loading = false,
	onCreate,
	maxChips = 3,
	size = "default",
	disabled = false,
	invalid = false,
	id,
	"aria-label": ariaLabel,
	"aria-labelledby": ariaLabelledBy,
	labels: labelsProp,
	class: classProp,
}: {
	options: MultiSelectOption[];
	/** Bindable selection, in option order. */
	value?: string[];
	onValueChange?: (value: string[]) => void;
	/** Bindable: whether the list is open. */
	open?: boolean;
	/** Submits each chosen value under this name, so the field works inside a native form. */
	name?: string;
	/** Shows a button that clears every chip. */
	clearable?: boolean;
	/** Most choices allowed; the rest of the list turns off once it is reached. */
	max?: number;
	/** Options are loading: the list shows a status line and the field is marked busy. */
	loading?: boolean;
	/** Offers "Create" for search text no option matches; add the option and select it in `onCreate`. */
	onCreate?: (label: string) => void;
	/** Chips shown before collapsing the rest into "+N". */
	maxChips?: number;
	size?: MultiSelectSize;
	disabled?: boolean;
	invalid?: boolean;
	id?: string;
	"aria-label"?: string;
	"aria-labelledby"?: string;
	labels?: Partial<MultiSelectLabels>;
	class?: string;
} = $props();

const labels = $derived({ ...MULTI_SELECT_LABELS, ...labelsProp });
const s = $derived(multiSelect({ size }));
let search = $state("");
let field = $state<HTMLDivElement | null>(null);
const selected = $derived(options.filter((o) => value.includes(o.value)));
const shown = $derived(selected.slice(0, maxChips));
const hidden = $derived(selected.length - shown.length);
const atLimit = $derived(max !== undefined && value.length >= max);
const typed = $derived(search.trim());
const canCreate = $derived(
	onCreate !== undefined &&
		typed !== "" &&
		!options.some((o) => o.label.toLowerCase() === typed.toLowerCase()),
);
const allSelected = $derived.by(() => {
	const enabled = options.filter((o) => !o.disabled);
	return enabled.length > 0 && enabled.every((o) => value.includes(o.value));
});
const chipSize = $derived(MULTI_SELECT_CHIP[size]);

function set(next: string[]) {
	value = next;
	onValueChange?.(next);
}
const toggle = (item: string) => set(toggleValue(options, value, item));
function removeLast() {
	const last = selected.at(-1);
	if (last) toggle(last.value);
}
</script>

<!-- Always mounted: the tick draws in when the row is chosen and back out when it is not. -->
{#snippet checkIcon(on: boolean)}
	<svg viewBox="0 0 14 14" fill="none" aria-hidden="true" data-on={on} class={s.check()}>
		<path d="M3 7.4 5.6 10 11 4.2" pathLength="1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
{/snippet}

<Popover bind:open>
	<div
		bind:this={field}
		data-slot="multi-select"
		data-disabled={disabled || undefined}
		class={cn(s.root(), classProp)}
	>
		{#each shown as option (option.value)}
			<Badge variant="secondary" size={chipSize} class={s.chip()}>
				<span class={s.chipLabel()}>{option.label}</span>
				<button
					type="button"
					aria-label="{labels.remove} {option.label}"
					{disabled}
					class={s.chipRemove()}
					onclick={() => toggle(option.value)}
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
						<path d="M18 6 6 18M6 6l12 12" />
					</svg>
				</button>
			</Badge>
		{/each}
		{#if hidden > 0}
			<Badge size={chipSize} variant="outline" class="pop-in">{labels.more.split("{count}")[0]}<RollingDigits value={hidden} startOnView={false} />{labels.more.split("{count}")[1]}</Badge>
		{/if}
		<PopoverTrigger
			{id}
			role="combobox"
			aria-label={ariaLabel}
			aria-labelledby={ariaLabelledBy}
			aria-invalid={invalid || undefined}
			aria-busy={loading || undefined}
			{disabled}
			data-slot="multi-select-trigger"
			data-placeholder={selected.length ? undefined : ""}
			class={s.trigger()}
			onkeydown={(e: KeyboardEvent) => {
				if (e.key === "Backspace") {
					e.preventDefault();
					removeLast();
				}
			}}
		>
			<span class="truncate">{selected.length ? "" : labels.placeholder}</span>
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class={s.chevron()}>
				<path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</PopoverTrigger>
		{#if clearable && value.length > 0 && !disabled}
			<button type="button" aria-label={labels.clear} class={s.clear()} onclick={() => set([])}>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
					<path d="M18 6 6 18M6 6l12 12" />
				</svg>
			</button>
		{/if}
		{#if name}{#each value as item (item)}<input type="hidden" {name} value={item} />{/each}{/if}
	</div>
	<PopoverContent customAnchor={field} align="start" class={s.content()}>
		<Command class={s.list()}>
			<CommandInput
				placeholder={labels.search}
				value={search}
				oninput={(e: Event) => (search = (e.currentTarget as HTMLInputElement).value)}
				onkeydown={(e: KeyboardEvent) => {
					if (e.key === "Backspace" && !search) removeLast();
				}}
			/>
			<CommandList>
				{#if loading}<p role="status" class={s.status()}>{labels.loading}</p>{/if}
				<CommandEmpty>{canCreate ? "" : labels.empty}</CommandEmpty>
				<CommandGroup>
					{#each options as option (option.value)}
						{@const checked = value.includes(option.value)}
						<CommandItem
							value={option.value}
							keywords="{option.label} {option.keywords ?? ''}"
							disabled={option.disabled || (atLimit && !checked)}
							class={s.item()}
							onSelect={() => toggle(option.value)}
						>
							<span class="flex min-w-0 items-center gap-2">
								<span aria-hidden="true" data-checked={checked} class={s.box()}>
									{@render checkIcon(checked)}
								</span>
								<span class="truncate">{option.label}</span>
								{#if checked}<span class="sr-only">, {labels.selected}</span>{/if}
							</span>
						</CommandItem>
					{/each}
				</CommandGroup>
				{#if canCreate}
					<CommandGroup>
						<CommandItem
							value="__create"
							keywords={typed}
							class={s.item()}
							onSelect={() => {
								onCreate?.(typed);
								search = "";
							}}
						>
							{labels.create.replace("{value}", typed)}
						</CommandItem>
					</CommandGroup>
				{/if}
				{#if !search && max === undefined}
					<CommandSeparator />
					<CommandGroup>
						<CommandItem
							value="__select-all"
							disabled={allSelected}
							onSelect={() =>
								set(options.filter((o) => !o.disabled || value.includes(o.value)).map((o) => o.value))}
						>
							{labels.selectAll}
						</CommandItem>
						<CommandItem value="__clear" disabled={!value.length} onSelect={() => set([])}>
							{labels.clear}
						</CommandItem>
					</CommandGroup>
				{/if}
				{#if atLimit}<p role="status" class={s.status()}>{labels.limit.replace("{count}", String(max))}</p>{/if}
			</CommandList>
		</Command>
	</PopoverContent>
</Popover>
