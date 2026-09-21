<script lang="ts">
import { cn } from "../lib/cn";
import { type CheckboxSize, checkbox } from "./variants";

type Props = {
	checked?: boolean;
	indeterminate?: boolean;
	disabled?: boolean;
	size?: CheckboxSize;
	label?: string;
	description?: string;
	class?: string;
	name?: string;
};

let {
	checked = $bindable(false),
	indeterminate = false,
	disabled = false,
	size = "md",
	label,
	description,
	class: classProp,
	name,
}: Props = $props();

const frame = $derived(checkbox({ size }));
const id = $props.id();
let el = $state<HTMLInputElement>();

// indeterminate is a DOM property, not an attribute, so it has to be set here.
$effect(() => {
	if (el) el.indeterminate = indeterminate;
});
</script>

{#snippet control()}
	<span class={cn(frame.wrapper(), !label && !description && classProp)}>
		<input
			bind:this={el}
			bind:checked
			{id}
			{name}
			{disabled}
			type="checkbox"
			class="peer absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
		/>
		<span aria-hidden="true" class={frame.box()}>
			{#if indeterminate}
				<svg
					viewBox="0 0 12 12"
					fill="none"
					aria-hidden="true"
					class={cn("text-primary-foreground", frame.mark())}
				>
					<path d="M3 6h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
				</svg>
			{:else}
				<svg
					viewBox="0 0 12 12"
					fill="none"
					aria-hidden="true"
					data-on={checked}
					class={cn("checkbox-check text-primary-foreground", frame.mark())}
				>
					<path
						d="M2.5 6.2 4.8 8.5 9.5 3.6"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			{/if}
		</span>
	</span>
{/snippet}

<!-- Bare, so this can replace a shadcn checkbox; the wrapper only appears with a label. -->
{#if label || description}
	<div class={cn("inline-flex items-start gap-2.5", disabled && "opacity-50", classProp)}>
		{@render control()}
		<label for={id} class="cursor-pointer select-none">
			{#if label}<span class={frame.text()}>{label}</span>{/if}
			{#if description}
				<span class="block text-muted-foreground text-xs leading-relaxed">{description}</span>
			{/if}
		</label>
	</div>
{:else}
	{@render control()}
{/if}
