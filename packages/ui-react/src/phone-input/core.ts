/** One dialling region. `pattern` groups the national number, "#" per digit. */
export type PhoneCountry = { iso: string; name: string; dial: string; pattern: string };

// A compact table of common regions; national grouping follows each numbering plan loosely.
export const PHONE_COUNTRIES: PhoneCountry[] = [
	{ iso: "US", name: "United States", dial: "1", pattern: "(###) ###-####" },
	{ iso: "CA", name: "Canada", dial: "1", pattern: "(###) ###-####" },
	{ iso: "GB", name: "United Kingdom", dial: "44", pattern: "#### ######" },
	{ iso: "IE", name: "Ireland", dial: "353", pattern: "## ### ####" },
	{ iso: "IN", name: "India", dial: "91", pattern: "##### #####" },
	{ iso: "DE", name: "Germany", dial: "49", pattern: "#### #######" },
	{ iso: "FR", name: "France", dial: "33", pattern: "# ## ## ## ##" },
	{ iso: "ES", name: "Spain", dial: "34", pattern: "### ### ###" },
	{ iso: "IT", name: "Italy", dial: "39", pattern: "### ### ####" },
	{ iso: "NL", name: "Netherlands", dial: "31", pattern: "# ########" },
	{ iso: "SE", name: "Sweden", dial: "46", pattern: "## ### ## ##" },
	{ iso: "CH", name: "Switzerland", dial: "41", pattern: "## ### ## ##" },
	{ iso: "BR", name: "Brazil", dial: "55", pattern: "(##) #####-####" },
	{ iso: "MX", name: "Mexico", dial: "52", pattern: "## #### ####" },
	{ iso: "JP", name: "Japan", dial: "81", pattern: "##-####-####" },
	{ iso: "KR", name: "South Korea", dial: "82", pattern: "##-####-####" },
	{ iso: "CN", name: "China", dial: "86", pattern: "### #### ####" },
	{ iso: "SG", name: "Singapore", dial: "65", pattern: "#### ####" },
	{ iso: "AU", name: "Australia", dial: "61", pattern: "### ### ###" },
	{ iso: "AE", name: "United Arab Emirates", dial: "971", pattern: "## ### ####" },
	{ iso: "ZA", name: "South Africa", dial: "27", pattern: "## ### ####" },
	{ iso: "NG", name: "Nigeria", dial: "234", pattern: "### ### ####" },
];

export const onlyDigits = (text: string) => text.replace(/\D+/g, "");

export function countryByIso(iso: string): PhoneCountry {
	return (
		PHONE_COUNTRIES.find((c) => c.iso === iso) ?? (PHONE_COUNTRIES[0] as PhoneCountry)
	);
}

/** Regional-indicator emoji built from the ISO code; decorative, never the only label. */
export function flagOf(iso: string): string {
	return String.fromCodePoint(
		...[...iso.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0)),
	);
}

export const maxNationalLength = (country: PhoneCountry) =>
	(country.pattern.match(/#/g) ?? []).length;

/** Groups national digits by the country's pattern, only as far as the digits reach. */
export function formatNational(digits: string, country: PhoneCountry): string {
	let out = "";
	let i = 0;
	for (const ch of country.pattern) {
		if (i >= digits.length) break;
		if (ch === "#") out += digits[i++];
		else out += ch;
	}
	return out + digits.slice(i);
}

/** "+14155552671" split for a known country; digits after the dial code are national. */
export function nationalOf(e164: string, country: PhoneCountry): string {
	const digits = onlyDigits(e164);
	return digits.startsWith(country.dial) ? digits.slice(country.dial.length) : digits;
}

export function toE164(national: string, country: PhoneCountry): string {
	return national ? `+${country.dial}${national}` : "";
}

export function phoneComplete(national: string, country: PhoneCountry): boolean {
	return national.length === maxNationalLength(country);
}

export function caretAfterDigits(formatted: string, count: number): number {
	if (count <= 0) return 0;
	let seen = 0;
	for (let i = 0; i < formatted.length; i++) {
		if (/\d/.test(formatted[i] ?? "")) seen++;
		if (seen === count) return i + 1;
	}
	return formatted.length;
}

export type PhoneLabels = {
	country: string;
	search: string;
	empty: string;
	number: string;
};

export const PHONE_LABELS: PhoneLabels = {
	country: "Country",
	search: "Search countries",
	empty: "No country found",
	number: "Phone number",
};

/** Deleting a separator removes the digit before it, so backspace never sticks on ")" or "-". */
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
