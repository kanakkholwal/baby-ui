"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { type ComponentProps, useState } from "react";
import { cn } from "../lib/cn";
import { type SliderMark, type SliderSize, slider, sliderPercent } from "./variants";

export type { SliderMark, SliderSize };

export interface SliderProps
	extends Omit<
		ComponentProps<typeof SliderPrimitive.Root>,
		"value" | "defaultValue" | "onValueChange" | "onValueCommitted" | "orientation"
	> {
	/** Controlled value; an array renders one thumb per entry. */
	value?: number | number[];
	defaultValue?: number | number[];
	onValueChange?: (value: number | number[]) => void;
	/** Fires once a drag or key press settles. */
	onValueCommit?: (value: number | number[]) => void;
	/** Accessible name; also the header title when `showValue` is on. */
	label?: string;
	orientation?: "horizontal" | "vertical";
	size?: SliderSize;
	/** Header with the label and the live value. */
	showValue?: boolean;
	formatValue?: (value: number) => string;
	/** Ticks under the track; clicking one jumps there. */
	marks?: SliderMark[];
}

export function Slider({
	className,
	value: valueProp,
	defaultValue,
	min = 0,
	max = 100,
	orientation = "horizontal",
	label,
	size = "md",
	showValue = false,
	formatValue = (v) => String(v),
	marks = [],
	onValueChange,
	onValueCommit,
	disabled,
	...props
}: SliderProps) {
	const [internal, setInternal] = useState<number | number[]>(defaultValue ?? min);
	const value = valueProp ?? internal;
	const isRange = Array.isArray(value);
	const values = isRange ? value : [value];
	const styles = slider({ size });

	const emit = (next: number[]) => {
		const out = isRange ? next : (next[0] ?? min);
		if (valueProp === undefined) setInternal(out);
		onValueChange?.(out);
	};
	const jumpTo = (target: number) => {
		if (!isRange) return emit([target]);
		const nearest = values.reduce(
			(best, v, i) =>
				Math.abs(v - target) < Math.abs((values[best] ?? 0) - target) ? i : best,
			0,
		);
		emit(values.map((v, i) => (i === nearest ? target : v)));
	};

	return (
		<SliderPrimitive.Root
			data-slot="slider"
			value={values}
			min={min}
			max={max}
			orientation={orientation}
			disabled={disabled}
			thumbAlignment="edge"
			onValueChange={(next) => emit(next as number[])}
			onValueCommitted={(next) => {
				const list = next as number[];
				onValueCommit?.(isRange ? list : (list[0] ?? min));
			}}
			className={cn(styles.root(), className)}
			{...props}
		>
			{showValue ? (
				<div className={styles.header()}>
					<span className={styles.title()}>{label}</span>
					<span className={styles.value()}>{values.map(formatValue).join(" - ")}</span>
				</div>
			) : null}
			<SliderPrimitive.Control className={styles.control()}>
				<SliderPrimitive.Track data-slot="slider-track" className={styles.track()}>
					<SliderPrimitive.Indicator
						data-slot="slider-range"
						className={styles.range()}
					/>
				</SliderPrimitive.Track>
				{values.map((_, index) => (
					<SliderPrimitive.Thumb
						key={index}
						index={index}
						getAriaLabel={label ? () => label : undefined}
						data-slot="slider-thumb"
						className={styles.thumb()}
					/>
				))}
			</SliderPrimitive.Control>
			{marks.length > 0 && orientation === "horizontal" ? (
				<div className={styles.marks()}>
					{marks.map((mark) => (
						<span
							key={mark.value}
							className={styles.mark()}
							style={{ left: `${sliderPercent(mark.value, min, max)}%` }}
						>
							<span aria-hidden="true" className={styles.markDot()} />
							{mark.label ? (
								<button
									type="button"
									disabled={disabled}
									className={styles.markButton()}
									onClick={() => jumpTo(mark.value)}
								>
									{mark.label}
								</button>
							) : null}
						</span>
					))}
				</div>
			) : null}
		</SliderPrimitive.Root>
	);
}
