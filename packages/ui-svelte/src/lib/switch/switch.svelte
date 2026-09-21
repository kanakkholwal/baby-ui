<script lang="ts">
import { cn } from "../lib/cn";
import { SWITCH_TRAVEL, type SwitchSize, switchThumb, switchTrack } from "./variants";

type Props = {
	checked?: boolean;
	disabled?: boolean;
	size?: SwitchSize;
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

const id = $props.id();
let pressed = $state(false);
let shaking = $state(false);

// Refusal is feedback: a disabled switch says no rather than doing nothing.
function refuse() {
	shaking = false;
	requestAnimationFrame(() => (shaking = true));
}
</script>

{#snippet control()}
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
		class={cn(switchTrack({ size }), !label && classProp)}
	>
		<span
			aria-hidden="true"
			data-shake={shaking || undefined}
			onanimationend={() => (shaking = false)}
			style:transform={checked ? `translateX(${SWITCH_TRAVEL[size]})` : "translateX(0)"}
			style:scale={pressed && !disabled ? "0.9" : "1"}
			class={switchThumb({ size })}
		></span>
	</button>
{/snippet}

<!-- Bare, so this can replace a shadcn switch; the wrapper only appears with a label. -->
{#if label}
	<span class={cn("inline-flex items-center gap-2.5", classProp)}>
		{@render control()}
		<label for={id} class={cn("text-foreground text-sm", disabled && "opacity-50")}>
			{label}
		</label>
	</span>
{:else}
	{@render control()}
{/if}
