"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export interface SliderProps
	extends Omit<
		ComponentProps<typeof SliderPrimitive.Root>,
		"value" | "defaultValue" | "onValueChange" | "orientation"
	> {
	value?: number | number[];
	label?: string;
	orientation?: "horizontal" | "vertical";
	onValueChange?: (value: number | number[]) => void;
}

export function Slider({
	className,
	value,
	min = 0,
	max = 100,
	orientation = "horizontal",
	label,
	onValueChange,
	...props
}: SliderProps) {
	const isRange = Array.isArray(value);
	const arrayValue = value === undefined ? undefined : isRange ? value : [value];
	const thumbCount = arrayValue?.length ?? 1;

	return (
		<SliderPrimitive.Root
			data-slot="slider"
			value={arrayValue}
			min={min}
			max={max}
			orientation={orientation}
			thumbAlignment="edge"
			onValueChange={(next) => onValueChange?.(isRange ? next : (next[0] ?? min))}
			className={cn(
				"relative flex items-center data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
				className,
			)}
			{...props}
		>
			<SliderPrimitive.Control
				className={cn(
					"relative flex touch-none select-none items-center data-disabled:opacity-50",
					"data-[orientation=horizontal]:h-5 data-[orientation=horizontal]:w-full",
					"data-[orientation=vertical]:h-full data-[orientation=vertical]:w-5 data-[orientation=vertical]:flex-col",
				)}
			>
				<SliderPrimitive.Track
					data-slot="slider-track"
					className={cn(
						"relative overflow-hidden rounded-full bg-input",
						"data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full",
						"data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1",
					)}
				>
					<SliderPrimitive.Indicator
						data-slot="slider-range"
						className="rounded-full bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
					/>
				</SliderPrimitive.Track>
				{Array.from({ length: thumbCount }, (_, index) => (
					<SliderPrimitive.Thumb
						key={index}
						index={index}
						getAriaLabel={label ? () => label : undefined}
						data-slot="slider-thumb"
						className="block size-4 shrink-0 rounded-full border-2 border-primary bg-background shadow-sm outline-none transition-[scale,box-shadow] duration-[var(--duration-press)] ease-[var(--ease-out)] hover:scale-110 active:scale-125 focus-visible:shadow-[0_0_0_4px_var(--ring)] motion-reduce:transition-none"
					/>
				))}
			</SliderPrimitive.Control>
		</SliderPrimitive.Root>
	);
}
