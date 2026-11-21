"use client";

import { type ComponentProps, createContext, type ReactNode, useContext } from "react";
import { Badge } from "../../badge/react/badge";
import { Button } from "../../button/react/button";
import { CopyButton } from "../../copy-button/react/copy-button";
import { cn } from "../../lib/cn";
import { Progress } from "../../progress/react/progress";
import {
	STATUS_BADGE,
	type TranscriptRowStatus,
	type TranscriptRowVariant,
	transcriptRow,
} from "../variants";

export type { TranscriptRowStatus, TranscriptRowVariant };

type Ctx = {
	status: TranscriptRowStatus | undefined;
	variant: TranscriptRowVariant;
	clamp: boolean;
};

const TranscriptRowCtx = createContext<Ctx | null>(null);

function useTranscriptRow() {
	const ctx = useContext(TranscriptRowCtx);
	if (!ctx) throw new Error("TranscriptRow parts must be used inside <TranscriptRow>");
	return ctx;
}

/** A saved transcript. Give it a `status` for a file job; leave it off for a history entry. */
export function TranscriptRow({
	status,
	variant = "card",
	clamp = false,
	className,
	...props
}: ComponentProps<"li"> & {
	status?: TranscriptRowStatus;
	variant?: TranscriptRowVariant;
	/** Limits the text to three lines. */
	clamp?: boolean;
}) {
	return (
		<TranscriptRowCtx.Provider value={{ status, variant, clamp }}>
			<li
				data-slot="transcript-row"
				data-status={status}
				className={cn(transcriptRow({ variant, status }).root(), className)}
				{...props}
			/>
		</TranscriptRowCtx.Provider>
	);
}

export function TranscriptRowHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="transcript-row-header"
			className={cn(transcriptRow().header(), className)}
			{...props}
		/>
	);
}

export function TranscriptRowTitle({ className, ...props }: ComponentProps<"span">) {
	return (
		<span
			data-slot="transcript-row-title"
			className={cn(transcriptRow().title(), className)}
			{...props}
		/>
	);
}

export function TranscriptRowActions({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="transcript-row-actions"
			className={cn(transcriptRow().actions(), className)}
			{...props}
		/>
	);
}

/** The job's badge; children replace its label. Renders nothing for a history entry. */
export function TranscriptRowStatusBadge({ children }: { children?: ReactNode }) {
	const row = useTranscriptRow();
	if (!row.status) return null;
	const badge = STATUS_BADGE[row.status];
	return (
		<Badge data-slot="transcript-row-status" size="sm" variant={badge.variant}>
			{children ?? badge.label}
		</Badge>
	);
}

export function TranscriptRowText({ className, ...props }: ComponentProps<"p">) {
	const row = useTranscriptRow();
	return (
		<p
			data-slot="transcript-row-text"
			className={cn(transcriptRow({ clamp: row.clamp }).text(), className)}
			{...props}
		/>
	);
}

/** Shown while the job runs. */
export function TranscriptRowProgress({
	value,
	label,
}: {
	value: number;
	label: string;
}) {
	const row = useTranscriptRow();
	if (row.status !== "running") return null;
	return (
		<Progress size="sm" value={value} label={label} helper={`${Math.round(value)}%`} />
	);
}

/** Shown when the job failed. */
export function TranscriptRowError({ className, ...props }: ComponentProps<"p">) {
	const row = useTranscriptRow();
	if (row.status !== "failed") return null;
	return (
		<p
			data-slot="transcript-row-error"
			className={cn(transcriptRow().error(), className)}
			{...props}
		/>
	);
}

/** Copies the text; for history entries and finished jobs. */
export function TranscriptRowCopy({
	text,
	label = "Copy text",
}: {
	text: string;
	label?: string;
}) {
	const row = useTranscriptRow();
	if (row.status && row.status !== "done") return null;
	return <CopyButton text={text} iconOnly label={label} />;
}

/** Stops a waiting or running job. Renders only when a handler is given. */
export function TranscriptRowCancel({
	onClick,
	children = "Cancel",
}: {
	onClick?: () => void;
	children?: string;
}) {
	const row = useTranscriptRow();
	if (!onClick || (row.status !== "queued" && row.status !== "running")) return null;
	return (
		<Button data-slot="transcript-row-cancel" size="sm" variant="ghost" onClick={onClick}>
			{children}
		</Button>
	);
}

/** Starts a failed job again. Renders only when a handler is given. */
export function TranscriptRowRetry({
	onClick,
	children = "Try again",
}: {
	onClick?: () => void;
	children?: string;
}) {
	const row = useTranscriptRow();
	if (!onClick || row.status !== "failed") return null;
	return (
		<Button
			data-slot="transcript-row-retry"
			size="sm"
			variant="secondary"
			onClick={onClick}
		>
			{children}
		</Button>
	);
}
