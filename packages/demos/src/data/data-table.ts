/** Sample invoices and a simulated API for the DataTable demos; nothing here ships. */

export type InvoiceStatus = "paid" | "pending" | "overdue" | "refunded";

export type Invoice = {
	id: string;
	customer: string;
	email: string;
	status: InvoiceStatus;
	plan: string;
	region: string;
	amount: number;
	issued: string;
};

export const INVOICE_STATUS: Record<
	InvoiceStatus,
	{ label: string; variant: "success" | "warning" | "destructive" | "secondary" }
> = {
	paid: { label: "Paid", variant: "success" },
	pending: { label: "Pending", variant: "warning" },
	overdue: { label: "Overdue", variant: "destructive" },
	refunded: { label: "Refunded", variant: "secondary" },
};

const FIRST = [
	"Ava",
	"Liam",
	"Noah",
	"Mia",
	"Zara",
	"Kenji",
	"Priya",
	"Omar",
	"Lena",
	"Diego",
	"Sofia",
	"Arjun",
	"Elif",
	"Mateo",
	"Hana",
	"Yusuf",
];
const LAST = [
	"Patel",
	"Garcia",
	"Kim",
	"Okafor",
	"Novak",
	"Silva",
	"Haddad",
	"Larsen",
	"Mehta",
	"Rossi",
	"Tanaka",
	"Moreau",
	"Ali",
	"Berg",
];
const PLANS = ["Starter", "Team", "Business", "Enterprise"];
const REGIONS = ["us-east", "us-west", "eu-central", "ap-south", "sa-east"];
const STATUSES: InvoiceStatus[] = [
	"paid",
	"paid",
	"paid",
	"pending",
	"pending",
	"overdue",
	"refunded",
];

// Seeded, so every render and both ports show the same rows.
function random(seed: number) {
	let t = seed;
	return () => {
		t += 0x6d2b79f5;
		let r = Math.imul(t ^ (t >>> 15), t | 1);
		r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
		return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
	};
}

function pick<T>(items: readonly T[], roll: number): T {
	const item = items[Math.floor(roll * items.length)];
	if (item === undefined) throw new Error("pick from an empty list");
	return item;
}

export function makeInvoices(count: number, seed = 7): Invoice[] {
	const roll = random(seed);
	const start = Date.UTC(2026, 0, 1);
	return Array.from({ length: count }, (_, i) => {
		const first = pick(FIRST, roll());
		const last = pick(LAST, roll());
		return {
			id: `INV-${String(10_000 + i)}`,
			customer: `${first} ${last}`,
			email: `${first}.${last}@example.com`.toLowerCase(),
			status: pick(STATUSES, roll()),
			plan: pick(PLANS, roll()),
			region: pick(REGIONS, roll()),
			amount: Math.round(roll() * 480_000 + 1_900) / 100,
			issued: new Date(start + Math.floor(roll() * 270) * 86_400_000)
				.toISOString()
				.slice(0, 10),
		};
	});
}

let cache: Invoice[] | undefined;

/** The 10,000 sample invoices, built on first use rather than at import. */
export function invoices(): Invoice[] {
	cache ??= makeInvoices(10_000);
	return cache;
}

export type InvoiceQuery = {
	pageIndex: number;
	pageSize: number;
	sort?: { id: string; desc: boolean };
	search: string;
	/** Demo control: the next response fails, or comes back empty. */
	simulate?: "normal" | "error" | "empty";
};

function matches(invoice: Invoice, search: string): boolean {
	if (!search) return true;
	const needle = search.toLowerCase();
	return (
		invoice.id.toLowerCase().includes(needle) ||
		invoice.customer.toLowerCase().includes(needle) ||
		invoice.email.includes(needle)
	);
}

function compare(a: Invoice, b: Invoice, id: string): number {
	if (id === "amount") return a.amount - b.amount;
	const key =
		id === "customer" ||
		id === "status" ||
		id === "plan" ||
		id === "region" ||
		id === "issued"
			? id
			: "id";
	return a[key].localeCompare(b[key]);
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** A paged, sorted, searched "server" over the 10K invoices, with network-ish latency. */
export async function queryInvoices(
	query: InvoiceQuery,
): Promise<{ rows: Invoice[]; total: number }> {
	await wait(450 + Math.random() * 350);
	if (query.simulate === "error")
		throw new Error("The invoices service answered 503. Retrying usually works.");
	if (query.simulate === "empty") return { rows: [], total: 0 };
	const filtered = invoices().filter((invoice) => matches(invoice, query.search));
	const sort = query.sort;
	if (sort) filtered.sort((a, b) => (sort.desc ? -1 : 1) * compare(a, b, sort.id));
	const start = query.pageIndex * query.pageSize;
	return { rows: filtered.slice(start, start + query.pageSize), total: filtered.length };
}

/** Cursor pages for the infinite demo: 50 rows a call, 1,000 in all. */
export async function fetchInvoicePage(
	offset: number,
): Promise<{ rows: Invoice[]; hasMore: boolean }> {
	await wait(500 + Math.random() * 300);
	const rows = invoices().slice(offset, Math.min(offset + 50, 1_000));
	return { rows, hasMore: offset + rows.length < 1_000 };
}

export const currency = new Intl.NumberFormat("en", {
	style: "currency",
	currency: "USD",
});

export function formatIssued(iso: string): string {
	return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en", {
		month: "short",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC",
	});
}
