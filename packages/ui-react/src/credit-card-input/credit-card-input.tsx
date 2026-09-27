"use client";

import { type ComponentProps, useId, useLayoutEffect, useRef, useState } from "react";
import { Field, FieldError, FieldLabel } from "../field/field";
import { Input } from "../input/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../input-group/input-group";
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

export type { CardBrand, CardValidity, CardValue, CreditCardLabels } from "./core";
export type { CreditCardInputLayout };

type Part = keyof CardValue;

export interface CreditCardInputProps
	extends Omit<ComponentProps<"div">, "onChange" | "defaultValue"> {
	value: CardValue;
	onValueChange: (value: CardValue, validity: CardValidity) => void;
	layout?: CreditCardInputLayout;
	size?: InputGroupSize;
	disabled?: boolean;
	/** Reference date for the expiry check; defaults to now. */
	now?: Date;
	labels?: Partial<CreditCardLabels>;
}

export function CreditCardInput({
	value,
	onValueChange,
	layout = "stacked",
	size = "md",
	disabled,
	now,
	labels: labelsProp,
	className,
	...props
}: CreditCardInputProps) {
	const id = useId();
	const labels = { ...CREDIT_CARD_LABELS, ...labelsProp };
	const s = creditCardInput({ layout });
	const validity = cardValidity(value, now);
	// Errors wait for the user to leave a field, so a half-typed number is never "wrong".
	const [touched, setTouched] = useState<Record<Part, boolean>>({
		number: false,
		expiry: false,
		cvc: false,
	});
	const refs = {
		number: useRef<HTMLInputElement>(null),
		expiry: useRef<HTMLInputElement>(null),
	};
	const caret = useRef<{ part: "number" | "expiry"; count: number } | null>(null);

	const formatted = {
		number: formatCardNumber(value.number),
		expiry: formatExpiry(value.expiry),
	};

	useLayoutEffect(() => {
		const pending = caret.current;
		if (!pending) return;
		caret.current = null;
		const el = refs[pending.part].current;
		if (el && document.activeElement === el) {
			const at = caretAfterDigits(el.value, pending.count);
			el.setSelectionRange(at, at);
		}
	});

	const emit = (next: CardValue) => onValueChange(next, cardValidity(next, now));

	const onNumber = (el: HTMLInputElement) => {
		const edit = applyDigitEdit(
			el.value,
			el.selectionStart ?? el.value.length,
			value.number,
			formatted.number,
		);
		const digits = edit.digits.slice(0, maxCardLength(edit.digits));
		caret.current = { part: "number", count: Math.min(edit.before, digits.length) };
		emit({ ...value, number: digits, cvc: value.cvc.slice(0, cvcLength(digits)) });
	};

	const onExpiry = (el: HTMLInputElement) => {
		const edit = applyDigitEdit(
			el.value,
			el.selectionStart ?? el.value.length,
			value.expiry,
			formatted.expiry,
		);
		const digits = normalizeExpiry(edit.digits);
		caret.current = {
			part: "expiry",
			count: Math.min(edit.before + (digits.length - edit.digits.length), digits.length),
		};
		emit({ ...value, expiry: digits });
	};

	const show = (part: Part) => touched[part] && !validity[part];
	const blur = (part: Part) => () => setTouched((t) => ({ ...t, [part]: true }));
	const errorId = (part: Part) => `${id}-${part}-error`;
	const mark = BRAND_MARK[validity.brand];

	return (
		<div
			data-slot="credit-card-input"
			data-layout={layout}
			className={cn(s.root(), className)}
			{...props}
		>
			<Field data-invalid={show("number") || undefined}>
				<FieldLabel htmlFor={`${id}-number`}>{labels.number}</FieldLabel>
				<InputGroup size={size}>
					<InputGroupInput
						ref={refs.number}
						id={`${id}-number`}
						inputMode="numeric"
						autoComplete="cc-number"
						placeholder="1234 1234 1234 1234"
						value={formatted.number}
						disabled={disabled}
						aria-invalid={show("number") || undefined}
						aria-describedby={show("number") ? errorId("number") : undefined}
						className={s.number()}
						onChange={(e) => onNumber(e.currentTarget)}
						onBlur={blur("number")}
					/>
					<InputGroupAddon align="inline-end">
						<span aria-hidden="true" className={cn(s.mark(), !mark && "opacity-0")}>
							{mark}
						</span>
						<span className="sr-only" aria-live="polite">
							{validity.brand === "unknown" ? "" : brandLabel(validity.brand)}
						</span>
					</InputGroupAddon>
				</InputGroup>
				<FieldError id={errorId("number")}>
					{show("number") ? labels.invalidNumber : null}
				</FieldError>
			</Field>
			<div className={s.row()}>
				<Field data-invalid={show("expiry") || undefined}>
					<FieldLabel htmlFor={`${id}-expiry`}>{labels.expiry}</FieldLabel>
					<Input
						ref={refs.expiry}
						id={`${id}-expiry`}
						size={size}
						inputMode="numeric"
						autoComplete="cc-exp"
						placeholder="MM/YY"
						value={formatted.expiry}
						disabled={disabled}
						aria-invalid={show("expiry") || undefined}
						aria-describedby={show("expiry") ? errorId("expiry") : undefined}
						className={s.short()}
						onChange={(e) => onExpiry(e.currentTarget)}
						onBlur={blur("expiry")}
					/>
					<FieldError id={errorId("expiry")}>
						{show("expiry") ? labels.invalidExpiry : null}
					</FieldError>
				</Field>
				<Field data-invalid={show("cvc") || undefined}>
					<FieldLabel htmlFor={`${id}-cvc`}>{labels.cvc}</FieldLabel>
					<Input
						id={`${id}-cvc`}
						size={size}
						inputMode="numeric"
						autoComplete="cc-csc"
						placeholder={"•".repeat(cvcLength(value.number))}
						value={value.cvc}
						disabled={disabled}
						aria-invalid={show("cvc") || undefined}
						aria-describedby={show("cvc") ? errorId("cvc") : undefined}
						className={s.short()}
						onChange={(e) =>
							emit({
								...value,
								cvc: onlyDigits(e.currentTarget.value).slice(0, cvcLength(value.number)),
							})
						}
						onBlur={blur("cvc")}
					/>
					<FieldError id={errorId("cvc")}>
						{show("cvc") ? labels.invalidCvc : null}
					</FieldError>
				</Field>
			</div>
		</div>
	);
}
