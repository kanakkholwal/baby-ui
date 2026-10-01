/** Helpers for the InputGroup demo's examples: search, password, currency, phone and card. */

/** Groups card digits in fours, up to 19 digits. */
export const formatCard = (raw: string) =>
	raw
		.replace(/\D/g, "")
		.slice(0, 19)
		.replace(/(\d{4})(?=\d)/g, "$1 ");

/** The network a card number's prefix belongs to. */
export function cardBrand(card: string): string | null {
	const digits = card.replace(/\D/g, "");
	if (/^4/.test(digits)) return "Visa";
	if (/^(5[1-5]|2[2-7])/.test(digits)) return "Mastercard";
	if (/^3[47]/.test(digits)) return "Amex";
	return null;
}

/** "1234.5" becomes "1,234.50" on blur; anything that is not a number clears. */
export function formatAmount(raw: string, locale = "en-US"): string {
	const amount = Number(raw.replace(/[^\d.]/g, ""));
	if (!raw.trim() || !Number.isFinite(amount)) return "";
	return new Intl.NumberFormat(locale, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount);
}

/** North American numbers as "(555) 123-4567", formatted while typing. */
export function formatPhone(raw: string): string {
	const d = raw.replace(/\D/g, "").slice(0, 10);
	if (d.length < 4) return d;
	if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
	return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/** One point each for 8+ characters, mixed case, a digit and a symbol. */
export function passwordStrength(password: string): string {
	if (password.length < 8) return "Too short";
	const score =
		Number(/[a-z]/.test(password) && /[A-Z]/.test(password)) +
		Number(/\d/.test(password)) +
		Number(/[^A-Za-z0-9]/.test(password));
	if (score === 0) return "Weak";
	if (score === 1) return "Fair";
	return score === 2 ? "Good" : "Strong";
}
