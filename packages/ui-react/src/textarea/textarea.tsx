"use client";

import type { TextareaHTMLAttributes } from "react";
import { useEffect, useRef } from "react";
import { cn } from "../lib/cn.js";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	autoGrow?: boolean;
	maxRows?: number;
	invalid?: boolean;
}

export function Textarea({
	className,
	rows = 3,
	autoGrow = true,
	maxRows = 10,
	invalid = false,
	value,
	...rest
}: TextareaProps) {
	const ref = useRef<HTMLTextAreaElement>(null);

	// Height follows content, never eases: easing lags behind the character just typed.
	useEffect(() => {
		const el = ref.current;
		if (!autoGrow || !el) return;
		const line = Number.parseFloat(getComputedStyle(el).lineHeight) || 20;
		el.style.height = "auto";
		el.style.height = `${Math.min(el.scrollHeight, line * maxRows)}px`;
	}, [autoGrow, maxRows, value]);

	return (
		<textarea
			{...rest}
			ref={ref}
			rows={rows}
			value={value}
			aria-invalid={invalid || undefined}
			className={cn(
				"w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-foreground text-sm",
				"placeholder:text-muted-foreground",
				"transition-[box-shadow,border-color] duration-[var(--duration-press)] ease-[var(--ease-out)]",
				"outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
				"disabled:cursor-not-allowed disabled:opacity-50",
				"aria-[invalid=true]:border-[var(--destructive)]",
				className,
			)}
		/>
	);
}
