"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "../button/button";
import { Checkbox } from "../checkbox/checkbox";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../hover-card/hover-card";
import { cn } from "../lib/cn";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../select/select";
import { Switch } from "../switch/switch";
import type { RecordsColumnMeta, RecordsColumnType } from "./types";

function Icon({ children, size = 14 }: { children: ReactNode; size?: number }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			{children}
		</svg>
	);
}

export const TYPE_GLYPHS: Record<RecordsColumnType, ReactNode> = {
	Text: <path d="M4 6h16M4 12h10M4 18h7" />,
	File: (
		<g>
			<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
			<path d="M14 2v6h6" />
		</g>
	),
	Collection: (
		<g>
			<ellipse cx="12" cy="5" rx="8" ry="3" />
			<path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
		</g>
	),
	"Single select": (
		<g>
			<circle cx="12" cy="12" r="9" />
			<path d="m8.5 12 2.4 2.4 4.6-4.9" />
		</g>
	),
	"Multi select": (
		<g>
			<path d="M11 6h9M11 12h9M11 18h9" />
			<path d="M4 6l1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17" />
		</g>
	),
	URL: (
		<g>
			<path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
			<path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" />
		</g>
	),
	Reference: <path d="M7 17 17 7M9 7h8v8" />,
	JSON: (
		<g>
			<path d="M8 4c-2 0-2 2-2 3s.5 3-2 3c2.5 0 2 2 2 3s0 3 2 3" />
			<path d="M16 4c2 0 2 2 2 3s-.5 3 2 3c-2.5 0-2 2-2 3s0 3-2 3" />
		</g>
	),
	"File splitter": (
		<g>
			<rect x="8" y="8" width="12" height="12" rx="2" />
			<path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
		</g>
	),
	Date: (
		<g>
			<rect x="3" y="5" width="18" height="16" rx="2.5" />
			<path d="M8 3v4M16 3v4M3 10h18" />
		</g>
	),
};

const TOOL_GLYPHS: Record<RecordsToolKindGlyph, ReactNode> = {
	model: (
		<path d="M12 3l1.7 5.1a2 2 0 0 0 1.2 1.2L20 11l-5.1 1.7a2 2 0 0 0-1.2 1.2L12 19l-1.7-5.1a2 2 0 0 0-1.2-1.2L4 11l5.1-1.7a2 2 0 0 0 1.2-1.2z" />
	),
	web: (
		<g>
			<circle cx="12" cy="12" r="9" />
			<path d="M3 12h18M12 3a13.5 13.5 0 0 1 3.5 9 13.5 13.5 0 0 1-3.5 9 13.5 13.5 0 0 1-3.5-9A13.5 13.5 0 0 1 12 3z" />
		</g>
	),
	user: (
		<g>
			<circle cx="12" cy="8" r="4" />
			<path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
		</g>
	),
};

type RecordsToolKindGlyph = "model" | "web" | "user";

const NEW_PROPERTY_TYPES: RecordsColumnType[] = [
	"Text",
	"File",
	"Collection",
	"Single select",
	"Multi select",
	"URL",
	"Reference",
	"JSON",
	"File splitter",
];

function ConfigRow({ label, children }: { label: string; children: ReactNode }) {
	return (
		<div className="relative flex h-8 items-center justify-between">
			<span className="text-[13px] text-muted-foreground">{label}</span>
			{children}
		</div>
	);
}

export interface ConfigPopoverProps {
	title: string;
	meta: RecordsColumnMeta;
	onMetaChange: (next: Partial<RecordsColumnMeta>) => void;
	inputOptions: string[];
	selectedInputs: string[];
	onInputsChange: (next: string[]) => void;
	modelOptions: string[];
	pinned: boolean;
	onTogglePin: () => void;
	onHide?: () => void;
	onCalculate: () => void;
	calculating: boolean;
}

/** Every picker (type, tool, inputs) composes the real `Select`/`Popover`, nested inside
 * this already-open popover, instead of the original's own hand-rolled anchored menus. */
