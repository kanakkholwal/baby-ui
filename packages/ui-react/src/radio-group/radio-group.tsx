"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { createContext, type ReactNode, useContext, useId, useMemo } from "react";
import { cn } from "../lib/cn";
import {
	type RadioOrientation,
	type RadioSize,
	type RadioVariant,
	radioGroup,
} from "./variants";

export type { RadioOrientation, RadioSize, RadioVariant };

export function RadioGroup({
	className,
	value,
	orientation = "vertical",
	variant = "default",
	size = "md",
	disabled = false,
	name,
	onValueChange,
	children,
	...props
}: {
	className?: string;
	value?: string;
	orientation?: RadioOrientation;
	variant?: RadioVariant;
	size?: RadioSize;
	disabled?: boolean;
	name?: string;
	onValueChange?: (value: string) => void;
	children?: ReactNode;
}) {
	const itemVariant = useMemo(() => ({ variant, size }), [variant, size]);
	return (
		<RadioGroupPrimitive
			value={value}
			disabled={disabled}
			name={name}
			onValueChange={onValueChange}
			data-slot="radio-group"
			aria-orientation={orientation}
			className={cn(
				radioGroup({ orientation }).root(),
				disabled && "opacity-50",
				className,
			)}
			{...props}
		>
			<RadioGroupItemVariantCtx.Provider value={itemVariant}>
				{children}
			</RadioGroupItemVariantCtx.Provider>
		</RadioGroupPrimitive>
	);
}

const RadioGroupItemVariantCtx = createContext<{
	variant: RadioVariant;
	size: RadioSize;
}>({
	variant: "default",
	size: "md",
});

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
	const id = useId();
	const { variant, size } = useContext(RadioGroupItemVariantCtx);
	const frame = radioGroup({ variant, size });

	return (
		<label
			htmlFor={id}
			data-slot="radio-group-item"
			className={cn(frame.label(), className)}
		>
			<Radio.Root id={id} value={value} disabled={disabled} className={frame.ring()}>
				<Radio.Indicator keepMounted className={frame.dot()} />
			</Radio.Root>
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
