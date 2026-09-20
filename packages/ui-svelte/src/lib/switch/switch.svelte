<script lang="ts">
import { cn } from "../lib/cn";

type Size = "sm" | "md" | "lg" | "xl";

type Props = {
	checked?: boolean;
	disabled?: boolean;
	size?: Size;
	label?: string;
	class?: string;
};

let {
	checked = $bindable(false),
	disabled = false,
	size = "md",
	label,
	class: classProp,
}: Props = $props();

const TRACK: Record<Size, string> = {
	sm: "h-4 w-7",
	md: "h-5 w-9",
	lg: "h-6 w-11",
	xl: "h-7 w-[3.25rem]",
};
const THUMB: Record<Size, string> = {
	sm: "size-3",
	md: "size-4",
	lg: "size-5",
	xl: "size-6",
};
const TRAVEL: Record<Size, string> = {
	sm: "0.75rem",
	md: "1rem",
	lg: "1.25rem",
	xl: "1.5rem",
};

const id = $props.id();
let pressed = $state(false);
let shaking = $state(false);

// Refusal is feedback: a disabled switch says no rather than doing nothing.
function refuse() {
	shaking = false;
	requestAnimationFrame(() => (shaking = true));
}
</script>

<span class={cn("inline-flex items-center gap-2.5", classProp)}>
	<button
		{id}
		type="button"
		role="switch"
		aria-checked={checked}
		aria-label={label ? undefined : "Toggle"}
		aria-disabled={disabled || undefined}
		onclick={() => (disabled ? refuse() : (checked = !checked))}
		onpointerdown={() => (pressed = true)}
		onpointerup={() => (pressed = false)}
		onpointerleave={() => (pressed = false)}
		class={cn(
			"relative inline-flex shrink-0 items-center rounded-full border border-transparent bg-input p-0.5 transition-colors duration-[var(--duration-press)] ease-[var(--ease-out)]",
			"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
			"aria-checked:bg-primary aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
			TRACK[size],
		)}
	>
		<span
			aria-hidden="true"
			data-shake={shaking || undefined}
			onanimationend={() => (shaking = false)}
			style:transform={checked ? `translateX(${TRAVEL[size]})` : "translateX(0)"}
			style:scale={pressed && !disabled ? "0.9" : "1"}
			class={cn(
				"switch-thumb rounded-full bg-background shadow-sm",
				THUMB[size],
			)}
		></span>
	</button>
	{#if label}
		<label for={id} class={cn("text-foreground text-sm", disabled && "opacity-50")}>
			{label}
		</label>
	{/if}
</span>
