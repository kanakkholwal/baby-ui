<script lang="ts">
import { cn } from "../lib/cn";

type Size = "sm" | "md" | "lg" | "xl";

type Props = {
	checked?: boolean;
	indeterminate?: boolean;
	disabled?: boolean;
	size?: Size;
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

const BOX: Record<Size, string> = {
	sm: "size-3.5 rounded-[4px]",
	md: "size-4 rounded-[5px]",
	lg: "size-5 rounded-md",
	xl: "size-6 rounded-lg",
};
const MARK: Record<Size, string> = {
	sm: "size-2.5",
	md: "size-3",
	lg: "size-3.5",
	xl: "size-4",
};
const TEXT: Record<Size, string> = {
	sm: "text-xs",
	md: "text-sm",
	lg: "text-sm",
	xl: "text-base",
};

const id = $props.id();
let el = $state<HTMLInputElement>();

// indeterminate is a DOM property, not an attribute, so it has to be set here.
$effect(() => {
	if (el) el.indeterminate = indeterminate;
});
</script>

{#snippet control()}
	<span class={cn("relative inline-grid shrink-0 place-items-center", BOX[size], !label && !description && classProp)}>
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
			class={cn(
				"pointer-events-none grid size-full place-items-center border-2 border-muted-foreground/50 bg-background transition-[background-color,border-color,transform] duration-150 ease-[var(--ease-out)]",
				"peer-hover:border-muted-foreground peer-active:scale-[0.92]",
				"peer-checked:border-primary peer-checked:bg-primary peer-indeterminate:border-primary peer-indeterminate:bg-primary",
				"peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
				"motion-reduce:transition-none",
				BOX[size],
			)}
		>
			{#if indeterminate}
				<svg
					viewBox="0 0 12 12"
					fill="none"
					aria-hidden="true"
					class={cn("text-primary-foreground", MARK[size])}
				>
					<path d="M3 6h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
				</svg>
			{:else}
				<svg
					viewBox="0 0 12 12"
					fill="none"
					aria-hidden="true"
					data-on={checked}
					class={cn("checkbox-check text-primary-foreground", MARK[size])}
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
			{#if label}<span class={cn("block text-foreground", TEXT[size])}>{label}</span>{/if}
			{#if description}
				<span class="block text-muted-foreground text-xs leading-relaxed">{description}</span>
			{/if}
		</label>
	</div>
{:else}
	{@render control()}
{/if}
