/** Separators and fraction digits for one locale and currency, read from Intl. */
export type CurrencyParts = {
	group: string;
	decimal: string;
	fraction: number;
	symbol: string;
};

export function currencyParts(
	locale: string | undefined,
	currency: string,
): CurrencyParts {
	const format = new Intl.NumberFormat(locale, { style: "currency", currency });
	const parts = format.formatToParts(12345.6);
	const find = (type: Intl.NumberFormatPartTypes) =>
		parts.find((p) => p.type === type)?.value ?? "";
	return {
		group: find("group") || ",",
		decimal: find("decimal") || ".",
		fraction: format.resolvedOptions().maximumFractionDigits ?? 2,
		symbol: find("currency"),
	};
}

/** Minor units (e.g. cents) to the display text without the symbol: 123456 to "1,234.56". */
export function formatMinor(
	minor: number,
	parts: CurrencyParts,
	locale?: string,
): string {
	return new Intl.NumberFormat(locale, {
		minimumFractionDigits: parts.fraction,
		maximumFractionDigits: parts.fraction,
	}).format(minor / 10 ** parts.fraction);
}

const significant = (ch: string, parts: CurrencyParts) =>
	/\d/.test(ch) || ch === parts.decimal;

/** Cleans what the user typed while keeping a half-typed decimal like "12." intact. */
export function formatEditing(raw: string, parts: CurrencyParts): string {
	let sawDecimal = false;
	let int = "";
	let frac = "";
	for (const ch of raw) {
		if (/\d/.test(ch)) {
			if (sawDecimal) {
				if (frac.length < parts.fraction) frac += ch;
			} else int += ch;
		} else if (ch === parts.decimal && parts.fraction > 0 && !sawDecimal)
			sawDecimal = true;
	}
	int = int.replace(/^0+(?=\d)/, "");
	const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, parts.group);
	return sawDecimal ? `${grouped || "0"}${parts.decimal}${frac}` : grouped;
}

/** Display or editing text back to minor units; null when empty. */
export function toMinor(text: string, parts: CurrencyParts): number | null {
	const cleaned = formatEditing(text, parts);
	if (!cleaned) return null;
	const [int = "0", frac = ""] = cleaned.split(parts.decimal);
	const digits = int.split(parts.group).join("") + frac.padEnd(parts.fraction, "0");
	return Number(digits);
}

/** Caret index after the `count`th digit or decimal mark, so regrouping never jumps. */
export function caretAfter(text: string, count: number, parts: CurrencyParts): number {
	if (count <= 0) return 0;
	let seen = 0;
	for (let i = 0; i < text.length; i++) {
		if (significant(text[i] ?? "", parts)) seen++;
		if (seen === count) return i + 1;
	}
	return text.length;
}

export function significantBefore(
	text: string,
	caret: number,
	parts: CurrencyParts,
): number {
	let n = 0;
	for (const ch of text.slice(0, caret)) if (significant(ch, parts)) n++;
	return n;
}

export function inRange(minor: number | null, min?: number, max?: number): boolean {
	if (minor === null) return true;
	return (min === undefined || minor >= min) && (max === undefined || minor <= max);
}
