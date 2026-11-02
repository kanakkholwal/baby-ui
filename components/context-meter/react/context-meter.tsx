"use client";

import {
	type ComponentProps,
	type CSSProperties,
	createContext,
	type ReactNode,
	useContext,
	useState,
} from "react";
import { Button } from "../../button/react/button";
import { cn } from "../../lib/cn";
import { RollingDigits } from "../../rolling-digits/react/rolling-digits";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../../tooltip/react/tooltip";
import {
	CONTEXT_METER_ICONS,
	type ContextMeterVariant,
	type ContextSegment,
	contextMeter,
	formatTokens,
	segmentColor,
} from "../variants";

export type { ContextMeterVariant, ContextSegment };

type Ctx = {
	segments: ContextSegment[];
	limit: number;
	used: number;
	compactAt: number;
	onAction?: (id: string) => void;
	/** The source being pointed at or focused, in the bar or the rows. */
	active: string | null;
	setActive: (id: string | null) => void;
	styles: ReturnType<typeof contextMeter>;
};
const ContextMeterContext = createContext<Ctx | null>(null);

function useContextMeter(part: string): Ctx {
	const ctx = useContext(ContextMeterContext);
	if (!ctx) throw new Error(`${part} must be used inside <ContextMeter>`);
	return ctx;
}

function Glyph({ d, className }: { d: string; className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			aria-hidden
			className={cn(
				"fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]",
				className,
			)}
		>
			<path d={d} />
		</svg>
	);
}

export interface ContextMeterProps extends ComponentProps<"section"> {
	/** What fills the window, in the order the bar draws them. */
	segments: ContextSegment[];
	/** The model's window, in tokens. */
	limit: number;
	/** From 0 to 1: past it the percentage turns amber. */
	warnAt?: number;
	/** From 0 to 1: where the bar marks auto-compaction; past it the percentage turns red. */
	compactAt?: number;
	/** A row's `action` was pressed, e.g. "Clear" on tool results. */
	onAction?: (id: string) => void;
	variant?: ContextMeterVariant;
}

/** The root: how full a model's context window is, split by what fills it. */
export function ContextMeter({
	segments,
	limit,
	warnAt = 0.7,
	compactAt = 0.85,
	onAction,
	variant = "framed",
	className,
	children,
	...props
}: ContextMeterProps) {
	const used = segments.reduce((sum, s) => sum + Math.max(0, s.value), 0);
	const ratio = limit > 0 ? used / limit : 0;
	const [active, setActive] = useState<string | null>(null);
	const styles = contextMeter({ variant });
	return (
		<ContextMeterContext.Provider
			value={{ segments, limit, used, compactAt, onAction, active, setActive, styles }}
		>
			<section
				data-slot="context-meter"
				data-variant={variant}
				data-warn={(ratio >= warnAt && ratio < compactAt) || undefined}
				data-compact={ratio >= compactAt || undefined}
				data-active={active ?? undefined}
				aria-label="Context window"
				className={cn(styles.root(), className)}
				{...props}
			>
				{children}
			</section>
		</ContextMeterContext.Provider>
	);
}

/** The top row: lays out ContextMeterIcon, Title, Subtitle and Percent. */
export function ContextMeterHeader({ className, ...props }: ComponentProps<"div">) {
	const { styles } = useContextMeter("ContextMeterHeader");
	return (
		<div
			data-slot="context-meter-header"
			className={cn(styles.header(), className)}
			{...props}
		/>
	);
}

/** The header glyph; children replace the layers icon. */
export function ContextMeterIcon({
	className,
	children,
	...props
}: ComponentProps<"span">) {
	const { styles } = useContextMeter("ContextMeterIcon");
	return (
		<span
			aria-hidden
			data-slot="context-meter-icon"
			className={cn(styles.icon(), className)}
			{...props}
		>
			{children ?? <Glyph d={CONTEXT_METER_ICONS.layers} />}
		</span>
	);
}

export function ContextMeterTitle({
	className,
	children = "Context window",
	...props
}: ComponentProps<"h3">) {
	const { styles } = useContextMeter("ContextMeterTitle");
	return (
		<h3
			data-slot="context-meter-title"
			className={cn(styles.title(), className)}
			{...props}
		>
			{children}
		</h3>
	);
}

/** Usually the model, e.g. "Sonnet 5.5". */
export function ContextMeterSubtitle({ className, ...props }: ComponentProps<"p">) {
	const { styles } = useContextMeter("ContextMeterSubtitle");
	return (
		<p
			data-slot="context-meter-subtitle"
			className={cn(styles.subtitle(), className)}
			{...props}
		/>
	);
}

/** How full the window is, as a rolling percentage. */
export function ContextMeterPercent({ className, ...props }: ComponentProps<"span">) {
	const { used, limit, styles } = useContextMeter("ContextMeterPercent");
	const percent = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;
	return (
		<span
			data-slot="context-meter-percent"
			className={cn(styles.percent(), className)}
			{...props}
		>
			<span className="sr-only">{percent}% used</span>
			<span aria-hidden>
				<RollingDigits value={percent} />%
			</span>
		</span>
	);
}

/** The inner surface: the summary, bar, rows and footer sit inside it. */
export function ContextMeterBody({ className, ...props }: ComponentProps<"div">) {
	const { styles } = useContextMeter("ContextMeterBody");
	return (
		<div
			data-slot="context-meter-body"
			className={cn(styles.body(), className)}
			{...props}
		/>
	);
}

