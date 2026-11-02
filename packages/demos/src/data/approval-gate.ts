import type { ApprovalRequest } from "@baby-ui/svelte";

/** Demo requests; `expiresAt` is filled in from the demo's own clock when it mounts. */
export const REFUND_REQUEST: Omit<ApprovalRequest, "expiresAt"> = {
	tool: "payments.issue_refund",
	title: "Refund a duplicate charge",
	summary:
		"Refund $49.00 to Priya Nair for charge ch_3Pq8 on May 3. Order #4821 was billed twice for the same Pro plan renewal.",
	risk: "medium",
	args: {
		charge: "ch_3Pq8LmA2",
		amount: 4900,
		currency: "usd",
		reason: "duplicate",
		notify_customer: true,
	},
};

export const MIGRATION_REQUEST: Omit<ApprovalRequest, "expiresAt"> = {
	tool: "db.apply_migration",
	title: "Drop the legacy invoices column",
	summary:
		"Runs migration 0042 on production. It removes invoices.legacy_total, which no query has read in 90 days.",
	risk: "high",
	args: {
		database: "billing-prod",
		migration: "0042_drop_legacy_total",
		lock_timeout: "5s",
		backup: true,
	},
	diff: {
		filename: "migrations/0042_drop_legacy_total.sql",
		lines: [
			{ kind: "context", text: "BEGIN;" },
			{ kind: "remove", text: "-- keep legacy_total until finance signs off" },
			{ kind: "add", text: "ALTER TABLE invoices DROP COLUMN legacy_total;" },
			{ kind: "add", text: "DROP INDEX IF EXISTS invoices_legacy_total_idx;" },
			{ kind: "context", text: "COMMIT;" },
		],
	},
};

export const REFUND_TTL_MS = 4 * 60_000;
export const MIGRATION_TTL_MS = 90_000;
