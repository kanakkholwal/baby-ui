"use client";

import {
	type CardValidity,
	type CardValue,
	CreditCardInput,
	CurrencyInput,
	defaultPasswordRules,
	Field,
	FieldDescription,
	FieldLabel,
	PasswordInput,
	PhoneInput,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const RULES = defaultPasswordRules(10);

export function PasswordInputDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof PasswordInput>>(props);
	const [password, setPassword] = useState("");
	return (
		<Field className="w-full max-w-sm">
			<FieldLabel htmlFor="demo-new-password">Create a password</FieldLabel>
			<PasswordInput
				id="demo-new-password"
				value={password}
				onValueChange={setPassword}
				rules={RULES}
				feedback={p.feedback ?? "both"}
				size={p.size ?? "md"}
			/>
		</Field>
	);
}

export function CreditCardInputDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof CreditCardInput>>(props);
	const [card, setCard] = useState<CardValue>({ number: "", expiry: "", cvc: "" });
	const [validity, setValidity] = useState<CardValidity | null>(null);
	return (
		<div className="flex w-full max-w-md flex-col gap-4">
			<CreditCardInput
				value={card}
				onValueChange={(next, v) => {
					setCard(next);
					setValidity(v);
				}}
				layout={p.layout ?? "stacked"}
				size={p.size ?? "md"}
			/>
			<p className="text-muted-foreground text-xs">
				Try 4242 4242 4242 4242 with any future expiry.{" "}
				{validity?.valid ? <span className="text-foreground">Ready to pay.</span> : null}
			</p>
		</div>
	);
}

export function PhoneInputDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof PhoneInput>>(props);
	const [phone, setPhone] = useState("");
	const [country, setCountry] = useState("US");
	// The controls panel picks the country; the picker inside the field can change it too.
	useEffect(() => {
		if (typeof props.country === "string") setCountry(props.country);
	}, [props.country]);
	return (
		<Field className="w-full max-w-sm">
			<FieldLabel htmlFor="demo-phone">Mobile number</FieldLabel>
			<PhoneInput
				id="demo-phone"
				value={phone}
				onValueChange={(next) => setPhone(next)}
				country={country}
				onCountryChange={setCountry}
				size={p.size ?? "md"}
			/>
			<FieldDescription>
				Stored as <span className="font-mono">{phone || "…"}</span>
			</FieldDescription>
		</Field>
	);
}

export function CurrencyInputDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof CurrencyInput>>(props);
	const [amount, setAmount] = useState<number | null>(250000);
	const currency = p.currency ?? "USD";
	return (
		<Field className="w-full max-w-xs">
			<FieldLabel htmlFor="demo-amount">Monthly budget</FieldLabel>
			<CurrencyInput
				id="demo-amount"
				value={amount}
				onValueChange={setAmount}
				currency={currency}
				locale={p.locale ?? "en-US"}
				max={10_000_000}
				affix={p.affix ?? "both"}
				size={p.size ?? "md"}
			/>
			<FieldDescription>
				Value in minor units:{" "}
				<span className="font-mono tabular-nums">{amount ?? "null"}</span>
			</FieldDescription>
		</Field>
	);
}
