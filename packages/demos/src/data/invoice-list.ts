const monthsBefore = (now: Date, months: number) =>
	new Date(now.getFullYear(), now.getMonth() - months, 4);

const receipt = (number: string) => `https://example.com/billing/receipts/${number}.pdf`;
const invoice = (number: string) => `https://example.com/billing/invoices/${number}.pdf`;

// Shared by both ports' demos, so it imports neither: each demo's typed `invoices` prop checks it.
/** Two years of a team's billing, newest first: yearly renewals plus seat top-ups. */
export function invoiceHistory(now: Date) {
	const rows = [
		[0, "BUI-0008", "Pro Team, 2 extra seats", 11_960, "open"],
		[2, "BUI-0007", "Pro Team, 1 extra seat", 5_980, "failed"],
		[3, "BUI-0006", "Pro Team, 1 extra seat", 5_980, "paid"],
		[6, "BUI-0005", "Pro Team, annual renewal", 29_900, "paid"],
		[9, "BUI-0004", "Pro Team, 1 seat removed", 5_980, "refunded"],
		[13, "BUI-0003", "Pro Team, 2 extra seats", 11_960, "paid"],
		[18, "BUI-0002", "Pro Team, annual", 29_900, "paid"],
		[23, "BUI-0001", "Pro, monthly", 2_900, "void"],
	] as const;
	return rows.map(([months, number, description, amount, status]) => ({
		id: number.toLowerCase(),
		number,
		date: monthsBefore(now, months),
		description,
		amount,
		currency: "USD",
		status,
		receiptUrl: status === "paid" || status === "refunded" ? receipt(number) : undefined,
		invoiceUrl: status === "void" ? undefined : invoice(number),
	}));
}

/** First page size for the Load more demo. */
export const INVOICE_PAGE = 5;