/** "139k of 200k tokens" and how much is left. */
export function ContextMeterSummary({
	unit = "tokens",
	className,
}: {
	unit?: string;
	className?: string;
}) {
	const { used, limit, styles: s } = useContextMeter("ContextMeterSummary");
	return (
		<div data-slot="context-meter-summary" className={cn(s.summary(), className)}>
			<span>
				<span className={s.used()}>{formatTokens(used)}</span>{" "}
				<span className={s.of()}>
					of {formatTokens(limit)} {unit}
				</span>
			</span>
			<span className={s.left()}>{formatTokens(Math.max(0, limit - used))} left</span>
		</div>
	);
}

/** One segment per source, the free space, and a tick where auto-compaction starts. */
export function ContextMeterBar({ className }: { className?: string }) {
	const {
		segments,
		limit,
		used,
		compactAt,
		active,
		setActive,
		styles: s,
	} = useContextMeter("ContextMeterBar");
	const scale = Math.max(limit, used);
	return (
		<div data-slot="context-meter-bar" className={cn(s.bar(), className)}>
			<meter
				className="sr-only"
				min={0}
				max={limit}
				value={Math.min(used, limit)}
				aria-label="Context used"
			>
				{formatTokens(used)} of {formatTokens(limit)}
			</meter>
			<TooltipProvider delay={0}>
				{segments.map((segment, i) =>
					segment.value > 0 ? (
						<Tooltip
							key={segment.id}
							delay={0}
							onOpenChange={(open) => setActive(open ? segment.id : null)}
						>
							<TooltipTrigger
								render={
									<button
										type="button"
										aria-label={`${segment.label}, ${formatTokens(segment.value)}`}
										data-active={active === segment.id || undefined}
										className={s.segment()}
										style={
											{
												width: `${(segment.value / scale) * 100}%`,
												"--segment": segmentColor(segment, i),
											} as CSSProperties
										}
									/>
								}
							/>
							<TooltipContent>
								<span className={s.tipTitle()}>{segment.label}</span>
								<span className={s.tipMeta()}>
									{formatTokens(segment.value)} ·{" "}
									{((segment.value / Math.max(used, 1)) * 100).toFixed(1)}% of use
								</span>
							</TooltipContent>
						</Tooltip>
					) : null,
				)}
			</TooltipProvider>
			<span aria-hidden className={s.track()} />
			<span
				aria-hidden
				className={s.threshold()}
				style={{ left: `${compactAt * 100}%` }}
			/>
		</div>
	);
}

/** A row per source: its colour, label, note, size, and a lock or an action. */
export function ContextMeterList({
	pinnedLabel = "Pinned",
	className,
}: {
	pinnedLabel?: string;
	className?: string;
}) {
	const {
		segments,
		onAction,
		active,
		setActive,
		styles: s,
	} = useContextMeter("ContextMeterList");
	return (
		<ul data-slot="context-meter-list" className={cn(s.list(), className)}>
			{segments.map((segment, i) => (
				<li
					key={segment.id}
					data-active={active === segment.id || undefined}
					onPointerEnter={() => setActive(segment.id)}
					onPointerLeave={() => setActive(null)}
					onFocus={() => setActive(segment.id)}
					onBlur={() => setActive(null)}
					className={s.row()}
				>
					<span
						aria-hidden
						className={s.dot()}
						style={{ background: segmentColor(segment, i) }}
					/>
					<span className={s.label()}>{segment.label}</span>
					<span className={s.detail()}>{segment.detail}</span>
					<span className={s.value()}>{formatTokens(segment.value)}</span>
					<span className={s.trailing()}>
						{segment.pinned ? (
							<span className={s.pinned()}>
								<Glyph d={CONTEXT_METER_ICONS.lock} />
								{pinnedLabel}
							</span>
						) : segment.action && onAction ? (
							<Button
								variant="ghost"
								size="sm"
								onClick={() => onAction(segment.id)}
								aria-label={`${segment.action} ${segment.label}`}
								className={s.action()}
							>
								{segment.action}
							</Button>
						) : null}
					</span>
				</li>
			))}
		</ul>
	);
}

/** The closing row: a note, then ContextMeterCompact. */
export function ContextMeterFooter({
	note,
	className,
	children,
	...props
}: ComponentProps<"div"> & {
	/** A line such as "Auto-compacts at 85%". */
	note?: ReactNode;
}) {
	const { styles } = useContextMeter("ContextMeterFooter");
	return (
		<div
			data-slot="context-meter-footer"
			className={cn(styles.footer(), className)}
			{...props}
		>
			{note && <p className={styles.note()}>{note}</p>}
			{children}
		</div>
	);
}

/** Summarizes the conversation to free space; `loading` while that runs. */
export function ContextMeterCompact({
	onClick,
	loading = false,
	children = "Compact now",
	className,
}: {
	onClick: () => void;
	loading?: boolean;
	children?: ReactNode;
	className?: string;
}) {
	const { styles } = useContextMeter("ContextMeterCompact");
	return (
		<Button
			data-slot="context-meter-compact"
			variant="secondary"
			size="sm"
			loading={loading}
			onClick={onClick}
			className={cn(styles.compact(), className)}
		>
			<Glyph d={CONTEXT_METER_ICONS.compact} className="size-3.5" />
			{children}
		</Button>
	);
}
