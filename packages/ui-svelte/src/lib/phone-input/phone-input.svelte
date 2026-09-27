<script lang="ts">
import { tick } from "svelte";
import type { HTMLInputAttributes } from "svelte/elements";
import Combobox from "../combobox/combobox.svelte";
import ComboboxContent from "../combobox/combobox-content.svelte";
import ComboboxTrigger from "../combobox/combobox-trigger.svelte";
import CommandEmpty from "../command/command-empty.svelte";
import CommandGroup from "../command/command-group.svelte";
import CommandInput from "../command/command-input.svelte";
import CommandItem from "../command/command-item.svelte";
import CommandList from "../command/command-list.svelte";
import Input from "../input/input.svelte";
import { cn } from "../lib/cn";
import {
	applyDigitEdit,
	caretAfterDigits,
	countryByIso,
	flagOf,
	formatNational,
	maxNationalLength,
	nationalOf,
	PHONE_COUNTRIES,
	PHONE_LABELS,
	type PhoneCountry,
	type PhoneLabels,
	phoneComplete,
	toE164,
} from "./core";
import { type PhoneInputSize, phoneInput } from "./variants";

let {
	value = $bindable(""),
	onValueChange,
	country: iso = $bindable("US"),
	onCountryChange,
	countries = PHONE_COUNTRIES,
	size = "md",
	labels: labelsProp,
	class: classProp,
	disabled = false,
	...rest
}: Omit<HTMLInputAttributes, "size" | "type" | "value" | "class"> & {
	/** Bindable. E.164, e.g. "+14155552671"; empty while nothing is typed. */
	value?: string;
	onValueChange?: (
		value: string,
		detail: { country: PhoneCountry; complete: boolean },
	) => void;
	/** Bindable. ISO 3166 alpha-2, kept separately because some dial codes are shared (+1). */
	country?: string;
	onCountryChange?: (iso: string) => void;
	countries?: PhoneCountry[];
	size?: PhoneInputSize;
	labels?: Partial<PhoneLabels>;
	/** Applied to the wrapper; everything else lands on the `<input>`. */
	class?: string;
} = $props();

const labels = $derived({ ...PHONE_LABELS, ...labelsProp });
const s = $derived(phoneInput({ size }));
const country = $derived(countries.find((c) => c.iso === iso) ?? countryByIso(iso));
const national = $derived(nationalOf(value, country));
const formatted = $derived(formatNational(national, country));
let open = $state(false);
let inputEl = $state<HTMLInputElement | null>(null);

function emit(digits: string, target: PhoneCountry) {
	value = toE164(digits, target);
	onValueChange?.(value, { country: target, complete: phoneComplete(digits, target) });
}

async function onInput(el: HTMLInputElement) {
	const edit = applyDigitEdit(
		el.value,
		el.selectionStart ?? el.value.length,
		national,
		formatted,
	);
	let digits = edit.digits;
	// Pasting a full "+44 ..." number keeps only the national part.
	if (el.value.trim().startsWith("+") && digits.startsWith(country.dial))
		digits = digits.slice(country.dial.length);
	digits = digits.slice(0, maxNationalLength(country));
	emit(digits, country);
	el.value = formatNational(digits, country);
	await tick();
	if (document.activeElement !== el) return;
	const at = caretAfterDigits(el.value, Math.min(edit.before, digits.length));
	el.setSelectionRange(at, at);
}

function pick(next: PhoneCountry) {
	iso = next.iso;
	onCountryChange?.(next.iso);
	emit(national.slice(0, maxNationalLength(next)), next);
	open = false;
	requestAnimationFrame(() => inputEl?.focus());
}
</script>

<div data-slot="phone-input" class={cn(s.root(), classProp)}>
	<Combobox bind:open>
		<ComboboxTrigger
			{size}
			{disabled}
			aria-label="{labels.country}: {country.name} +{country.dial}"
			class={s.trigger()}
		>
			<span aria-hidden="true" class={s.flag()}>{flagOf(country.iso)}</span>
			<span class={s.dial()}>+{country.dial}</span>
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="text-muted-foreground">
				<path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</ComboboxTrigger>
		<ComboboxContent {size} align="start">
			<CommandInput placeholder={labels.search} />
			<CommandList>
				<CommandEmpty>{labels.empty}</CommandEmpty>
				<CommandGroup>
					{#each countries as c (c.iso)}
						<CommandItem value={c.iso} keywords="{c.name} {c.dial} +{c.dial}" onSelect={() => pick(c)}>
							<span class={s.item()}>
								<span aria-hidden="true" class={s.flag()}>{flagOf(c.iso)}</span>
								<span class="flex-1 truncate">{c.name}</span>
								<span class={s.dial()}>+{c.dial}</span>
							</span>
						</CommandItem>
					{/each}
				</CommandGroup>
			</CommandList>
		</ComboboxContent>
	</Combobox>
	<Input
		bind:ref={inputEl}
		type="tel"
		inputmode="tel"
		autocomplete="tel-national"
		{size}
		placeholder={country.pattern.replace(/#/g, "0")}
		value={formatted}
		{disabled}
		aria-label={rest.id || rest["aria-labelledby"] ? undefined : labels.number}
		class={s.input()}
		oninput={(e) => onInput(e.currentTarget)}
		{...rest}
	/>
</div>