export function ConfigPopover({
	title,
	meta,
	onMetaChange,
	inputOptions,
	selectedInputs,
	onInputsChange,
	modelOptions,
	pinned,
	onTogglePin,
	onHide,
	onCalculate,
	calculating,
}: ConfigPopoverProps) {
	const [grounding, setGrounding] = useState(false);
	const [moreSettingsOpen, setMoreSettingsOpen] = useState(false);
	const [advanced, setAdvanced] = useState({
		required: false,
		allowEmpty: true,
		confidence: false,
	});

	return (
		<div data-slot="records-table-config-popover">
			<div className="pb-2 font-medium text-[13.5px] text-foreground">{title}</div>

			<ConfigRow label="Type">
				<Select
					value={meta.type}
					onValueChange={(v) => onMetaChange({ type: v as RecordsColumnType })}
					items={NEW_PROPERTY_TYPES.map((type) => ({ value: type, label: type }))}
				>
					<SelectTrigger className="h-7 w-auto min-w-0 gap-1.5 border-none bg-transparent px-1.5 font-medium text-[13px] text-foreground hover:bg-foreground/[0.06]">
						<span className="text-muted-foreground">
							<Icon size={14}>{TYPE_GLYPHS[meta.type]}</Icon>
						</span>
						<SelectValue />
					</SelectTrigger>
					<SelectContent align="start">
						{NEW_PROPERTY_TYPES.map((type) => (
							<SelectItem key={type} value={type}>
								<span className="flex items-center gap-1.5">
									<span className="text-muted-foreground">
										<Icon size={14}>{TYPE_GLYPHS[type]}</Icon>
									</span>
									{type}
								</span>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</ConfigRow>

			<ConfigRow label="Tool">
				<Select
					value={meta.tool}
					onValueChange={(tool) => onMetaChange({ tool, toolKind: "model" })}
					items={modelOptions.map((model) => ({ value: model, label: model }))}
				>
					<SelectTrigger className="h-7 w-auto min-w-0 gap-1.5 border-none bg-transparent px-1.5 font-medium text-[13px] text-foreground hover:bg-foreground/[0.06]">
						<span
							className={
								meta.toolKind === "model" ? "text-primary" : "text-muted-foreground"
							}
						>
							<Icon size={14}>{TOOL_GLYPHS[meta.toolKind]}</Icon>
						</span>
						<SelectValue />
					</SelectTrigger>
					<SelectContent align="start">
						{modelOptions.map((model) => (
							<SelectItem key={model} value={model}>
								{model}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</ConfigRow>

			<ConfigRow label="Grounding">
				<span className="flex items-center gap-2">
					<Switch checked={grounding} onCheckedChange={setGrounding} />
					<HoverCard>
						<HoverCardTrigger
							aria-label="About grounding"
							className="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
						>
							<Icon size={13}>
								<g>
									<circle cx="12" cy="12" r="9" />
									<path d="M12 8h.01M11 12h1v4h1" />
								</g>
							</Icon>
						</HoverCardTrigger>
						<HoverCardContent side="top" className="w-56 text-[12px] leading-relaxed">
							Grounding lets the model verify generated values against connected sources.
						</HoverCardContent>
					</HoverCard>
				</span>
			</ConfigRow>

			<ConfigRow label="Inputs">
				<Popover>
					<PopoverTrigger className="flex h-7 max-w-[220px] items-center gap-1.5 rounded-md px-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground">
						{selectedInputs.length ? (
							<span className="flex min-w-0 items-center gap-1">
								{selectedInputs.slice(0, 2).map((input) => (
									<span
										key={input}
										className="max-w-[92px] truncate rounded-[5px] bg-primary/10 px-1.5 py-0.5 font-medium text-[12px] text-primary"
									>
										{input}
									</span>
								))}
								{selectedInputs.length > 2 ? (
									<span className="text-[11px] font-medium text-muted-foreground">
										+{selectedInputs.length - 2}
									</span>
								) : null}
							</span>
						) : (
							<span>Select inputs</span>
						)}
					</PopoverTrigger>
					<PopoverContent align="start" className="w-56 p-1.5">
						<div className="px-1.5 pt-0.5 pb-1 font-medium text-[11.5px] text-muted-foreground">
							Use values from
						</div>
						<div className="flex flex-col gap-0.5">
							{inputOptions.map((option) => (
								<Checkbox
									key={option}
									label={option}
									checked={selectedInputs.includes(option)}
									onCheckedChange={(checked) => {
										onInputsChange(
											checked
												? [...selectedInputs, option]
												: selectedInputs.filter((item) => item !== option),
										);
									}}
									className="min-h-8 rounded-md px-1.5 py-1 hover:bg-foreground/[0.06]"
								/>
							))}
						</div>
					</PopoverContent>
				</Popover>
			</ConfigRow>

			{meta.prompt ? (
				<div className="mt-2 min-h-[64px] rounded-lg border border-border bg-muted p-3 text-[13px] leading-relaxed">
					<span className="text-foreground">
						{meta.prompt.before}
						{meta.prompt.chip ? (
							<span className="rounded-[5px] bg-primary/10 px-1.5 py-0.5 font-medium text-[12px] text-primary">
								{meta.prompt.chip}
							</span>
						) : null}
						{meta.prompt.after}
					</span>
				</div>
			) : null}

			<Button
				variant="secondary"
				size="sm"
				disabled={calculating}
				onClick={onCalculate}
				className="mt-2.5 w-full"
			>
				<Icon size={14}>
					<path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
				</Icon>
				Go calculate
			</Button>

			<div className="mt-3 flex flex-col gap-0.5 border-border border-t pt-2">
				<button
					type="button"
					aria-pressed={pinned}
					onClick={onTogglePin}
					className="flex h-8 items-center gap-2.5 rounded-md px-1.5 text-left text-[13px] text-foreground transition-colors hover:bg-foreground/[0.06]"
				>
					<span className={pinned ? "text-primary" : "text-muted-foreground"}>
						<Icon size={15}>
							<path d="M12 17v5M8 3h8l-1 7 3 3H6l3-3-1-7z" />
						</Icon>
					</span>
					{pinned ? "Unpin" : "Pin"}
				</button>
				<button
					type="button"
					aria-expanded={moreSettingsOpen}
					onClick={() => setMoreSettingsOpen((open) => !open)}
					className="flex h-8 items-center gap-2.5 rounded-md px-1.5 text-left text-[13px] text-foreground transition-colors hover:bg-foreground/[0.06]"
				>
					<span className="text-muted-foreground">
						<Icon size={15}>
							<g>
								<circle cx="12" cy="12" r="3" />
								<path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" />
							</g>
						</Icon>
					</span>
					<span className="flex-1">More settings</span>
					<span
						className={cn(
							"text-muted-foreground transition-transform duration-150",
							moreSettingsOpen && "rotate-90",
						)}
					>
						<Icon size={12}>
							<path d="M9 6l6 6-6 6" />
						</Icon>
					</span>
				</button>
				{onHide ? (
					<button
						type="button"
						onClick={onHide}
						className="flex h-8 items-center gap-2.5 rounded-md px-1.5 text-left text-[13px] text-foreground transition-colors hover:bg-foreground/[0.06]"
					>
						<span className="text-muted-foreground">
							<Icon size={15}>
								<g>
									<path d="M10.6 5.1A9.8 9.8 0 0 1 12 5c7 0 10 7 10 7a16.3 16.3 0 0 1-2.1 3M6.6 6.6A16 16 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.4-1.6M3 3l18 18" />
									<path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
								</g>
							</Icon>
						</span>
						Hide from view
					</button>
				) : null}
			</div>

			{moreSettingsOpen ? (
				<div className="card-fade-up mt-2 border-border border-t pt-2">
					<div className="pb-1 font-medium text-[11.5px] text-muted-foreground">
						Behavior
					</div>
					<ConfigRow label="Required value">
						<Switch
							checked={advanced.required}
							onCheckedChange={(required) =>
								setAdvanced((current) => ({ ...current, required }))
							}
						/>
					</ConfigRow>
					<ConfigRow label="Allow empty results">
						<Switch
							checked={advanced.allowEmpty}
							onCheckedChange={(allowEmpty) =>
								setAdvanced((current) => ({ ...current, allowEmpty }))
							}
						/>
					</ConfigRow>
					<ConfigRow label="Show confidence">
						<Switch
							checked={advanced.confidence}
							onCheckedChange={(confidence) =>
								setAdvanced((current) => ({ ...current, confidence }))
							}
						/>
					</ConfigRow>
				</div>
			) : null}
		</div>
	);
}
