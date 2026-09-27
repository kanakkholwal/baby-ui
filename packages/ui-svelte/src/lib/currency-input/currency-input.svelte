<script lang="ts">
import { tick } from "svelte";
import type { HTMLInputAttributes } from "svelte/elements";
import InputGroup from "../input-group/input-group.svelte";
import InputGroupAddon from "../input-group/input-group-addon.svelte";
import InputGroupInput from "../input-group/input-group-input.svelte";
import InputGroupText from "../input-group/input-group-text.svelte";
import { cn } from "../lib/cn";
import {
	caretAfter,
	currencyParts,
	formatEditing,
	formatMinor,
	inRange,
	significantBefore,
	toMinor,
} from "./core";
import {
	type CurrencyInputAffix,
	type CurrencyInputSize,
	currencyInput,
} from "./variants";

let {
	value = $bindable(null),
	onValueChange,
	currency,
	locale,
	min,
	max,
	affix = "both",
	size = "md",
	class: classProp,
	onfocus,
	onblur,
	...rest
}: Omit<HTMLInputAttributes, "size" | "type" | "value" | "class" | "min" | "max"> & {
	/** Bindable. Minor units (cents for USD, yen for JPY); null when empty. */
	value?: number | null;
	onValueChange?: (value: number | null) => void;
	/** ISO 4217 code, e.g. "USD". */
	currency: string;
	locale?: string;
	/** Bounds in minor units; out-of-range values are flagged, not clamped. */
	min?: number;
	max?: number;
	affix?: CurrencyInputAffix;
	size?: CurrencyInputSize;
	/** Applied to the wrapper; everything else lands on the `<input>`. */
	class?: string;
} = $props();

const s = $derived(currencyInput({ size, affix }));
const parts = $derived(currencyParts(locale, currency));
// While focused the field keeps what was typed ("12."); on blur it shows the full format.
let draft = $state<string | null>(null);
const text = $derived(draft ?? (value === null ? "" : formatMinor(value, parts, locale)));
const invalid = $derived(!inRange(value, min, max));

async function onInput(el: HTMLInputElement) {
	const count = significantBefore(el.value, el.selectionStart ?? el.value.length, parts);
	const next = formatEditing(el.value, parts);
	draft = next;
	value = toMinor(next, parts);
	onValueChange?.(value);
	el.value = next;
	await tick();
	const at = caretAfter(el.value, count, parts);
	el.setSelectionRange(at, at);
}
</script>

<InputGroup data-slot="currency-input" {size} class={cn(s.root(), classProp)}>
	{#if affix !== "code" && parts.symbol}
		<InputGroupAddon>
			<InputGroupText class={s.symbol()} aria-hidden="true">{parts.symbol}</InputGroupText>
		</InputGroupAddon>
	{/if}
	<InputGroupInput
		inputmode="decimal"
		autocomplete="off"
		placeholder={formatMinor(0, parts, locale)}
		value={text}
		aria-invalid={invalid || rest["aria-invalid"] || undefined}
		class={s.control()}
		onfocus={(e) => {
			draft = text;
			onfocus?.(e);
		}}
		onblur={(e) => {
			draft = null;
			onblur?.(e);
		}}
		oninput={(e) => onInput(e.currentTarget)}
		{...rest}
	/>
	{#if affix !== "symbol"}
		<InputGroupAddon align="inline-end">
			<InputGroupText class={s.code()}>{currency}</InputGroupText>
		</InputGroupAddon>
	{/if}
</InputGroup>
