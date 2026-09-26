export const CIRCUIT_NODES = [
	{ id: "input", x: 60, y: 200, label: "Input", status: "active" as const },
	{ id: "parse", x: 220, y: 90, label: "Parse", status: "busy" as const },
	{ id: "validate", x: 220, y: 310, label: "Validate", status: "active" as const },
	{ id: "merge", x: 400, y: 200, label: "Merge", status: "active" as const },
	{ id: "cache", x: 400, y: 340, label: "Cache", status: "error" as const },
	{ id: "output", x: 540, y: 200, label: "Output", status: "idle" as const },
];

export const CIRCUIT_CONNECTIONS = [
	{ from: "input", to: "parse" },
	{ from: "input", to: "validate" },
	{ from: "parse", to: "merge" },
	{ from: "validate", to: "merge" },
	{ from: "merge", to: "cache", bidirectional: true },
	{ from: "merge", to: "output" },
];
