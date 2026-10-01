/** Sample data for the file-upload, number-input and multi-select demos. */

export const TEAM_MEMBERS = [
	{ value: "ana", label: "Ana Ruiz", keywords: "design" },
	{ value: "ben", label: "Ben Okafor", keywords: "engineering" },
	{ value: "chloe", label: "Chloé Martin", keywords: "product" },
	{ value: "dev", label: "Dev Patel", keywords: "engineering" },
	{ value: "emi", label: "Emi Sato", keywords: "research" },
	{ value: "finn", label: "Finn Larsen", keywords: "support", disabled: true },
];

/** Fakes an upload in demos only: real apps report progress from their own request. */
export const UPLOAD_TICK_MS = 180;
export const AVATAR_MAX_BYTES = 5 * 1024 * 1024;
