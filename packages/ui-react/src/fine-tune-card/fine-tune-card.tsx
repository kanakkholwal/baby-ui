"use client";

import { useRef, useState } from "react";
import { cn } from "../lib/cn";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../select/select";
import { type FineTuneCardSize, fineTuneCard } from "./variants";

export type { FineTuneCardSize };

export type FineTuneField = {
	key: string;
	label: string;
	value: number;
	min: number;
	max: number;
	step?: number;
	suffix?: string;
};

export type FineTuneCardLabels = {
	title?: string;
	layout?: string;
	type?: string;
	placeholder?: string;
	adjust?: string;
	edited?: string;
};

export type FineTuneState = {
	segment: number;
	values: Record<string, number>;
	type: string;
};

const DEFAULT_LABELS: Required<FineTuneCardLabels> = {
	title: "Untitled",
	layout: "Layout",
	type: "Type",
	placeholder: "Select type",
	adjust: "Adjust",
	edited: "Edited",
};

const SEGMENTS = ["row", "col", "grid"] as const;

function SegmentIcon({ kind }: { kind: (typeof SEGMENTS)[number] }) {
	const dot = "size-1.5 rounded-[2px] border-[1.2px] border-current";
	if (kind === "row") {
		return (
			<span className="flex gap-0.5">
				{[0, 1, 2].map((i) => (
					<span key={i} className={dot} />
				))}
			</span>
		);
	}
	if (kind === "col") {
		return (
			<span className="flex flex-col gap-0.5">
				{[0, 1].map((i) => (
					<span key={i} className={dot} />
				))}
			</span>
		);
	}
	return (
		<span className="grid grid-cols-2 gap-0.5">
			{[0, 1, 2, 3].map((i) => (
				<span key={i} className={dot} />
			))}
		</span>
	);
}

function ScrubField({
	label,
	value,
	onChange,
	min,
	max,
	step = 1,
	suffix = "",
	active,
}: {
	label: string;
	value: number;
	onChange: (v: number) => void;
	min: number;
	max: number;
	step?: number;
	suffix?: string;
	active?: boolean;
}) {
	const drag = useRef<{ x: number; v: number } | null>(null);
	const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v)));

	return (
		<div
			className={cn(
				"flex h-6.5 min-w-0 items-center gap-1 rounded-lg py-1 pr-1 pl-0.5 transition-[background-color,box-shadow] duration-200",
				active ? "bg-primary/10 ring-1 ring-primary" : "bg-input",
			)}
		>
			<span
				role="slider"
				aria-label={label}
				aria-valuenow={value}
				aria-valuemin={min}
				aria-valuemax={max}
				tabIndex={0}
				onPointerDown={(event) => {
					(event.target as HTMLElement).setPointerCapture(event.pointerId);
					drag.current = { x: event.clientX, v: value };
				}}
				onPointerMove={(event) => {
					if (!drag.current) return;
					onChange(clamp(drag.current.v + ((event.clientX - drag.current.x) / 2) * step));
				}}
				onPointerUp={() => {
					drag.current = null;
				}}
				onKeyDown={(event) => {
					const mult = event.shiftKey ? 10 : 1;
					if (event.key === "ArrowUp" || event.key === "ArrowRight") {
						event.preventDefault();
						onChange(clamp(value + step * mult));
					} else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
						event.preventDefault();
						onChange(clamp(value - step * mult));
					}
				}}
				className="flex h-full shrink-0 cursor-ew-resize touch-none select-none items-center rounded-[4px] px-0.5 text-[12px] text-muted-foreground outline-none hover:text-foreground focus-visible:text-primary"
			>
				{label}
			</span>
			<input
				inputMode="numeric"
				value={value}
				onChange={(event) => {
					const n = Number(event.target.value.replace(/[^\d-]/g, ""));
					if (!Number.isNaN(n)) onChange(clamp(n));
				}}
				aria-label={`${label} value`}
				className="min-w-0 flex-1 bg-transparent text-[12px] text-foreground tabular-nums outline-none"
			/>
			{suffix ? (
				<span className="shrink-0 pr-0.5 text-[11.5px] text-muted-foreground">
					{suffix}
				</span>
			) : null}
		</div>
	);
}

function chunk<T>(items: T[], size: number): T[][] {
	const rows: T[][] = [];
	for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
	return rows;
}

export interface FineTuneCardProps {
	/** The scrub-able properties shown in the layout grid, rendered in pairs. */
	fields: FineTuneField[];
	/** Options offered in the Type select; the row is hidden when empty. */
	options?: string[];
	/** Prominent copy strings, merged over generic defaults. */
	labels?: FineTuneCardLabels;
	size?: FineTuneCardSize;
	/** Called with the full editable state whenever the user edits it. */
	onChange?: (state: FineTuneState) => void;
	className?: string;
}

