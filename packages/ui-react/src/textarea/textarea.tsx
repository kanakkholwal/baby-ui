"use client";

import type { TextareaHTMLAttributes } from "react";
import { useEffect, useId, useRef } from "react";
import { cn } from "../lib/cn";

type Size = "sm" | "md" | "lg" | "xl";
type Variant = "outline" | "soft";

export interface TextareaProps
	extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
	size?: Size;
	variant?: Variant;
	autoGrow?: boolean;
	maxRows?: number;
	invalid?: boolean;
	label?: string;
	description?: string;
	showCount?: boolean;
}

const SIZE: Record<Size, string> = {
	sm: "px-2.5 py-1.5 text-xs",
	md: "px-3 py-2 text-sm",
	lg: "px-3.5 py-2.5 text-sm",
	xl: "px-4 py-3 text-base",
};

const VARIANT: Record<Variant, string> = {
	outline: "border-input bg-background",
	soft: "border-transparent bg-card",
};

export function Textarea({
	className,
	rows = 3,
	size = "md",
	variant = "outline",
	autoGrow = false,
	maxRows = 10,
	invalid = false,
	label,
	description,
	showCount = false,
	maxLength,
	value,
	id: idProp,
	...rest
}: TextareaProps) {
	const autoId = useId();
	const id = idProp ?? autoId;
	const ref = useRef<HTMLTextAreaElement>(null);

	// Height follows content, never eases: easing lags behind the character just typed.
	useEffect(() => {
		const el = ref.current;
		if (!autoGrow || !el) return;
		const line = Number.parseFloat(getComputedStyle(el).lineHeight) || 20;
		el.style.height = "auto";
		el.style.height = `${Math.min(el.scrollHeight, line * maxRows)}px`;
	}, [autoGrow, maxRows, value]);

	const field = (
		<textarea
			{...rest}
			id={id}
			ref={ref}
			rows={rows}
			value={value}
			maxLength={maxLength}
			aria-invalid={invalid || undefined}
			aria-describedby={description ? `${id}-description` : undefined}
			className={cn(
				"min-h-16 w-full rounded-lg border text-foreground leading-relaxed",
				"placeholder:text-muted-foreground",
				"transition-[box-shadow,border-color] duration-[var(--duration-press)] ease-[var(--ease-out)]",
				"outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring",
				"disabled:cursor-not-allowed disabled:opacity-50",
				"aria-[invalid=true]:border-[var(--destructive)] aria-[invalid=true]:focus-visible:ring-[color-mix(in_oklch,var(--destructive)_40%,transparent)]",
				autoGrow ? "resize-none overflow-y-hidden" : "resize-y",
				VARIANT[variant],
				SIZE[size],
				className,
			)}
		/>
	);

	// Bare, so this can replace a shadcn textarea; the wrapper only appears with a label.
	if (!label && !description && !showCount) return field;

	return (
		<div className="flex w-full flex-col gap-1.5">
			{label ? (
				<label htmlFor={id} className="font-medium text-foreground text-sm">
					{label}
				</label>
			) : null}

			{field}

			{description || showCount ? (
				<div className="flex items-start justify-between gap-3">
					{description ? (
						<p
							id={`${id}-description`}
							className="text-muted-foreground text-xs leading-relaxed"
						>
							{description}
						</p>
					) : null}
					{showCount ? (
						<p className="ml-auto shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
							{String(value ?? "").length}
							{maxLength ? `/${maxLength}` : ""}
						</p>
					) : null}
				</div>
			) : null}
		</div>
	);
}
