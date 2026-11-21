"use client";

import {
	type ComponentProps,
	type CSSProperties,
	createContext,
	useContext,
} from "react";
import { Button } from "../../button/react/button";
import { cn } from "../../lib/cn";
import { Progress } from "../../progress/react/progress";
import { formatBytes, formatEta, formatSpeed, percentOf } from "../format";
import { DOWNLOAD_CARD_ICONS } from "../icons";
import {
	type DownloadCardPhase,
	type DownloadCardVariant,
	downloadCard,
} from "../variants";

export type { DownloadCardPhase, DownloadCardVariant };

type Ctx = {
	variant: DownloadCardVariant;
	phase: DownloadCardPhase;
	downloaded: number;
	total: number;
	bytesPerSecond: number;
	percent: number;
};

const DownloadCardCtx = createContext<Ctx | null>(null);

function useDownloadCard() {
	const ctx = useContext(DownloadCardCtx);
	if (!ctx) throw new Error("DownloadCard parts must be used inside <DownloadCard>");
	return ctx;
}

export function DownloadCard({
	downloaded,
	total,
	bytesPerSecond = 0,
	phase = "downloading",
	variant = "default",
	className,
	...props
}: ComponentProps<"div"> & {
	downloaded: number;
	total: number;
	bytesPerSecond?: number;
	phase?: DownloadCardPhase;
	variant?: DownloadCardVariant;
}) {
	const ctx: Ctx = {
		variant,
		phase,
		downloaded,
		total,
		bytesPerSecond,
		percent: percentOf(downloaded, total),
	};
	return (
		<DownloadCardCtx.Provider value={ctx}>
			<div
				data-slot="download-card"
				data-phase={phase}
				role="status"
				aria-live="polite"
				className={cn(downloadCard({ variant, phase }).root(), className)}
				{...props}
			/>
		</DownloadCardCtx.Provider>
	);
}

export function DownloadCardHeader({ className, ...props }: ComponentProps<"div">) {
	const card = useDownloadCard();
	return (
		<div
			data-slot="download-card-header"
			className={cn(downloadCard({ variant: card.variant }).header(), className)}
			{...props}
		/>
	);
}

export function DownloadCardIcon({
	className,
	children,
	...props
}: ComponentProps<"span">) {
	const card = useDownloadCard();
	return (
		<span
			data-slot="download-card-icon"
			aria-hidden
			className={cn(
				downloadCard({ phase: card.phase, variant: card.variant }).icon(),
				className,
			)}
			style={{ "--dl-progress": `${card.percent}%`, ...props.style } as CSSProperties}
			{...props}
		>
			{children ?? (
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden
				>
					<path d={DOWNLOAD_CARD_ICONS[card.phase]} />
				</svg>
			)}
		</span>
	);
}

export function DownloadCardText({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="download-card-text"
			className={cn(downloadCard().text(), className)}
			{...props}
		/>
	);
}

export function DownloadCardTitle({ className, ...props }: ComponentProps<"p">) {
	return (
		<p
			data-slot="download-card-title"
			className={cn(downloadCard().title(), className)}
			{...props}
		/>
	);
}

export function DownloadCardDetail({ className, ...props }: ComponentProps<"p">) {
	return (
		<p
			data-slot="download-card-detail"
			className={cn(downloadCard().detail(), className)}
			{...props}
		/>
	);
}

/** The share done, or "Checking" while the file is verified; children replace either. */
export function DownloadCardPercent({
	className,
	children,
	...props
}: ComponentProps<"span">) {
	const card = useDownloadCard();
	return (
		<span
			data-slot="download-card-percent"
			className={cn(downloadCard().percent(), className)}
			{...props}
		>
			{children ??
				(card.phase === "checking" ? "Checking" : `${Math.round(card.percent)}%`)}
		</span>
	);
}

export function DownloadCardProgress({
	label,
	className,
}: {
	/** Accessible name for the bar, usually the file name. */
	label: string;
	className?: string;
}) {
	const card = useDownloadCard();
	return (
		<Progress
			size="sm"
			className={className}
			value={card.percent}
			indeterminate={card.phase === "checking" || card.total === 0}
			label={label}
		/>
	);
}

export function DownloadCardFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="download-card-footer"
			className={cn(downloadCard().footer(), className)}
			{...props}
		/>
	);
}

/** "12 MB of 80 MB · 4 MB/s · 17 s left"; children replace it. */
export function DownloadCardStats({
	className,
	children,
	...props
}: ComponentProps<"p">) {
	const card = useDownloadCard();
	const eta = formatEta(Math.max(0, card.total - card.downloaded), card.bytesPerSecond);
	return (
		<p
			data-slot="download-card-stats"
			className={cn(downloadCard().stats(), className)}
			{...props}
		>
			{children ??
				(card.phase === "checking"
					? "Making sure the file is intact"
					: card.total > 0
						? [
								`${formatBytes(card.downloaded)} of ${formatBytes(card.total)}`,
								card.bytesPerSecond > 0 ? formatSpeed(card.bytesPerSecond) : "",
								eta,
							]
								.filter(Boolean)
								.join(" · ")
						: "Starting")}
		</p>
	);
}

/** Renders only while downloading and when a handler is given; cancelling a check is not offered. */
export function DownloadCardCancel({
	onClick,
	children = "Cancel",
	className,
}: {
	onClick?: () => void;
	children?: string;
	className?: string;
}) {
	const card = useDownloadCard();
	if (!onClick || card.phase !== "downloading") return null;
	return (
		<Button
			data-slot="download-card-cancel"
			size="sm"
			variant="ghost"
			className={className}
			onClick={onClick}
		>
			{children}
		</Button>
	);
}
