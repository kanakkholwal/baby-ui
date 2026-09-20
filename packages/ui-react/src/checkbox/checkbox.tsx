"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "../lib/cn";

type Size = "sm" | "md" | "lg" | "xl";

const BOX: Record<Size, string> = {
	sm: "size-3.5 rounded-[4px]",
	md: "size-4 rounded-[5px]",
	lg: "size-5 rounded-md",
	xl: "size-6 rounded-lg",
};
const MARK: Record<Size, string> = {
	sm: "size-2.5",
	md: "size-3",
	lg: "size-3.5",
	xl: "size-4",
};
const TEXT: Record<Size, string> = {
	sm: "text-xs",
	md: "text-sm",
	lg: "text-sm",
	xl: "text-base",
};

export interface CheckboxProps {
	checked?: boolean;
	indeterminate?: boolean;
	disabled?: boolean;
	size?: Size;
	label?: string;
	description?: string;
	className?: string;
	name?: string;
	onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({
	checked = false,
	indeterminate = false,
	disabled = false,
	size = "md",
	label,
	description,
	className,
	name,
	onCheckedChange,
}: CheckboxProps) {
	const id = useId();
	const el = useRef<HTMLInputElement>(null);

	// indeterminate is a DOM property, not an attribute, so it has to be set here.
	useEffect(() => {
		if (el.current) el.current.indeterminate = indeterminate;
	}, [indeterminate]);

	const control = (
		<span
			className={cn(
				"relative inline-grid shrink-0 place-items-center",
				BOX[size],
				!label && !description && className,
			)}
		>
			<input
				ref={el}
				id={id}
				name={name}
				disabled={disabled}
				type="checkbox"
				checked={checked}
				onChange={(e) => onCheckedChange?.(e.currentTarget.checked)}
				className="peer absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
			/>
			<span
				aria-hidden
				className={cn(
					"pointer-events-none grid size-full place-items-center border-2 border-muted-foreground/50 bg-background transition-[background-color,border-color,transform] duration-150 ease-[var(--ease-out)]",
					"peer-hover:border-muted-foreground peer-active:scale-[0.92]",
					"peer-checked:border-primary peer-checked:bg-primary peer-indeterminate:border-primary peer-indeterminate:bg-primary",
					"peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
					"motion-reduce:transition-none",
					BOX[size],
				)}
			>
				{indeterminate ? (
					<svg
						viewBox="0 0 12 12"
						fill="none"
						aria-hidden
						className={cn("text-primary-foreground", MARK[size])}
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
						className={cn("checkbox-check text-primary-foreground", MARK[size])}
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
	);

	// Bare, so this can replace a shadcn checkbox; the wrapper only appears with a label.
	if (!label && !description) return control;

	return (
		<div
			className={cn(
				"inline-flex items-start gap-2.5",
				disabled && "opacity-50",
				className,
			)}
		>
			{control}
			<label htmlFor={id} className="cursor-pointer select-none">
				{label ? (
					<span className={cn("block text-foreground", TEXT[size])}>{label}</span>
				) : null}
				{description ? (
					<span className="block text-muted-foreground text-xs leading-relaxed">
						{description}
					</span>
				) : null}
			</label>
		</div>
	);
}
