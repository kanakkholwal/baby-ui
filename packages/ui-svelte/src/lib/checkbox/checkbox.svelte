<script lang="ts">
import { cn } from "../lib/cn.js";

type Props = {
	checked?: boolean;
	indeterminate?: boolean;
	disabled?: boolean;
	label?: string;
	class?: string;
	name?: string;
};

let {
	checked = $bindable(false),
	indeterminate = false,
	disabled = false,
	label,
	class: classProp,
	name,
}: Props = $props();

const id = $props.id();
let el = $state<HTMLInputElement>();

// indeterminate is a DOM property, not an attribute, so it has to be set here.
$effect(() => {
	if (el) el.indeterminate = indeterminate;
});
</script>

<div class={cn("inline-flex items-center gap-2", disabled && "opacity-50", classProp)}>
	<span class="relative inline-grid size-4 shrink-0 place-items-center">
		<input
			bind:this={el}
			bind:checked
			{id}
			{name}
			{disabled}
			type="checkbox"
			class="peer absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
		/>
		<span
			aria-hidden="true"
			class="pointer-events-none grid size-4 place-items-center rounded-[5px] border border-input bg-background transition-colors duration-150 peer-checked:border-primary peer-checked:bg-primary peer-indeterminate:border-primary peer-indeterminate:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring"
		>
			{#if indeterminate}
				<svg viewBox="0 0 12 12" fill="none" class="size-3 text-primary-foreground">
					<path d="M3 6h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
				</svg>
			{:else}
				<svg viewBox="0 0 12 12" fill="none" class="checkbox-check size-3 text-primary-foreground" data-on={checked}>
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
	{#if label}
		<label for={id} class="cursor-pointer text-foreground text-sm select-none">{label}</label>
	{/if}
</div>
