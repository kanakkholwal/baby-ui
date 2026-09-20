<script lang="ts">
import { type AnchorPlacement, anchor, dismissable, rove } from "../lib/anchor";
import { cn } from "../lib/cn";

export type SelectOption = { value: string; label: string; disabled?: boolean };

let {
	options,
	value = $bindable(""),
	placeholder = "Select an option",
	disabled = false,
	placement = "bottom-start",
	class: classProp,
	label,
}: {
	options: SelectOption[];
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	placement?: AnchorPlacement;
	class?: string;
	label?: string;
} = $props();

const id = $props.id();
let open = $state(false);
let triggerEl = $state<HTMLButtonElement>();
let floating = $state<HTMLDivElement>();
let index = $state(0);

const selected = $derived(options.find((o) => o.value === value));

function close() {
	open = false;
	triggerEl?.focus();
}

$effect(() => {
	if (!open || !triggerEl || !floating) return;
	index = Math.max(
		0,
		options.findIndex((o) => o.value === value),
	);
	const stopAnchor = anchor(triggerEl, floating, { placement, gap: 6, matchWidth: true });
	const stopDismiss = dismissable([triggerEl, floating], close);
	return () => {
		stopAnchor();
		stopDismiss();
	};
});

$effect(() => {
	if (!open || !floating) return;
	floating.querySelectorAll<HTMLElement>("[role='option']")[index]?.focus();
});

function onkeydown(event: KeyboardEvent) {
	if (
		!open &&
		(event.key === "ArrowDown" || event.key === "Enter" || event.key === " ")
	) {
		event.preventDefault();
		open = true;
		return;
	}
	const next = rove(options as unknown as HTMLElement[], index, event.key);
	if (next === null) return;
	event.preventDefault();
	index = next;
}
</script>

<button
	bind:this={triggerEl}
	type="button"
	role="combobox"
	aria-expanded={open}
	aria-controls={open ? id : undefined}
	aria-haspopup="listbox"
	aria-label={label}
	{disabled}
	onclick={() => (open = !open)}
	{onkeydown}
	class={cn(
		"inline-flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors",
		"focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
		"disabled:cursor-not-allowed disabled:opacity-50",
		classProp,
	)}
>
	<span class={selected ? "text-foreground" : "text-muted-foreground"}>
		{selected?.label ?? placeholder}
	</span>
	<svg
		viewBox="0 0 16 16"
		fill="none"
		aria-hidden="true"
		style:transform={open ? "rotate(180deg)" : "none"}
		class="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ease-[var(--ease-out)]"
	>
		<path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
</button>

{#if open}
	<div
		bind:this={floating}
		{id}
		role="listbox"
		tabindex="-1"
		{onkeydown}
		style:max-height="min(16rem, var(--anchor-available-height, 16rem))"
		class="anchored z-50 overflow-y-auto rounded-xl border border-border bg-popover p-1 shadow-2xl"
	>
		{#each options as option (option.value)}
			<button
				type="button"
				role="option"
				aria-selected={value === option.value}
				disabled={option.disabled}
				onclick={() => {
					value = option.value;
					close();
				}}
				class="flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-left text-foreground text-sm outline-none transition-colors hover:bg-foreground/[0.06] focus-visible:bg-foreground/[0.06] disabled:pointer-events-none disabled:opacity-50"
			>
				{option.label}
				{#if value === option.value}
					<svg viewBox="0 0 14 14" fill="none" aria-hidden="true" class="size-3.5">
						<path d="M3 7.4 5.6 10 11 4.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				{/if}
			</button>
		{/each}
	</div>
{/if}
