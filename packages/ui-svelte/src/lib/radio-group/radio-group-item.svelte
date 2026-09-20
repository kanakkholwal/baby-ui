<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import { getRadioGroup, RADIO_DOT, RADIO_RING, RADIO_TEXT } from "./context";

let {
	children,
	value,
	label,
	description,
	disabled = false,
	class: classProp,
}: {
	children?: Snippet;
	value: string;
	label?: string;
	description?: string;
	disabled?: boolean;
	class?: string;
} = $props();

const group = getRadioGroup();
const id = $props.id();
const checked = $derived(group.value === value);
const off = $derived(disabled || group.disabled);

function onkeydown(event: KeyboardEvent) {
	const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
	const back = event.key === "ArrowUp" || event.key === "ArrowLeft";
	if (!forward && !back) return;
	event.preventDefault();
	group.step(value, forward ? 1 : -1);
}
</script>

<label
	for={id}
	data-slot="radio-group-item"
	class={cn(
		"inline-flex cursor-pointer items-start gap-2.5 text-foreground",
		group.variant === "card" &&
			"rounded-xl border border-border bg-card px-3.5 py-3 transition-colors hover:border-border-strong has-checked:border-primary",
		RADIO_TEXT[group.size],
		classProp,
	)}
>
	<input
		{id}
		{value}
		type="radio"
		name={group.name}
		disabled={off}
		{checked}
		data-value={value}
		onchange={() => group.setValue(value)}
		{onkeydown}
		class="peer sr-only"
	/>
	<span
		aria-hidden="true"
		class={cn(
			"mt-0.5 grid shrink-0 place-items-center rounded-full border-2 border-muted-foreground/50 bg-background transition-colors peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
			RADIO_RING[group.size],
		)}
	>
		<span data-on={checked} class={cn("radio-dot rounded-full bg-primary", RADIO_DOT[group.size])}
		></span>
	</span>
	<span class="min-w-0">
		{#if children}
			{@render children()}
		{:else if label}
			<span class="block">{label}</span>
		{/if}
		{#if description}
			<span class="block text-muted-foreground text-xs leading-relaxed">{description}</span>
		{/if}
	</span>
</label>
