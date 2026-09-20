<script lang="ts">
import { cn } from "../lib/cn";

type Option = { value: string; label: string };

let {
	options,
	value = $bindable(""),
	orientation = "vertical",
	disabled = false,
	class: classProp,
	name,
}: {
	options: Option[];
	value?: string;
	orientation?: "vertical" | "horizontal";
	disabled?: boolean;
	class?: string;
	name?: string;
} = $props();

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
		orientation === "vertical" ? "flex-col" : "flex-row flex-wrap items-center",
		disabled && "opacity-50",
		classProp,
	)}
>
	{#each options as option, i (option.value)}
		<label
			class="inline-flex cursor-pointer items-center gap-2 text-foreground text-sm"
			for="{group}-{option.value}"
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
				class="grid size-4 shrink-0 place-items-center rounded-full border border-input bg-background transition-colors peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring"
			>
				<span
					class="radio-dot size-2 rounded-full bg-primary"
					data-on={value === option.value}
				></span>
			</span>
			{option.label}
		</label>
	{/each}
</div>
