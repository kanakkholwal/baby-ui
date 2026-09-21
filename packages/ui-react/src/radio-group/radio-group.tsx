"use client";

import type { ComponentProps, KeyboardEvent, ReactNode } from "react";
import { createContext, useCallback, useContext, useId, useMemo, useRef } from "react";
import { cn } from "../lib/cn";
import { type RadioSize, type RadioVariant, radioGroup } from "./variants";

export type { RadioSize, RadioVariant };

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
	const frame = radioGroup({ variant: group.variant, size: group.size });

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
			className={cn(frame.label(), className)}
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
			<span aria-hidden className={frame.ring()}>
				<span data-on={checked} className={frame.dot()} />
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