/** A scrub handle drags (pointer), arrows (⇧ for ×10) or types directly to change a value. */
export function FineTuneCard({
	fields,
	options = [],
	labels,
	size = "md",
	onChange,
	className,
}: FineTuneCardProps) {
	const text: Required<FineTuneCardLabels> = {
		title: labels?.title ?? DEFAULT_LABELS.title,
		layout: labels?.layout ?? DEFAULT_LABELS.layout,
		type: labels?.type ?? DEFAULT_LABELS.type,
		placeholder: labels?.placeholder ?? DEFAULT_LABELS.placeholder,
		adjust: labels?.adjust ?? DEFAULT_LABELS.adjust,
		edited: labels?.edited ?? DEFAULT_LABELS.edited,
	};
	const [seg, setSeg] = useState(0);
	const [values, setValues] = useState<Record<string, number>>(() =>
		Object.fromEntries(fields.map((f) => [f.key, f.value])),
	);
	const [typeValue, setTypeValue] = useState("");
	const { root } = fineTuneCard({ size });

	function selectSeg(i: number) {
		setSeg(i);
		onChange?.({ segment: i, values, type: typeValue });
	}

	function setValue(key: string, v: number) {
		setValues((current) => {
			const next = { ...current, [key]: v };
			onChange?.({ segment: seg, values: next, type: typeValue });
			return next;
		});
	}

	function selectType(value: string) {
		setTypeValue(value);
		onChange?.({ segment: seg, values, type: value });
	}

	const changed = fields.some((f) => values[f.key] !== f.value);
	const edited = seg !== 0 || changed || typeValue !== "";

	return (
		<div data-slot="fine-tune-card" className={cn(root(), className)}>
			<div className="flex items-center justify-between border-border border-b px-3 py-2">
				<span className="font-medium text-[13px] text-foreground">{text.title}</span>
				{edited ? (
					<span className="pop-in flex items-center gap-1.5 font-medium text-[12px] text-success">
						<svg
							width="10"
							height="10"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="3"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden
						>
							<path d="M20 6 9 17l-5-5" />
						</svg>
						{text.edited}
					</span>
				) : (
					<span className="flex items-center gap-1.5">
						<span className="flex size-4.5 items-center justify-center rounded-[5px] border border-primary/30 bg-primary/10 text-primary">
							<svg
								width="9"
								height="9"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden
							>
								<path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
							</svg>
						</span>
						<span className="reasoning-shimmer text-[12px] font-medium">
							{text.adjust}
						</span>
					</span>
				)}
			</div>

			<div className="flex flex-col gap-2 border-border border-b px-3 py-2.5">
				<p className="font-medium text-[12.5px] text-foreground">{text.layout}</p>
				<div className="relative grid grid-cols-3 rounded-lg bg-input p-0.5">
					<span
						aria-hidden
						className="absolute inset-y-0.5 rounded-md bg-card shadow-sm transition-transform duration-300 ease-[var(--ease-out)]"
						style={{
							width: "calc((100% - 4px) / 3)",
							left: 2,
							transform: `translateX(${seg * 100}%)`,
						}}
					/>
					{SEGMENTS.map((s, i) => (
						<button
							key={s}
							type="button"
							aria-label={`${s} layout`}
							aria-pressed={i === seg}
							onClick={() => selectSeg(i)}
							className={cn(
								"relative z-10 flex h-6 items-center justify-center transition-colors duration-200",
								i === seg ? "text-primary" : "text-muted-foreground",
							)}
						>
							<SegmentIcon kind={s} />
						</button>
					))}
				</div>
				{chunk(fields, 2).map((pair) => (
					<div
						key={pair.map((f) => f.key).join("-")}
						className="grid min-w-0 grid-cols-2 gap-2"
					>
						{pair.map((f) => (
							<ScrubField
								key={f.key}
								label={f.label}
								value={values[f.key] ?? f.value}
								onChange={(v) => setValue(f.key, v)}
								min={f.min}
								max={f.max}
								step={f.step}
								suffix={f.suffix}
								active={(values[f.key] ?? f.value) !== f.value}
							/>
						))}
					</div>
				))}
			</div>

			{options.length > 0 ? (
				<div className="flex items-center justify-between px-3 py-2">
					<span className="text-[12px] text-muted-foreground">{text.type}</span>
					<Select value={typeValue} onValueChange={selectType}>
						<SelectTrigger className="h-6.5 w-30 rounded-lg px-2 text-[12px]">
							<SelectValue placeholder={text.placeholder} />
						</SelectTrigger>
						<SelectContent align="end">
							{options.map((item) => (
								<SelectItem key={item} value={item}>
									{item}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			) : null}
		</div>
	);
}
