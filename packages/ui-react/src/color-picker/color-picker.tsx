"use client";

import { useId } from "react";
import { cn } from "../lib/cn";

const DEFAULT_SWATCHES = [
	"#7dd3fc",
	"#a78bfa",
	"#86efac",
	"#fcd34d",
	"#fda4af",
	"#e5e7eb",
];

export interface ColorPickerProps {
	value: string;
	swatches?: string[];
	label?: string;
	className?: string;
	onValueChange: (value: string) => void;
}

export function ColorPicker({
	value,
	swatches = DEFAULT_SWATCHES,
	label = "Colour",
	className,
	onValueChange,
}: ColorPickerProps) {
	const id = useId();

	return (
		<div className={cn("flex flex-col gap-2", className)}>
			<div className="flex items-center gap-2">
				<label
					htmlFor={id}
					style={{ background: value }}
					className="relative size-9 shrink-0 overflow-hidden rounded-lg border border-border"
				>
					<span className="sr-only">{label}</span>
					{/* A real colour input, so the platform picker and eyedropper come free. */}
					<input
						id={id}
						type="color"
						value={value}
						onChange={(e) => onValueChange(e.currentTarget.value)}
						className="absolute inset-0 size-full cursor-pointer opacity-0"
					/>
				</label>
				<input
					type="text"
					aria-label={`${label} hex value`}
					value={value}
					spellCheck={false}
					onChange={(e) => onValueChange(e.currentTarget.value)}
					className="h-9 w-28 rounded-lg border border-input bg-background px-2.5 font-mono text-foreground text-sm uppercase outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
				/>
			</div>

			<div className="flex flex-wrap items-center gap-1.5">
				{swatches.map((swatch) => (
					<button
						key={swatch}
						type="button"
						aria-label={swatch}
						aria-pressed={value.toLowerCase() === swatch.toLowerCase()}
						onClick={() => onValueChange(swatch)}
						style={{ background: swatch }}
						className="size-6 rounded-full ring-offset-2 ring-offset-background transition-shadow aria-pressed:ring-2 aria-pressed:ring-foreground/40"
					/>
				))}
			</div>
		</div>
	);
}
