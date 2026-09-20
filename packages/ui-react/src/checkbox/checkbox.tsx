"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "../lib/cn";

export interface CheckboxProps {
	checked?: boolean;
	indeterminate?: boolean;
	disabled?: boolean;
	label?: string;
	name?: string;
	className?: string;
	onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({
	checked = false,
	indeterminate = false,
	disabled = false,
	label,
	name,
	className,
	onCheckedChange,
}: CheckboxProps) {
	const id = useId();
	const ref = useRef<HTMLInputElement>(null);

	// indeterminate is a DOM property, not an attribute, so it has to be set here.
	useEffect(() => {
		if (ref.current) ref.current.indeterminate = indeterminate;
	}, [indeterminate]);

	return (
		<div
			className={cn(
				"inline-flex items-center gap-2",
				disabled && "opacity-50",
				className,
			)}
		>
			<span className="relative inline-grid size-4 shrink-0 place-items-center">
				<input
					ref={ref}
					id={id}
					name={name}
					type="checkbox"
					checked={checked}
					disabled={disabled}
					onChange={(e) => onCheckedChange?.(e.currentTarget.checked)}
					className="peer absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
				/>
				<span
					aria-hidden
					className="pointer-events-none grid size-4 place-items-center rounded-[5px] border border-input bg-background transition-colors duration-150 peer-checked:border-primary peer-checked:bg-primary peer-indeterminate:border-primary peer-indeterminate:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring"
				>
					{indeterminate ? (
						<svg
							viewBox="0 0 12 12"
							fill="none"
							aria-hidden
							className="size-3 text-primary-foreground"
						>
							<path
								d="M3 6h6"
								stroke="currentColor"
								strokeWidth="1.8"
								strokeLinecap="round"
							/>
						</svg>
					) : (
						<svg
							viewBox="0 0 12 12"
							fill="none"
							aria-hidden
							data-on={checked}
							className="checkbox-check size-3 text-primary-foreground"
						>
							<path
								d="M2.5 6.2 4.8 8.5 9.5 3.6"
								stroke="currentColor"
								strokeWidth="1.8"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					)}
				</span>
			</span>
			{label ? (
				<label
					htmlFor={id}
					className="cursor-pointer select-none text-foreground text-sm"
				>
					{label}
				</label>
			) : null}
		</div>
	);
}
