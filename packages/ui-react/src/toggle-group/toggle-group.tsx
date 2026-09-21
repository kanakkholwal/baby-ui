"use client";

import type { ComponentProps } from "react";
import { createContext, useContext, useMemo } from "react";
import { cn } from "../lib/cn";
import { type ToggleGroupSize, toggleGroupItem } from "./variants";

export type { ToggleGroupSize };

type Ctx = {
	size: ToggleGroupSize;
	disabled: boolean;
	isOn: (value: string) => boolean;
	toggle: (value: string) => void;
};

const ToggleGroupCtx = createContext<Ctx | null>(null);

function useToggleGroup() {
	const ctx = useContext(ToggleGroupCtx);
	if (!ctx) throw new Error("ToggleGroupItem must be used inside <ToggleGroup>");
	return ctx;
}

export function ToggleGroup({
	className,
	value = "",
	type = "single",
	size = "md",
	disabled = false,
	label = "Options",
	onValueChange,
	children,
	...props
}: Omit<ComponentProps<"div">, "onChange"> & {
	value?: string | string[];
	type?: "single" | "multiple";
	size?: ToggleGroupSize;
	disabled?: boolean;
	label?: string;
	onValueChange?: (value: string | string[]) => void;
}) {
	const ctx = useMemo<Ctx>(
		() => ({
			size,
			disabled,
			isOn: (item) =>
				type === "multiple" ? (value as string[]).includes(item) : value === item,
			toggle: (item) => {
				if (type === "single") {
					onValueChange?.(value === item ? "" : item);
					return;
				}
				const list = value as string[];
				onValueChange?.(
					list.includes(item) ? list.filter((v) => v !== item) : [...list, item],
				);
			},
		}),
		[size, disabled, type, value, onValueChange],
	);

	return (
		<ToggleGroupCtx.Provider value={ctx}>
			{/* biome-ignore lint/a11y/useSemanticElements: a toggle bar is not a form fieldset */}
			<div
				role="group"
				data-slot="toggle-group"
				aria-label={label}
				className={cn(
					"inline-flex items-center gap-0.5 rounded-xl border border-border bg-card p-1",
					disabled && "opacity-50",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</ToggleGroupCtx.Provider>
	);
}

export function ToggleGroupItem({
	className,
	value,
	disabled = false,
	...props
}: ComponentProps<"button"> & { value: string }) {
	const group = useToggleGroup();

	return (
		<button
			type="button"
			data-slot="toggle-group-item"
			aria-pressed={group.isOn(value)}
			disabled={disabled || group.disabled}
			onClick={() => group.toggle(value)}
			className={cn(toggleGroupItem({ size: group.size }), className)}
			{...props}
		/>
	);
}
