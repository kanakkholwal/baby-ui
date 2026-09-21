<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import { getRadioGroup } from "./context";
import { radioGroup } from "./variants";

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
const frame = $derived(radioGroup({ variant: group.variant, size: group.size }));

function onkeydown(event: KeyboardEvent) {
	const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
	const back = event.key === "ArrowUp" || event.key === "ArrowLeft";
	if (!forward && !back) return;
	event.preventDefault();
	group.step(value, forward ? 1 : -1);
}
</script>

<label for={id} data-slot="radio-group-item" class={cn(frame.label(), classProp)}>
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
	<span aria-hidden="true" class={frame.ring()}>
		<span data-on={checked} class={frame.dot()}></span>
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
