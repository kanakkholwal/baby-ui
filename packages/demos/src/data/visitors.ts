const DAY = 86_400_000;
const START = Date.UTC(2026, 5, 1, 12);

/** Deterministic sample series for chart demos: 30 days of desktop and mobile visitors. */
export const VISITORS = Array.from({ length: 30 }, (_, i) => ({
	date: new Date(START + i * DAY),
	desktop: Math.round(1800 + 620 * Math.sin(i / 3.2) + i * 28),
	mobile: Math.round(1200 + 440 * Math.cos(i / 2.6) + i * 19),
}));

export const VISITORS_CONFIG = {
	desktop: { label: "Desktop", color: "var(--chart-1)" },
	mobile: { label: "Mobile", color: "var(--chart-2)" },
};

export function localeProp(value: unknown): string | undefined {
	return typeof value === "string" && value !== "auto" ? value : undefined;
}

export function fadeProp(value: unknown): boolean | "left" | "right" {
	if (value === "left" || value === "right") return value;
	return value !== "none";
}
