export type CardBrand =
	| "visa"
	| "mastercard"
	| "amex"
	| "discover"
	| "jcb"
	| "diners"
	| "unionpay"
	| "unknown";

/** Digits only; `expiry` is "MMYY" as typed, without the slash. */
export type CardValue = { number: string; expiry: string; cvc: string };

export type CardValidity = {
	brand: CardBrand;
	number: boolean;
	expiry: boolean;
	cvc: boolean;
	valid: boolean;
};

type BrandRule = {
	brand: Exclude<CardBrand, "unknown">;
	pattern: RegExp;
	gaps: number[];
	lengths: number[];
	cvc: number;
	label: string;
};

// Prefix ranges from each network's published IIN tables; the first match wins.
const BRANDS: BrandRule[] = [
	{
		brand: "amex",
		pattern: /^3[47]/,
		gaps: [4, 10],
		lengths: [15],
		cvc: 4,
		label: "Amex",
	},
	{
		brand: "diners",
		pattern: /^3(0[0-5]|[689])/,
		gaps: [4, 10],
		lengths: [14, 16, 19],
		cvc: 3,
		label: "Diners",
	},
	{
		brand: "jcb",
		pattern: /^35(2[89]|[3-8])/,
		gaps: [4, 8, 12],
		lengths: [16, 17, 18, 19],
		cvc: 3,
		label: "JCB",
	},
	{
		brand: "visa",
		pattern: /^4/,
		gaps: [4, 8, 12],
		lengths: [13, 16, 19],
		cvc: 3,
		label: "Visa",
	},
	{
		brand: "mastercard",
		pattern: /^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/,
		gaps: [4, 8, 12],
		lengths: [16],
		cvc: 3,
		label: "Mastercard",
	},
	{
		brand: "discover",
		pattern: /^(6011|64[4-9]|65)/,
		gaps: [4, 8, 12],
		lengths: [16, 19],
		cvc: 3,
		label: "Discover",
	},
	{
		brand: "unionpay",
		pattern: /^62/,
		gaps: [4, 8, 12],
		lengths: [16, 17, 18, 19],
		cvc: 3,
		label: "UnionPay",
	},
];

const FALLBACK = { gaps: [4, 8, 12], lengths: [16], cvc: 3, label: "Card" };

const rule = (digits: string) => BRANDS.find((b) => b.pattern.test(digits));

export const onlyDigits = (text: string) => text.replace(/\D+/g, "");

export function detectBrand(digits: string): CardBrand {
	return rule(digits)?.brand ?? "unknown";
}

export function brandLabel(brand: CardBrand): string {
	return BRANDS.find((b) => b.brand === brand)?.label ?? FALLBACK.label;
}

export function maxCardLength(digits: string): number {
	return Math.max(...(rule(digits) ?? FALLBACK).lengths);
}

export function cvcLength(digits: string): number {
	return (rule(digits) ?? FALLBACK).cvc;
}

/** "4242424242424242" to "4242 4242 4242 4242"; Amex groups 4-6-5. */
export function formatCardNumber(digits: string): string {
	const { gaps } = rule(digits) ?? FALLBACK;
	let out = "";
	for (let i = 0; i < digits.length; i++) {
		if (gaps.includes(i)) out += " ";
		out += digits[i];
	}
	return out;
}

export function luhn(digits: string): boolean {
	let sum = 0;
	for (let i = 0; i < digits.length; i++) {
		let d = Number(digits[digits.length - 1 - i]);
		if (i % 2 === 1) {
			d *= 2;
			if (d > 9) d -= 9;
		}
		sum += d;
	}
	return digits.length > 0 && sum % 10 === 0;
}

/** "0427" to "04/27". A leading 2-9 month becomes "0N" so typing "4" reads as April. */
export function formatExpiry(digits: string): string {
	let d = digits.slice(0, 4);
	if (d.length === 1 && Number(d) > 1) d = `0${d}`;
	return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

/** Normalises what the user typed into the stored "MMYY" digits. */
export function normalizeExpiry(typed: string): string {
	const digits = onlyDigits(typed);
	return digits.length === 1 && Number(digits) > 1 ? `0${digits}` : digits.slice(0, 4);
}

export function expiryValid(digits: string, now: Date = new Date()): boolean {
	if (digits.length !== 4) return false;
	const month = Number(digits.slice(0, 2));
	const year = 2000 + Number(digits.slice(2));
	if (month < 1 || month > 12) return false;
	// A card is good through the last day of its expiry month.
	return new Date(year, month, 1) > now;
}

export function cardValidity(value: CardValue, now?: Date): CardValidity {
	const brand = detectBrand(value.number);
	const lengths = (rule(value.number) ?? FALLBACK).lengths;
	const number = lengths.includes(value.number.length) && luhn(value.number);
	const expiry = expiryValid(value.expiry, now);
	const cvc = value.cvc.length === cvcLength(value.number);
	return { brand, number, expiry, cvc, valid: number && expiry && cvc };
}

/** Caret index in `formatted` just after its `count`th digit, so reformatting never jumps. */
export function caretAfterDigits(formatted: string, count: number): number {
	if (count <= 0) return 0;
	let seen = 0;
	for (let i = 0; i < formatted.length; i++) {
		if (/\d/.test(formatted[i] ?? "")) seen++;
		if (seen === count) return i + 1;
	}
	return formatted.length;
}

export type CreditCardLabels = {
	number: string;
	expiry: string;
	cvc: string;
	invalidNumber: string;
	invalidExpiry: string;
	invalidCvc: string;
};

export const CREDIT_CARD_LABELS: CreditCardLabels = {
	number: "Card number",
	expiry: "Expiry",
	cvc: "CVC",
	invalidNumber: "Check the card number.",
	invalidExpiry: "Use a future date as MM/YY.",
	invalidCvc: "Enter the security code on the card.",
};

/** Short wordmark text for the badge we draw; not the networks' own logos. */
export const BRAND_MARK: Record<CardBrand, string> = {
	visa: "VISA",
	mastercard: "MC",
	amex: "AMEX",
	discover: "DISC",
	jcb: "JCB",
	diners: "DC",
	unionpay: "UP",
	unknown: "",
};

/** Applies an edit to a digits-only field. Deleting a separator removes the digit before it,
 * so backspace never gets stuck on a space or slash. */
export function applyDigitEdit(
	raw: string,
	caret: number,
	prevDigits: string,
	prevFormatted: string,
): { digits: string; before: number } {
	let digits = onlyDigits(raw);
	let before = onlyDigits(raw.slice(0, caret)).length;
	if (digits === prevDigits && raw.length < prevFormatted.length && before > 0) {
		digits = digits.slice(0, before - 1) + digits.slice(before);
		before--;
	}
	return { digits, before };
}
