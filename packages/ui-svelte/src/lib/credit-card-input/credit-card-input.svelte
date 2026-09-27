<script lang="ts">
import { tick } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import Field from "../field/field.svelte";
import FieldError from "../field/field-error.svelte";
import FieldLabel from "../field/field-label.svelte";
import Input from "../input/input.svelte";
import InputGroup from "../input-group/input-group.svelte";
import InputGroupAddon from "../input-group/input-group-addon.svelte";
import InputGroupInput from "../input-group/input-group-input.svelte";
import type { InputGroupSize } from "../input-group/variants";
import { cn } from "../lib/cn";
import {
	applyDigitEdit,
	BRAND_MARK,
	brandLabel,
	type CardValidity,
	type CardValue,
	CREDIT_CARD_LABELS,
	type CreditCardLabels,
	cardValidity,
	caretAfterDigits,
	cvcLength,
	formatCardNumber,
	formatExpiry,
	maxCardLength,
	normalizeExpiry,
	onlyDigits,
} from "./core";
import { type CreditCardInputLayout, creditCardInput } from "./variants";

type Part = keyof CardValue;

let {
	value = $bindable({ number: "", expiry: "", cvc: "" }),
	onValueChange,
	layout = "stacked",
	size = "md",
	disabled = false,
	now,
	labels: labelsProp,
	class: classProp,
	...rest
}: Omit<HTMLAttributes<HTMLDivElement>, "onchange"> & {
	/** Bindable. Digits only; `expiry` is "MMYY". */
	value?: CardValue;
	onValueChange?: (value: CardValue, validity: CardValidity) => void;
	layout?: CreditCardInputLayout;
	size?: InputGroupSize;
	disabled?: boolean;
	/** Reference date for the expiry check; defaults to now. */
	now?: Date;
	labels?: Partial<CreditCardLabels>;
} = $props();

const id = $props.id();
const labels = $derived({ ...CREDIT_CARD_LABELS, ...labelsProp });
const s = $derived(creditCardInput({ layout }));
const validity = $derived(cardValidity(value, now));
const formatted = $derived({
	number: formatCardNumber(value.number),
	expiry: formatExpiry(value.expiry),
});
const mark = $derived(BRAND_MARK[validity.brand]);

// Errors wait for the user to leave a field, so a half-typed number is never "wrong".
let touched = $state<Record<Part, boolean>>({ number: false, expiry: false, cvc: false });

function emit(next: CardValue) {
	value = next;
	onValueChange?.(next, cardValidity(next, now));
}

async function placeCaret(el: HTMLInputElement | null, count: number) {
	await tick();
	if (!el || document.activeElement !== el) return;
	const at = caretAfterDigits(el.value, count);
	el.setSelectionRange(at, at);
}

function onNumber(el: HTMLInputElement) {
	const edit = applyDigitEdit(
		el.value,
		el.selectionStart ?? el.value.length,
		value.number,
		formatted.number,
	);
	const digits = edit.digits.slice(0, maxCardLength(edit.digits));
	emit({ ...value, number: digits, cvc: value.cvc.slice(0, cvcLength(digits)) });
	// The DOM may already hold the same string, so write it back before placing the caret.
	el.value = formatCardNumber(digits);
	void placeCaret(el, Math.min(edit.before, digits.length));
}

function onExpiry(el: HTMLInputElement) {
	const edit = applyDigitEdit(
		el.value,
		el.selectionStart ?? el.value.length,
		value.expiry,
		formatted.expiry,
	);
	const digits = normalizeExpiry(edit.digits);
	emit({ ...value, expiry: digits });
	el.value = formatExpiry(digits);
	void placeCaret(
		el,
		Math.min(edit.before + (digits.length - edit.digits.length), digits.length),
	);
}

function onCvc(el: HTMLInputElement) {
	const digits = onlyDigits(el.value).slice(0, cvcLength(value.number));
	emit({ ...value, cvc: digits });
	el.value = digits;
}

const show = (part: Part) => touched[part] && !validity[part];
const errorId = (part: Part) => `${id}-${part}-error`;
</script>

<div data-slot="credit-card-input" data-layout={layout} class={cn(s.root(), classProp)} {...rest}>
	<Field data-invalid={show("number") || undefined}>
		<FieldLabel for="{id}-number">{labels.number}</FieldLabel>
		<InputGroup {size}>
			<InputGroupInput
				id="{id}-number"
				inputmode="numeric"
				autocomplete="cc-number"
				placeholder="1234 1234 1234 1234"
				value={formatted.number}
				{disabled}
				aria-invalid={show("number") || undefined}
				aria-describedby={show("number") ? errorId("number") : undefined}
				class={s.number()}
				oninput={(e) => onNumber(e.currentTarget)}
				onblur={() => (touched.number = true)}
			/>
			<InputGroupAddon align="inline-end">
				<span aria-hidden="true" class={cn(s.mark(), !mark && "opacity-0")}>{mark}</span>
				<span class="sr-only" aria-live="polite">
					{validity.brand === "unknown" ? "" : brandLabel(validity.brand)}
				</span>
			</InputGroupAddon>
		</InputGroup>
		{#if show("number")}<FieldError id={errorId("number")}>{labels.invalidNumber}</FieldError>{/if}
	</Field>
	<div class={s.row()}>
		<Field data-invalid={show("expiry") || undefined}>
			<FieldLabel for="{id}-expiry">{labels.expiry}</FieldLabel>
			<Input
				id="{id}-expiry"
				{size}
				inputmode="numeric"
				autocomplete="cc-exp"
				placeholder="MM/YY"
				value={formatted.expiry}
				{disabled}
				aria-invalid={show("expiry") || undefined}
				aria-describedby={show("expiry") ? errorId("expiry") : undefined}
				class={s.short()}
				oninput={(e) => onExpiry(e.currentTarget)}
				onblur={() => (touched.expiry = true)}
			/>
			{#if show("expiry")}<FieldError id={errorId("expiry")}>{labels.invalidExpiry}</FieldError>{/if}
		</Field>
		<Field data-invalid={show("cvc") || undefined}>
			<FieldLabel for="{id}-cvc">{labels.cvc}</FieldLabel>
			<Input
				id="{id}-cvc"
				{size}
				inputmode="numeric"
				autocomplete="cc-csc"
				placeholder={"•".repeat(cvcLength(value.number))}
				value={value.cvc}
				{disabled}
				aria-invalid={show("cvc") || undefined}
				aria-describedby={show("cvc") ? errorId("cvc") : undefined}
				class={s.short()}
				oninput={(e) => onCvc(e.currentTarget)}
				onblur={() => (touched.cvc = true)}
			/>
			{#if show("cvc")}<FieldError id={errorId("cvc")}>{labels.invalidCvc}</FieldError>{/if}
		</Field>
	</div>
</div>
