<script lang="ts">
import { cn } from "../lib/cn";

type Size = "sm" | "md" | "lg" | "xl";
type Variant = "default" | "card";
export type RadioOption = { value: string; label: string; description?: string };

let {
	options,
	value = $bindable(""),
	orientation = "vertical",
	variant = "default",
	size = "md",
	disabled = false,
	class: classProp,
	name,
}: {
	options: RadioOption[];
	value?: string;
	orientation?: "vertical" | "horizontal";
	variant?: Variant;
	size?: Size;
	disabled?: boolean;
	class?: string;
	name?: string;
} = $props();

const RING: Record<Size, string> = {
	sm: "size-3.5",
	md: "size-4",
	lg: "size-5",
	xl: "size-6",
};
const DOT: Record<Size, string> = {
	sm: "size-1.5",
	md: "size-2",
	lg: "size-2.5",
	xl: "size-3",
};
const TEXT: Record<Size, string> = {
	sm: "text-xs",
	md: "text-sm",
	lg: "text-sm",
	xl: "text-base",
};

let root = $state<HTMLDivElement>();
const group = $props.id();

function focusAt(index: number) {
	const next = options[(index + options.length) % options.length];
	if (!next) return;
	value = next.value;
	root?.querySelector<HTMLElement>(`[data-value="${CSS.escape(next.value)}"]`)?.focus();
}

function onkeydown(event: KeyboardEvent, index: number) {
	const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
	const back = event.key === "ArrowUp" || event.key === "ArrowLeft";
	if (!forward && !back) return;
	event.preventDefault();
	focusAt(index + (forward ? 1 : -1));
}
</script>

<div
	bind:this={root}
	role="radiogroup"
	aria-orientation={orientation}
	class={cn(
		"flex gap-2",
		orientation === "vertical" ? "flex-col" : "flex-row flex-wrap items-start",
		disabled && "opacity-50",
		classProp,
	)}
>
	{#each options as option, i (option.value)}
		<label
			for="{group}-{option.value}"
			class={cn(
				"inline-flex cursor-pointer items-start gap-2.5 text-foreground",
				variant === "card" &&
					"rounded-xl border border-border bg-card px-3.5 py-3 transition-colors hover:border-border-strong has-checked:border-primary",
				TEXT[size],
			)}
		>
			<input
				id="{group}-{option.value}"
				type="radio"
				{name}
				{disabled}
				value={option.value}
				checked={value === option.value}
				data-value={option.value}
				onchange={() => (value = option.value)}
				onkeydown={(e) => onkeydown(e, i)}
				class="peer sr-only"
			/>
			<span
				aria-hidden="true"
				class={cn(
					"mt-0.5 grid shrink-0 place-items-center rounded-full border-2 border-muted-foreground/50 bg-background transition-colors peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
					RING[size],
				)}
			>
				<span
					data-on={value === option.value}
					class={cn("radio-dot rounded-full bg-primary", DOT[size])}
				></span>
			</span>
			<span class="min-w-0">
				<span class="block">{option.label}</span>
				{#if option.description}
					<span class="block text-muted-foreground text-xs leading-relaxed">
						{option.description}
					</span>
				{/if}
			</span>
		</label>
	{/each}
</div>
