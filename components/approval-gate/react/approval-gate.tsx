"use client";

import {
	createContext,
	type KeyboardEvent,
	type ReactNode,
	useContext,
	useEffect,
	useId,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { Badge } from "../../badge/react/badge";
import { Button } from "../../button/react/button";
import { FileDiff } from "../../file-diff/react/file-diff";
import { cn } from "../../lib/cn";
import {
	type ApprovalArgs,
	type ApprovalRequest,
	formatArgs,
	formatRemaining,
	isResolved,
	parseArgs,
	remainingMs,
	URGENT_MS,
} from "../approval-core";
import {
	APPROVAL_LABELS,
	type ApprovalLabels,
	type ApprovalStatus,
	type ApprovalVariant,
	approvalGate,
	approvalSection,
	RISK_BADGE,
} from "../variants";

type Step = "idle" | "confirm" | "deny";

type GateCtx = {
	id: string;
	request: ApprovalRequest;
	status: ApprovalStatus;
	busy: boolean;
	note?: string;
	remaining: number | null;
	lapsed: boolean;
	resolved: boolean;
	step: Step;
	setStep: (step: Step) => void;
	argsOpen: boolean;
	toggleArgs: () => void;
	onEditingChange?: (editing: boolean) => void;
	labels: ApprovalLabels;
	styles: ReturnType<typeof approvalGate>;
};

const GateContext = createContext<GateCtx | null>(null);

function useGate(part: string): GateCtx {
	const ctx = useContext(GateContext);
	if (!ctx) throw new Error(`${part} must be used inside <ApprovalGate>`);
	return ctx;
}

export interface ApprovalGateProps {
	request: ApprovalRequest;
	/** Controlled decision state; the gate only reports intent through the callbacks. */
	status: ApprovalStatus;
	/** Current time in ms, driven by the parent, for the countdown to `expiresAt`. */
	now: number;
	variant?: ApprovalVariant;
	/** A decision is in flight: actions show a spinner and stop taking clicks. */
	busy?: boolean;
	/** Shown on the receipt once decided, e.g. who approved and when. */
	note?: string;
	/** Whether the raw arguments are shown. Controlled with onArgsOpenChange. */
	argsOpen?: boolean;
	defaultArgsOpen?: boolean;
	onArgsOpenChange?: (open: boolean) => void;
	/** Asks the parent to enter or leave the "editing" status. */
	onEditingChange?: (editing: boolean) => void;
	/** Fires once when the countdown reaches zero before a decision. */
	onExpire?: () => void;
	labels?: Partial<ApprovalLabels>;
	className?: string;
	children?: ReactNode;
}

/** The root: the request, its decision state and the countdown. Compose the receipt and body inside. */
export function ApprovalGate({
	request,
	status,
	now,
	variant = "framed",
	busy = false,
	note,
	argsOpen: argsOpenProp,
	defaultArgsOpen = false,
	onArgsOpenChange,
	onEditingChange,
	onExpire,
	labels,
	className,
	children,
}: ApprovalGateProps) {
	const id = useId();
	const text = { ...APPROVAL_LABELS, ...labels };
	const remaining = remainingMs(request.expiresAt, now);
	const lapsed = remaining === 0;
	const resolved = isResolved(status);
	const styles = approvalGate({
		variant,
		risk: request.risk,
		status,
		urgent: remaining !== null && remaining < URGENT_MS,
	});
	const [argsOpenState, setArgsOpenState] = useState(defaultArgsOpen);
	const argsOpen = argsOpenProp ?? argsOpenState;
	// Sub-steps are UI only; the decision itself goes to the parent through the callbacks.
	const [step, setStep] = useState<Step>("idle");

	useEffect(() => {
		if (status !== "pending") setStep("idle");
	}, [status]);

	const onExpireRef = useRef(onExpire);
	onExpireRef.current = onExpire;
	const expiredFired = useRef(false);
	useEffect(() => {
		if (!lapsed || resolved) {
			expiredFired.current = false;
			return;
		}
		if (expiredFired.current) return;
		expiredFired.current = true;
		onExpireRef.current?.();
	}, [lapsed, resolved]);

	function onKeyDown(event: KeyboardEvent<HTMLElement>) {
		if (event.key !== "Escape") return;
		if (status === "editing") {
			event.preventDefault();
			onEditingChange?.(false);
		} else if (step !== "idle") {
			event.preventDefault();
			setStep("idle");
		}
	}

	const ctx: GateCtx = {
		id,
		request,
		status,
		busy,
		note,
		remaining,
		lapsed,
		resolved,
		step,
		setStep,
		argsOpen,
		toggleArgs: () => {
			const next = !argsOpen;
			if (argsOpenProp === undefined) setArgsOpenState(next);
			onArgsOpenChange?.(next);
		},
		onEditingChange,
		labels: text,
		styles,
	};

	return (
		<GateContext.Provider value={ctx}>
			<section
				data-slot="approval-gate"
				data-status={status}
				aria-label={request.title}
				aria-busy={busy}
				className={cn(styles.root(), className)}
				onKeyDown={onKeyDown}
			>
				{children}
				<p className="sr-only" aria-live="polite">
					{resolved ? `${request.title}: ${text[status]}` : ""}
				</p>
			</section>
		</GateContext.Provider>
	);
}

function Section({
	open,
	id,
	children,
}: {
	open: boolean;
	id?: string;
	children: ReactNode;
}) {
	return (
		<div id={id} className={approvalSection({ open })} inert={!open}>
			<div className="overflow-hidden">{children}</div>
		</div>
	);
}

const ICON = {
	approved: "M2.5 6.2 4.8 8.5 9.5 3.6",
	denied: "M3.5 3.5 8.5 8.5M8.5 3.5 3.5 8.5",
};

/** The one-line outcome once decided: approved, denied or expired, with the tool and your note. */
export function ApprovalGateReceipt({ className }: { className?: string }) {
	const { status, resolved, request, note, labels, styles } =
		useGate("ApprovalGateReceipt");
	return (
		<Section open={resolved}>
			<p className={cn(styles.receipt(), className)}>
				<span aria-hidden="true" className={styles.receiptIcon()}>
					<svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="size-3">
						{status === "approved" || status === "denied" ? (
							<path
								d={ICON[status]}
								stroke="currentColor"
								strokeWidth="1.7"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						) : (
							<>
								<circle cx="6" cy="6" r="4.4" stroke="currentColor" strokeWidth="1.4" />
								<path
									d="M6 3.8V6l1.4 1.2"
									stroke="currentColor"
									strokeWidth="1.4"
									strokeLinecap="round"
								/>
							</>
						)}
					</svg>
				</span>
				<span className={styles.receiptLabel()}>{labels[status]}</span>
				<span className={styles.tool()}>{request.tool}</span>
				{note ? <span className={styles.note()}>{note}</span> : null}
			</p>
		</Section>
	);
}

/** Everything before the decision; folds away once the request is resolved. */
export function ApprovalGateBody({
	className,
	children,
}: {
	className?: string;
	children?: ReactNode;
}) {
	const { resolved, styles } = useGate("ApprovalGateBody");
	return (
		<Section open={!resolved}>
			<div className={cn(styles.body(), className)}>{children}</div>
		</Section>
	);
}

/** The tool name, its risk tier and the time left to decide. */
export function ApprovalGateHeader({ className }: { className?: string }) {
	const { request, remaining, lapsed, labels, styles } = useGate("ApprovalGateHeader");
	return (
		<div className={cn(styles.header(), className)}>
			<span className={styles.tool()}>{request.tool}</span>
			<Badge variant={RISK_BADGE[request.risk]} size="sm" dot>
				{labels[`risk-${request.risk}`]}
			</Badge>
			{remaining !== null ? (
				<span className={styles.countdown()}>
					{lapsed ? labels.expired : `${labels.expiresIn} ${formatRemaining(remaining)}`}
				</span>
			) : null}
		</div>
	);
}

/** What the agent wants to do; `headingLevel` matches the page outline. */
export function ApprovalGateTitle({
	headingLevel = 3,
	className,
}: {
	headingLevel?: 2 | 3 | 4 | 5 | 6;
	className?: string;
}) {
	const { id, request, styles } = useGate("ApprovalGateTitle");
	const Heading = `h${headingLevel}` as const;
	return (
		<Heading id={`${id}-title`} className={cn(styles.title(), className)}>
			{request.title}
		</Heading>
	);
}

/** What will happen, in words a reviewer can check. */
export function ApprovalGateSummary({ className }: { className?: string }) {
	const { request, styles } = useGate("ApprovalGateSummary");
	return <p className={cn(styles.summary(), className)}>{request.summary}</p>;
}

/** The proposed file change, when the request carries one. */
export function ApprovalGateDiff({ className }: { className?: string }) {
	const { request } = useGate("ApprovalGateDiff");
	if (!request.diff) return null;
	return (
		<FileDiff
			filename={request.diff.filename}
			lines={request.diff.lines}
			className={className}
		/>
	);
}

/** The raw arguments behind a disclosure; closed while they are being edited. */
export function ApprovalGateArgs() {
	const { id, request, status, argsOpen, toggleArgs, labels, styles } =
		useGate("ApprovalGateArgs");
	const shown = argsOpen && status !== "editing";
	return (
		<>
			<button
				type="button"
				aria-expanded={shown}
				aria-controls={`${id}-args`}
				disabled={status === "editing"}
				onClick={toggleArgs}
				className={styles.trigger()}
			>
				{labels.args}
				<svg
					viewBox="0 0 16 16"
					fill="none"
					aria-hidden="true"
					className={cn(
						styles.chevron(),
						shown && "rotate-180 duration-(--duration-dropdown)",
					)}
				>
					<path
						d="m4 6 4 4 4-4"
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
			<Section open={shown} id={`${id}-args`}>
				<pre className={styles.code()}>
					<code>{formatArgs(request.args)}</code>
				</pre>
			</Section>
		</>
	);
}

/** A JSON editor for the arguments, open while `status` is "editing"; `onEdit` gets a parsed object. */
export function ApprovalGateEditor({
	onEdit,
}: {
	onEdit?: (args: ApprovalArgs) => void;
}) {
	const { id, request, status, busy, onEditingChange, labels, styles } =
		useGate("ApprovalGateEditor");
	const [draft, setDraft] = useState("");
	const parsed = useMemo(() => parseArgs(draft), [draft]);
	const editorRef = useRef<HTMLTextAreaElement>(null);
	const argsKey = formatArgs(request.args);
	useEffect(() => {
		if (status !== "editing") return;
		setDraft(argsKey);
		editorRef.current?.focus();
	}, [status, argsKey]);

	return (
		<Section open={status === "editing"}>
			<div className={styles.stack()}>
				<label htmlFor={`${id}-editor`} className="sr-only">
					{labels.args}
				</label>
				<textarea
					ref={editorRef}
					id={`${id}-editor`}
					value={draft}
					onChange={(event) => setDraft(event.target.value)}
					spellCheck={false}
					aria-invalid={!parsed.ok}
					aria-describedby={parsed.ok ? undefined : `${id}-error`}
					className={styles.editor()}
				/>
				{parsed.ok ? null : (
					<p id={`${id}-error`} className={styles.error()}>
						{labels.invalidArgs}
						{parsed.line ? ` ${labels.line} ${parsed.line}.` : ""}
					</p>
				)}
				<div className={styles.actions()}>
					<Button
						size="sm"
						disabled={!parsed.ok}
						loading={busy}
						onClick={() => {
							if (parsed.ok && !busy) onEdit?.(parsed.args);
						}}
					>
						{labels.save}
					</Button>
					<Button size="sm" variant="ghost" onClick={() => onEditingChange?.(false)}>
						{labels.cancel}
					</Button>
				</div>
			</div>
		</Section>
	);
}

/** Approve, edit or deny; high risk asks once more, and deny takes an optional reason. */
export function ApprovalGateActions({
	onApprove,
	onAlwaysAllow,
	onDeny,
}: {
	onApprove?: () => void;
	/** Approves and trusts this tool from now on; never offered for high risk. */
	onAlwaysAllow?: () => void;
	onDeny?: (reason?: string) => void;
}) {
	const {
		id,
		request,
		status,
		busy,
		lapsed,
		step,
		setStep,
		onEditingChange,
		labels,
		styles,
	} = useGate("ApprovalGateActions");
	const [reason, setReason] = useState("");
	const confirmRef = useRef<HTMLDivElement>(null);
	const reasonRef = useRef<HTMLInputElement>(null);
	useLayoutEffect(() => {
		if (step === "confirm") confirmRef.current?.querySelector("button")?.focus();
		if (step === "deny") reasonRef.current?.focus();
	}, [step]);

	const approve = () => {
		if (busy || lapsed) return;
		if (request.risk === "high" && step !== "confirm") setStep("confirm");
		else onApprove?.();
	};
	const deny = () => {
		if (!busy) onDeny?.(reason.trim() || undefined);
	};
	const pending = status === "pending";

	return (
		<>
			<Section open={pending && step === "idle"}>
				<div className={styles.actions()}>
					<Button size="sm" disabled={lapsed} loading={busy} onClick={approve}>
						{labels.approve}
					</Button>
					{onAlwaysAllow && request.risk !== "high" ? (
						<Button
							size="sm"
							variant="outline"
							disabled={lapsed || busy}
							onClick={onAlwaysAllow}
						>
							{labels.alwaysAllow}
						</Button>
					) : null}
					<Button
						size="sm"
						variant="outline"
						disabled={busy}
						onClick={() => onEditingChange?.(true)}
					>
						{labels.edit}
					</Button>
					<Button
						size="sm"
						variant="ghost"
						disabled={busy}
						onClick={() => setStep("deny")}
					>
						{labels.deny}
					</Button>
				</div>
			</Section>

			<Section open={pending && step === "confirm"}>
				<div ref={confirmRef} role="alert" className={styles.confirm()}>
					<p className={styles.prompt()}>{labels.confirmPrompt}</p>
					<div className={styles.actions()}>
						<Button
							size="sm"
							variant="destructive"
							disabled={lapsed}
							loading={busy}
							onClick={approve}
						>
							{labels.confirmApprove}
						</Button>
						<Button
							size="sm"
							variant="ghost"
							disabled={busy}
							onClick={() => setStep("idle")}
						>
							{labels.back}
						</Button>
					</div>
				</div>
			</Section>

			<Section open={pending && step === "deny"}>
				<div className={styles.stack()}>
					<label htmlFor={`${id}-reason`} className="sr-only">
						{labels.reason}
					</label>
					<input
						ref={reasonRef}
						id={`${id}-reason`}
						value={reason}
						onChange={(event) => setReason(event.target.value)}
						placeholder={labels.reason}
						className={styles.input()}
						onKeyDown={(event) => {
							if (event.key === "Enter") deny();
						}}
					/>
					<div className={styles.actions()}>
						<Button size="sm" variant="destructive_soft" loading={busy} onClick={deny}>
							{labels.confirmDeny}
						</Button>
						<Button
							size="sm"
							variant="ghost"
							disabled={busy}
							onClick={() => setStep("idle")}
						>
							{labels.back}
						</Button>
					</div>
				</div>
			</Section>
		</>
	);
}
