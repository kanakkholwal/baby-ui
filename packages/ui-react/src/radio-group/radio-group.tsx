"use client";

import type { KeyboardEvent } from "react";
import { useId, useRef } from "react";
import { cn } from "../lib/cn";

export type RadioOption = { value: string; label: string };

export interface RadioGroupProps {
	options: RadioOption[];
	value?: string;
	orientation?: "vertical" | "horizontal";
	disabled?: boolean;
	name?: string;
	className?: string;
	onValueChange?: (value: string) => void;
}

export function RadioGroup({
	options,
	value = "",
	orientation = "vertical",
	disabled = false,
	name,
	className,
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
				orientation === "vertical" ? "flex-col" : "flex-row flex-wrap items-center",
				disabled && "opacity-50",
				className,
			)}
		>
			{options.map((option, i) => (
				<label
					key={option.value}
					htmlFor={`${group}-${option.value}`}
					className="inline-flex cursor-pointer items-center gap-2 text-foreground text-sm"
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
						className="grid size-4 shrink-0 place-items-center rounded-full border border-input bg-background transition-colors peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring"
					>
						<span
							className="radio-dot size-2 rounded-full bg-primary"
							data-on={value === option.value}
						/>
					</span>
					{option.label}
				</label>
			))}
		</div>
	);
}
