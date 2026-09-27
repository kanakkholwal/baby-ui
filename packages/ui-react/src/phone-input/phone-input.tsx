"use client";

import { type ComponentProps, useLayoutEffect, useRef, useState } from "react";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	ComboboxTrigger,
} from "../combobox/combobox";
import { Input } from "../input/input";
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

export type { PhoneCountry, PhoneLabels } from "./core";
export type { PhoneInputSize };

export interface PhoneInputProps
	extends Omit<
		ComponentProps<"input">,
		"size" | "type" | "value" | "onChange" | "defaultValue"
	> {
	/** E.164, e.g. "+14155552671"; empty while nothing is typed. */
	value: string;
	onValueChange: (
		value: string,
		detail: { country: PhoneCountry; complete: boolean },
	) => void;
	/** ISO 3166 alpha-2. Kept separately because some dial codes are shared (+1). */
	country: string;
	onCountryChange: (iso: string) => void;
	countries?: PhoneCountry[];
	size?: PhoneInputSize;
	labels?: Partial<PhoneLabels>;
	/** Applied to the wrapper; everything else lands on the `<input>`. */
	className?: string;
}

export function PhoneInput({
	value,
	onValueChange,
	country: iso,
	onCountryChange,
	countries = PHONE_COUNTRIES,
	size = "md",
	labels: labelsProp,
	className,
	disabled,
	...props
}: PhoneInputProps) {
	const labels = { ...PHONE_LABELS, ...labelsProp };
	const s = phoneInput({ size });
	const country = countries.find((c) => c.iso === iso) ?? countryByIso(iso);
	const national = nationalOf(value, country);
	const formatted = formatNational(national, country);
	const [open, setOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const caret = useRef<number | null>(null);

	useLayoutEffect(() => {
		const count = caret.current;
		const el = inputRef.current;
		if (count === null || !el || document.activeElement !== el) return;
		caret.current = null;
		const at = caretAfterDigits(el.value, count);
		el.setSelectionRange(at, at);
	});

	const emit = (digits: string, target: PhoneCountry) =>
		onValueChange(toE164(digits, target), {
			country: target,
			complete: phoneComplete(digits, target),
		});

	return (
		<div data-slot="phone-input" className={cn(s.root(), className)}>
			<Combobox open={open} onOpenChange={setOpen}>
				<ComboboxTrigger
					size={size}
					disabled={disabled}
					aria-label={`${labels.country}: ${country.name} +${country.dial}`}
					className={s.trigger()}
				>
					<span aria-hidden="true" className={s.flag()}>
						{flagOf(country.iso)}
					</span>
					<span className={s.dial()}>+{country.dial}</span>
					<svg
						viewBox="0 0 16 16"
						fill="none"
						aria-hidden="true"
						className="text-muted-foreground"
					>
						<path
							d="m4 6 4 4 4-4"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</ComboboxTrigger>
				<ComboboxContent size={size} align="start">
					<ComboboxInput placeholder={labels.search} />
					<ComboboxList>
						<ComboboxEmpty>{labels.empty}</ComboboxEmpty>
						<ComboboxGroup>
							{countries.map((c) => (
								<ComboboxItem
									key={c.iso}
									value={c.iso}
									keywords={`${c.name} ${c.dial} +${c.dial}`}
									onSelect={() => {
										onCountryChange(c.iso);
										emit(national.slice(0, maxNationalLength(c)), c);
										setOpen(false);
										requestAnimationFrame(() => inputRef.current?.focus());
									}}
								>
									<span className={s.item()}>
										<span aria-hidden="true" className={s.flag()}>
											{flagOf(c.iso)}
										</span>
										<span className="flex-1 truncate">{c.name}</span>
										<span className={s.dial()}>+{c.dial}</span>
									</span>
								</ComboboxItem>
							))}
						</ComboboxGroup>
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
			<Input
				ref={inputRef}
				type="tel"
				inputMode="tel"
				autoComplete="tel-national"
				size={size}
				placeholder={country.pattern.replace(/#/g, "0")}
				value={formatted}
				disabled={disabled}
				aria-label={props.id || props["aria-labelledby"] ? undefined : labels.number}
				className={s.input()}
				onChange={(e) => {
					const el = e.currentTarget;
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
					caret.current = Math.min(edit.before, digits.length);
					emit(digits, country);
				}}
				{...props}
			/>
		</div>
	);
}
