<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";
import InputGroup from "../input-group/input-group.svelte";
import InputGroupAddon from "../input-group/input-group-addon.svelte";
import InputGroupButton from "../input-group/input-group-button.svelte";
import InputGroupInput from "../input-group/input-group-input.svelte";
import { cn } from "../lib/cn";
import {
	PASSWORD_ICONS,
	PASSWORD_LABELS,
	type PasswordLabels,
	type PasswordRule,
	passwordStrength,
} from "./core";
import {
	type PasswordInputFeedback,
	type PasswordInputSize,
	passwordInput,
	STRENGTH_TONES,
} from "./variants";

let {
	value = $bindable(""),
	onValueChange,
	rules,
	feedback = "both",
	size = "md",
	labels: labelsProp,
	class: classProp,
	autocomplete,
	onkeydown,
	onkeyup,
	onblur,
	...rest
}: Omit<HTMLInputAttributes, "size" | "type" | "value" | "class"> & {
	/** Bindable. */
	value?: string;
	onValueChange?: (value: string) => void;
	/** Checklist and meter source. Omit for a plain sign-in field. */
	rules?: PasswordRule[];
	feedback?: PasswordInputFeedback;
	size?: PasswordInputSize;
	labels?: Partial<PasswordLabels>;
	/** Applied to the wrapper; everything else lands on the `<input>`. */
	class?: string;
} = $props();

const labels = $derived({ ...PASSWORD_LABELS, ...labelsProp });
const s = $derived(passwordInput({ size, feedback }));
let visible = $state(false);
let capsLock = $state(false);
const strength = $derived(rules ? passwordStrength(value, rules) : null);
</script>

{#snippet icon(paths: readonly string[], className?: string)}
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.8"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
		class={className}
	>
		{#each paths as d (d)}<path {d} />{/each}
	</svg>
{/snippet}

<div data-slot="password-input" class={cn(s.root(), classProp)}>
	<InputGroup {size}>
		<InputGroupInput
			type={visible ? "text" : "password"}
			bind:value={() => value, (next) => {
				value = next;
				onValueChange?.(next);
			}}
			autocomplete={autocomplete ?? (rules ? "new-password" : "current-password")}
			spellcheck={false}
			autocapitalize="none"
			class={s.control()}
			onkeydown={(e) => {
				capsLock = e.getModifierState("CapsLock");
				onkeydown?.(e);
			}}
			onkeyup={(e) => {
				capsLock = e.getModifierState("CapsLock");
				onkeyup?.(e);
			}}
			onblur={(e) => {
				capsLock = false;
				onblur?.(e);
			}}
			{...rest}
		/>
		<InputGroupAddon align="inline-end">
			<InputGroupButton
				size="icon-xs"
				aria-label={visible ? labels.hide : labels.show}
				aria-pressed={visible}
				onclick={() => (visible = !visible)}
			>
				{@render icon(visible ? PASSWORD_ICONS.eyeOff : PASSWORD_ICONS.eye)}
			</InputGroupButton>
		</InputGroupAddon>
	</InputGroup>
	{#if capsLock}
		<p class={s.caps()}>{@render icon(PASSWORD_ICONS.caps, "size-3.5")}{labels.capsLock}</p>
	{/if}
	{#if strength && rules}
		<div class="flex items-center gap-3">
			<div class={cn(s.meter(), "flex-1")} aria-hidden="true">
				{#each [1, 2, 3, 4] as step (step)}
					<span class={cn(s.segment(), strength.score >= step && STRENGTH_TONES[strength.score])}></span>
				{/each}
			</div>
			<span class={s.level()} aria-hidden="true">{labels.levels[strength.score]}</span>
		</div>
		<span class="sr-only" aria-live="polite">
			{strength.score ? `${labels.strength}: ${labels.levels[strength.score]}` : ""}
		</span>
		<ul class={s.rules()} aria-label={labels.strength}>
			{#each rules as rule (rule.id)}
				{@const met = strength.met.includes(rule.id)}
				<li data-met={met} class={s.rule()}>
					{@render icon(met ? PASSWORD_ICONS.check : PASSWORD_ICONS.dot, s.ruleIcon())}
					{rule.label}
					<span class="sr-only">{met ? "(met)" : "(not met)"}</span>
				</li>
			{/each}
		</ul>
	{/if}
</div>
