/** Deterministic sample categories for bar chart demos: eight months of revenue and profit. */
export const MONTHLY = [
	{ name: "Jan", revenue: 12400, profit: 4500 },
	{ name: "Feb", revenue: 15100, profit: 5200 },
	{ name: "Mar", revenue: 13800, profit: 3900 },
	{ name: "Apr", revenue: 17900, profit: 6800 },
	{ name: "May", revenue: 16200, profit: 5600 },
	{ name: "Jun", revenue: 20400, profit: 7900 },
	{ name: "Jul", revenue: 18700, profit: 6100 },
	{ name: "Aug", revenue: 22300, profit: 8400 },
];

export const MONTHLY_CONFIG = {
	revenue: { label: "Revenue", color: "var(--chart-1)" },
	profit: { label: "Profit", color: "var(--chart-2)" },
};
