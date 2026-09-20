<script lang="ts">
import type { HTMLTextareaAttributes } from "svelte/elements";
import { cn } from "../lib/cn";

type Size = "sm" | "md" | "lg" | "xl";
type Variant = "outline" | "soft";

type Props = {
	value?: string;
	class?: string;
	rows?: number;
	size?: Size;
	variant?: Variant;
	autoGrow?: boolean;
	maxRows?: number;
	invalid?: boolean;
	label?: string;
	description?: string;
	maxlength?: number;
	showCount?: boolean;
} & Omit<HTMLTextareaAttributes, "rows" | "value" | "class" | "maxlength">;

let {
	value = $bindable(""),
	class: classProp,
	rows = 3,
	size = "md",
	variant = "outline",
	autoGrow = false,
	maxRows = 10,
	invalid = false,
	label,
	description,
	maxlength,
	showCount = false,
	...rest
}: Props = $props();

const SIZE: Record<Size, string> = {
	sm: "px-2.5 py-1.5 text-xs",
	md: "px-3 py-2 text-sm",
	lg: "px-3.5 py-2.5 text-sm",
	xl: "px-4 py-3 text-base",
};

const VARIANT: Record<Variant, string> = {
	outline: "border-input bg-background",
	soft: "border-transparent bg-card",
};

const id = $props.id();
const wrapped = $derived(Boolean(label || description || showCount));
let el = $state<HTMLTextAreaElement>();

// Height follows content, never eases: easing lags behind the character just typed.
$effect(() => {
	void value;
	if (!autoGrow || !el) return;
	const line = Number.parseFloat(getComputedStyle(el).lineHeight) || 20;
	el.style.height = "auto";
	el.style.height = `${Math.min(el.scrollHeight, line * maxRows)}px`;
});
</script>

{#snippet field()}
	<textarea
		{...rest}
		{id}
		{maxlength}
		bind:this={el}
		bind:value
		{rows}
		aria-invalid={invalid || undefined}
		aria-describedby={description ? `${id}-description` : undefined}
		class={cn(
			"min-h-16 w-full rounded-lg border text-foreground leading-relaxed",
			"placeholder:text-muted-foreground",
			"transition-[box-shadow,border-color] duration-[var(--duration-press)] ease-[var(--ease-out)]",
			"outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
			"disabled:cursor-not-allowed disabled:opacity-50",
			"aria-[invalid=true]:border-[var(--destructive)] aria-[invalid=true]:focus-visible:ring-[color-mix(in_oklch,var(--destructive)_40%,transparent)]",
			autoGrow ? "resize-none overflow-y-hidden" : "resize-y",
			VARIANT[variant],
			SIZE[size],
			classProp,
		)}
	></textarea>
{/snippet}

<!-- Bare, so this can replace a shadcn textarea; the wrapper only appears with a label. -->
{#if wrapped}
	<div class="flex w-full flex-col gap-1.5">
		{#if label}
			<label for={id} class="font-medium text-foreground text-sm">{label}</label>
		{/if}

		{@render field()}

		{#if description || showCount}
			<div class="flex items-start justify-between gap-3">
				{#if description}
					<p id="{id}-description" class="text-muted-foreground text-xs leading-relaxed">
						{description}
					</p>
				{/if}
				{#if showCount}
					<p class="ml-auto shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
						{value.length}{maxlength ? `/${maxlength}` : ""}
					</p>
				{/if}
			</div>
		{/if}
	</div>
{:else}
	{@render field()}
{/if}
