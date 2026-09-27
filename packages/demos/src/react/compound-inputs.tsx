"use client";

import {
	type CardValidity,
	type CardValue,
	CreditCardInput,
	type CreditCardInputLayout,
	CurrencyInput,
	type CurrencyInputAffix,
	type CurrencyInputSize,
	defaultPasswordRules,
	Field,
	FieldDescription,
	FieldLabel,
	type InputGroupSize,
	PasswordInput,
	type PasswordInputFeedback,
	type PasswordInputSize,
	PhoneInput,
	type PhoneInputSize,
} from "@baby-ui/react";
import { useEffect, useState } from "react";

type Props = Record<string, unknown>;

const RULES = defaultPasswordRules(10);

export function PasswordInputDemo({ props }: { props: Props }) {
	const [password, setPassword] = useState("");
	return (
		<Field className="w-full max-w-sm">
			<FieldLabel htmlFor="demo-new-password">Create a password</FieldLabel>
			<PasswordInput
				id="demo-new-password"
				value={password}
				onValueChange={setPassword}
				rules={RULES}
				feedback={(props.feedback as PasswordInputFeedback) ?? "both"}
				size={(props.size as PasswordInputSize) ?? "md"}
			/>
		</Field>
	);
}

export function CreditCardInputDemo({ props }: { props: Props }) {
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
				layout={(props.layout as CreditCardInputLayout) ?? "stacked"}
				size={(props.size as InputGroupSize) ?? "md"}
			/>
			<p className="text-muted-foreground text-xs">
				Try 4242 4242 4242 4242 with any future expiry.{" "}
				{validity?.valid ? <span className="text-foreground">Ready to pay.</span> : null}
			</p>
		</div>
	);
}

export function PhoneInputDemo({ props }: { props: Props }) {
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
				size={(props.size as PhoneInputSize) ?? "md"}
			/>
			<FieldDescription>
				Stored as <span className="font-mono">{phone || "…"}</span>
			</FieldDescription>
		</Field>
	);
}

export function CurrencyInputDemo({ props }: { props: Props }) {
	const [amount, setAmount] = useState<number | null>(250000);
	const currency = (props.currency as string) ?? "USD";
	return (
		<Field className="w-full max-w-xs">
			<FieldLabel htmlFor="demo-amount">Monthly budget</FieldLabel>
			<CurrencyInput
				id="demo-amount"
				value={amount}
				onValueChange={setAmount}
				currency={currency}
				locale={(props.locale as string) ?? "en-US"}
				max={10_000_000}
				affix={(props.affix as CurrencyInputAffix) ?? "both"}
				size={(props.size as CurrencyInputSize) ?? "md"}
			/>
			<FieldDescription>
				Value in minor units:{" "}
				<span className="font-mono tabular-nums">{amount ?? "null"}</span>
			</FieldDescription>
		</Field>
	);
}
