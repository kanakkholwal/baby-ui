"use client";

import type { KeyboardEvent } from "react";
import { useId, useRef } from "react";
import { cn } from "../lib/cn";

type Size = "sm" | "md" | "lg" | "xl";
type Variant = "default" | "card";
export type RadioOption = { value: string; label: string; description?: string };

const RING: Record<Size, string> = {
	sm: "size-3.5",
	md: "size-4",
	lg: "size-5",
	xl: "size-6",
};
const DOT: Record<Size, string> = {
	sm: "size-1.5",
	md: "size-2",
	lg: "size-2.5",
	xl: "size-3",
};
const TEXT: Record<Size, string> = {
	sm: "text-xs",
	md: "text-sm",
	lg: "text-sm",
	xl: "text-base",
};

export interface RadioGroupProps {
	options: RadioOption[];
	value?: string;
	orientation?: "vertical" | "horizontal";
	variant?: Variant;
	size?: Size;
	disabled?: boolean;
	className?: string;
	name?: string;
	onValueChange?: (value: string) => void;
}

export function RadioGroup({
	options,
	value = "",
	orientation = "vertical",
	variant = "default",
	size = "md",
	disabled = false,
	className,
	name,
	onValueChange,
}: RadioGroupProps) {
	const group = useId();
	const root = useRef<HTMLDivElement>(null);

	function focusAt(index: number) {
		const next = options[(index + options.length) % options.length];
		if (!next) return;
		onValueChange?.(next.value);
		root.current
			?.querySelector<HTMLElement>(`[data-value="${CSS.escape(next.value)}"]`)
			?.focus();
	}

	function onKeyDown(event: KeyboardEvent, index: number) {
		const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
		const back = event.key === "ArrowUp" || event.key === "ArrowLeft";
		if (!forward && !back) return;
		event.preventDefault();
		focusAt(index + (forward ? 1 : -1));
	}

	return (
		<div
			ref={root}
			role="radiogroup"
			aria-orientation={orientation}
			className={cn(
				"flex gap-2",
				orientation === "vertical" ? "flex-col" : "flex-row flex-wrap items-start",
				disabled && "opacity-50",
				className,
			)}
		>
			{options.map((option, i) => (
				<label
					key={option.value}
					htmlFor={`${group}-${option.value}`}
					className={cn(
						"inline-flex cursor-pointer items-start gap-2.5 text-foreground",
						variant === "card" &&
							"rounded-xl border border-border bg-card px-3.5 py-3 transition-colors hover:border-border-strong has-checked:border-primary",
						TEXT[size],
					)}
				>
					<input
						id={`${group}-${option.value}`}
						type="radio"
						name={name}
						disabled={disabled}
						value={option.value}
						checked={value === option.value}
						data-value={option.value}
						onChange={() => onValueChange?.(option.value)}
						onKeyDown={(e) => onKeyDown(e, i)}
						className="peer sr-only"
					/>
					<span
						aria-hidden
						className={cn(
							"mt-0.5 grid shrink-0 place-items-center rounded-full border-2 border-muted-foreground/50 bg-background transition-colors peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
							RING[size],
						)}
					>
						<span
							data-on={value === option.value}
							className={cn("radio-dot rounded-full bg-primary", DOT[size])}
						/>
					</span>
					<span className="min-w-0">
						<span className="block">{option.label}</span>
						{option.description ? (
							<span className="block text-muted-foreground text-xs leading-relaxed">
								{option.description}
							</span>
						) : null}
					</span>
				</label>
			))}
		</div>
	);
}
