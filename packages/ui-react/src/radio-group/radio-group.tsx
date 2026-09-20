"use client";

import type { ComponentProps, KeyboardEvent, ReactNode } from "react";
import { createContext, useCallback, useContext, useId, useMemo, useRef } from "react";
import { cn } from "../lib/cn";

export type RadioSize = "sm" | "md" | "lg" | "xl";
export type RadioVariant = "default" | "card";

const RING: Record<RadioSize, string> = {
	sm: "size-3.5",
	md: "size-4",
	lg: "size-5",
	xl: "size-6",
};

const DOT: Record<RadioSize, string> = {
	sm: "size-1.5",
	md: "size-2",
	lg: "size-2.5",
	xl: "size-3",
};

const TEXT: Record<RadioSize, string> = {
	sm: "text-xs",
	md: "text-sm",
	lg: "text-sm",
	xl: "text-base",
};

type Ctx = {
	value: string;
	name?: string;
	size: RadioSize;
	variant: RadioVariant;
	disabled: boolean;
	setValue: (value: string) => void;
	step: (from: string, delta: -1 | 1) => void;
};

const RadioCtx = createContext<Ctx | null>(null);

function useRadioGroup() {
	const ctx = useContext(RadioCtx);
	if (!ctx) throw new Error("RadioGroupItem must be used inside <RadioGroup>");
	return ctx;
}

export function RadioGroup({
	className,
	value = "",
	orientation = "vertical",
	variant = "default",
	size = "md",
	disabled = false,
	name,
	onValueChange,
	children,
	...props
}: Omit<ComponentProps<"div">, "onChange"> & {
	value?: string;
	orientation?: "vertical" | "horizontal";
	variant?: RadioVariant;
	size?: RadioSize;
	disabled?: boolean;
	name?: string;
	onValueChange?: (value: string) => void;
}) {
	const root = useRef<HTMLDivElement>(null);

	const setValue = useCallback((next: string) => onValueChange?.(next), [onValueChange]);

	const step = useCallback(
		(from: string, delta: -1 | 1) => {
			const items = [
				...(root.current?.querySelectorAll<HTMLElement>("[data-value]") ?? []),
			];
			const i = items.findIndex((el) => el.dataset.value === from);
			const next = items[(i + delta + items.length) % items.length];
			if (!next?.dataset.value) return;
			onValueChange?.(next.dataset.value);
			next.focus();
		},
		[onValueChange],
	);

	const ctx = useMemo(
		() => ({ value, name, size, variant, disabled, setValue, step }),
		[value, name, size, variant, disabled, setValue, step],
	);

	return (
		<RadioCtx.Provider value={ctx}>
			<div
				ref={root}
				role="radiogroup"
				data-slot="radio-group"
				aria-orientation={orientation}
				className={cn(
					"flex gap-2",
					orientation === "vertical" ? "flex-col" : "flex-row flex-wrap items-start",
					disabled && "opacity-50",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</RadioCtx.Provider>
	);
}

export function RadioGroupItem({
	className,
	value,
	label,
	description,
	disabled = false,
	children,
}: {
	className?: string;
	value: string;
	label?: string;
	description?: string;
	disabled?: boolean;
	children?: ReactNode;
}) {
	const group = useRadioGroup();
	const id = useId();
	const checked = group.value === value;
	const off = disabled || group.disabled;

	function onKeyDown(event: KeyboardEvent) {
		const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
		const back = event.key === "ArrowUp" || event.key === "ArrowLeft";
		if (!forward && !back) return;
		event.preventDefault();
		group.step(value, forward ? 1 : -1);
	}

	return (
		<label
			htmlFor={id}
			data-slot="radio-group-item"
			className={cn(
				"inline-flex cursor-pointer items-start gap-2.5 text-foreground",
				group.variant === "card" &&
					"rounded-xl border border-border bg-card px-3.5 py-3 transition-colors hover:border-border-strong has-checked:border-primary",
				TEXT[group.size],
				className,
			)}
		>
			<input
				id={id}
				value={value}
				type="radio"
				name={group.name}
				disabled={off}
				checked={checked}
				data-value={value}
				onChange={() => group.setValue(value)}
				onKeyDown={onKeyDown}
				className="peer sr-only"
			/>
			<span
				aria-hidden
				className={cn(
					"mt-0.5 grid shrink-0 place-items-center rounded-full border-2 border-muted-foreground/50 bg-background transition-colors peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
					RING[group.size],
				)}
			>
				<span
					data-on={checked}
					className={cn("radio-dot rounded-full bg-primary", DOT[group.size])}
				/>
			</span>
			<span className="min-w-0">
				{children ?? (label ? <span className="block">{label}</span> : null)}
				{description ? (
					<span className="block text-muted-foreground text-xs leading-relaxed">
						{description}
					</span>
				) : null}
			</span>
		</label>
	);
}
