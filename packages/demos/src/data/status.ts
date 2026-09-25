type Status = "normal" | "warning" | "error" | "empty";

const INCIDENTS: Record<number, { status: Status; info?: string }> = {
	12: { status: "warning", info: "Elevated API latency in eu-west." },
	13: { status: "warning" },
	41: { status: "error", info: "Checkout outage, 38 minutes." },
	67: { status: "warning", info: "Degraded search indexing." },
	80: { status: "error", info: "DNS provider incident." },
};

const DAY = 86_400_000;
const LAST = Date.UTC(2026, 8, 25);

/** 84 days of history, so the oldest slots of a 90-day strip render as no data. */
export const STATUSES = Array.from({ length: 84 }, (_, i) => ({
	timestamp: new Date(LAST - (83 - i) * DAY),
	...(INCIDENTS[i] ?? { status: "normal" as Status }),
}));
