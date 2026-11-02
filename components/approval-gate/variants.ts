import { tv, type VariantProps } from "tailwind-variants";

export const approvalGate = tv({
	slots: {
		root: "relative text-sm",
		receipt: "flex min-w-0 items-center gap-2 px-3 py-2",
		receiptIcon: "grid size-4 shrink-0 place-items-center",
		receiptLabel: "shrink-0 font-medium text-xs",
		note: "min-w-0 truncate text-muted-foreground text-xs",
		body: "flex flex-col gap-3",
		header: "flex min-w-0 flex-wrap items-center gap-2",
		tool: "min-w-0 truncate font-mono text-foreground text-xs",
		countdown: "ms-auto shrink-0 font-mono text-xs tabular-nums",
		title: "font-medium text-foreground leading-snug",
		summary: "text-muted-foreground leading-relaxed",
		trigger:
			"inline-flex items-center gap-1 self-start rounded-md font-medium text-muted-foreground text-xs outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
		chevron:
			"size-3.5 transition-[rotate] duration-(--duration-exit) ease-(--ease-ui-out) motion-reduce:transition-none",
		code: "max-h-56 overflow-auto rounded-lg border border-border bg-background p-2.5 font-mono text-foreground text-xs leading-relaxed",
		editor:
			"min-h-36 w-full resize-y rounded-lg border border-border bg-background p-2.5 font-mono text-foreground text-xs leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive",
		error: "text-destructive-strong text-xs",
		prompt: "text-foreground text-xs leading-relaxed",
		input:
			"h-8 w-full rounded-lg border border-border bg-background px-2.5 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring",
		actions: "flex flex-wrap items-center gap-2",
		confirm: "flex flex-col gap-2 rounded-lg border border-destructive/40 p-3",
		stack: "flex flex-col gap-2",
	},
	variants: {
		/** `framed` holds the body in a card rim; `card` is one bordered surface; `plain` is a ruled block. */
		variant: {
			framed: {
				root: "rounded-2xl border border-border bg-card p-1",
				body: "rounded-[11px] border border-border bg-background p-4",
				receipt: "px-3",
			},
			card: {
				root: "overflow-hidden rounded-xl border border-border bg-card",
				body: "p-4",
				receipt: "px-4",
			},
			plain: { root: "border-border border-s-2 ps-3", receipt: "px-0" },
		},
		risk: {
			low: {},
			medium: {},
			high: {},
		},
		status: {
			pending: {},
			editing: {},
			approved: {
				receiptIcon: "text-success-strong",
				receiptLabel: "text-success-strong",
			},
			denied: {
				receiptIcon: "text-destructive-strong",
				receiptLabel: "text-destructive-strong",
			},
			expired: {
				receiptIcon: "text-muted-foreground",
				receiptLabel: "text-muted-foreground",
			},
		},
		urgent: {
			true: { countdown: "text-warning-strong" },
			false: { countdown: "text-muted-foreground" },
		},
	},
	compoundVariants: [
		{ variant: "plain", risk: "high", class: { root: "border-s-destructive" } },
		{ variant: "plain", risk: "medium", class: { root: "border-s-warning" } },
	],
	defaultVariants: { variant: "framed", risk: "low", status: "pending", urgent: false },
});

/** Grid-rows disclosure shared by every section that appears or leaves. */
export const approvalSection = tv({
	base: "grid transition-[grid-template-rows,opacity] ease-[var(--ease-ui-out)] motion-reduce:transition-none",
	variants: {
		open: {
			true: "grid-rows-[1fr] opacity-100 duration-[var(--duration-dropdown)]",
			false: "grid-rows-[0fr] opacity-0 duration-[var(--duration-exit)]",
		},
	},
	defaultVariants: { open: false },
});

export type ApprovalVariant = NonNullable<VariantProps<typeof approvalGate>["variant"]>;
export type ApprovalRisk = NonNullable<VariantProps<typeof approvalGate>["risk"]>;
export type ApprovalStatus = NonNullable<VariantProps<typeof approvalGate>["status"]>;

/** Badge colour per risk tier; plain data, the badge owns its classes. */
export const RISK_BADGE: Record<ApprovalRisk, "info" | "warning" | "destructive"> = {
	low: "info",
	medium: "warning",
	high: "destructive",
};

/** Every visible string, overridable for other languages. */
export type ApprovalLabels = Record<ApprovalStatus, string> &
	Record<`risk-${ApprovalRisk}`, string> & {
		approve: string;
		alwaysAllow: string;
		deny: string;
		edit: string;
		save: string;
		cancel: string;
		back: string;
		args: string;
		confirmPrompt: string;
		confirmApprove: string;
		reason: string;
		confirmDeny: string;
		expiresIn: string;
		invalidArgs: string;
		line: string;
	};

export const APPROVAL_LABELS: ApprovalLabels = {
	pending: "Waiting for approval",
	editing: "Editing arguments",
	approved: "Approved",
	denied: "Denied",
	expired: "Expired",
	"risk-low": "Low risk",
	"risk-medium": "Medium risk",
	"risk-high": "High risk",
	approve: "Approve",
	alwaysAllow: "Always allow",
	deny: "Deny",
	edit: "Edit arguments",
	save: "Save changes",
	cancel: "Cancel",
	back: "Back",
	args: "Arguments",
	confirmPrompt:
		"This action is high risk and cannot be undone by the agent. Approve it?",
	confirmApprove: "Yes, approve",
	reason: "Reason for denying (optional)",
	confirmDeny: "Deny request",
	expiresIn: "Expires in",
	invalidArgs: "Arguments must be a valid JSON object.",
	line: "Line",
};
