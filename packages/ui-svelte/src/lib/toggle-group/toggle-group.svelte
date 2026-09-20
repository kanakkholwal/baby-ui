<script lang="ts">
import { cn } from "../lib/cn";

export type ToggleOption = { value: string; label: string; disabled?: boolean };

let {
	options,
	value = $bindable<string | string[]>(""),
	multiple = false,
	disabled = false,
	label = "Options",
	class: classProp,
}: {
	options: ToggleOption[];
	value?: string | string[];
	multiple?: boolean;
	disabled?: boolean;
	label?: string;
	class?: string;
} = $props();

function isOn(option: string) {
	return multiple ? (value as string[]).includes(option) : value === option;
}

function toggle(option: string) {
	if (!multiple) {
		value = value === option ? "" : option;
		return;
	}
	const list = value as string[];
	value = list.includes(option) ? list.filter((v) => v !== option) : [...list, option];
}
</script>

<div
	role="group"
	aria-label={label}
	class={cn(
		"inline-flex items-center gap-0.5 rounded-xl border border-border bg-card p-1",
		disabled && "opacity-50",
		classProp,
	)}
>
	{#each options as option (option.value)}
		<button
			type="button"
			aria-pressed={isOn(option.value)}
			disabled={disabled || option.disabled}
			onclick={() => toggle(option.value)}
			class="inline-flex h-7 items-center rounded-lg px-2.5 font-medium text-muted-foreground text-xs outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-pressed:bg-foreground/[0.08] aria-pressed:text-foreground disabled:pointer-events-none disabled:opacity-50"
		>
			{option.label}
		</button>
	{/each}
</div>
