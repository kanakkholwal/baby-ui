"use client";

import { useState } from "react";
import { cn } from "../lib/cn";
import { ScrubField } from "../scrub-field/scrub-field";
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
	/** Identifies the subject `fields` describes (an element/layer id). Changing it resets
	 * uncontrolled edits, so switching selection doesn't keep showing the old edits. */
	id?: string;
	/** Controlled editable state. Omit to let the card own it. */
	state?: FineTuneState;
	defaultState?: FineTuneState;
	/** Called with the full editable state whenever the user edits it. */
	onChange?: (state: FineTuneState) => void;
	className?: string;
}

function initialState(fields: FineTuneField[]): FineTuneState {
	return {
		segment: 0,
		values: Object.fromEntries(fields.map((f) => [f.key, f.value])),
		type: "",
	};
}

/** A scrub handle drags (pointer), arrows (⇧ for ×10) or types directly to change a value. */
export function FineTuneCard({
	fields,
	options = [],
	labels,
	size = "md",
	id,
	state: stateProp,
	defaultState,
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
	const [internalState, setInternalState] = useState<FineTuneState>(
		() => defaultState ?? initialState(fields),
	);
	const [seenId, setSeenId] = useState(id);
	if (stateProp === undefined && id !== seenId) {
		setSeenId(id);
		setInternalState(initialState(fields));
	}
	const state = stateProp ?? internalState;
	const { root } = fineTuneCard({ size });

	function update(next: FineTuneState) {
		if (stateProp === undefined) setInternalState(next);
		onChange?.(next);
	}

	function selectSeg(i: number) {
		update({ ...state, segment: i });
	}

	function setValue(key: string, v: number) {
		update({ ...state, values: { ...state.values, [key]: v } });
	}

	function selectType(value: string) {
		update({ ...state, type: value });
	}

	const changed = fields.some((f) => (state.values[f.key] ?? f.value) !== f.value);
	const edited = state.segment !== 0 || changed || state.type !== "";

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
							transform: `translateX(${state.segment * 100}%)`,
						}}
					/>
					{SEGMENTS.map((s, i) => (
						<button
							key={s}
							type="button"
							aria-label={`${s} layout`}
							aria-pressed={i === state.segment}
							onClick={() => selectSeg(i)}
							className={cn(
								"relative z-10 flex h-6 items-center justify-center transition-colors duration-200",
								i === state.segment ? "text-primary" : "text-muted-foreground",
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
								value={state.values[f.key] ?? f.value}
								onValueChange={(v) => setValue(f.key, v)}
								min={f.min}
								max={f.max}
								step={f.step}
								suffix={f.suffix}
								tone={(state.values[f.key] ?? f.value) !== f.value ? "edited" : "default"}
							/>
						))}
					</div>
				))}
			</div>

			{options.length > 0 ? (
				<div className="flex items-center justify-between px-3 py-2">
					<span className="text-[12px] text-muted-foreground">{text.type}</span>
					<Select value={state.type} onValueChange={selectType}>
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
