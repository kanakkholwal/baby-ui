import { tv, type VariantProps } from "tailwind-variants";

export const slider = tv({
	slots: {
		root: "group/slider relative flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-col data-[orientation=vertical]:h-full",
		header: "mb-1 flex items-baseline justify-between gap-3 text-sm",
		title: "text-muted-foreground",
		value: "font-mono text-foreground text-xs tabular-nums",
		control:
			"relative flex touch-none select-none items-center data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col data-disabled:opacity-50",
		track:
			"relative overflow-hidden rounded-full bg-input transition-[height,width] duration-(--duration-press) ease-(--ease-out) data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full motion-reduce:transition-none",
		range:
			"slider-glide rounded-full bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
		thumb:
			"slider-glide block shrink-0 rounded-full border-primary bg-background shadow-sm outline-none hover:scale-[1.08] focus-visible:shadow-[0_0_0_4px_var(--ring)] active:scale-[1.15] data-[active]:scale-[1.15] data-[dragging]:scale-[1.15]",
		marks: "relative mt-2 h-4 w-full",
		mark: "absolute top-0 flex -translate-x-1/2 flex-col items-center gap-1 text-[11px] text-muted-foreground tabular-nums",
		markDot: "size-1 rounded-full bg-muted-foreground/50",
		markButton:
			"rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
	},
	variants: {
		size: {
			sm: {
				control: "data-[orientation=horizontal]:h-9 data-[orientation=vertical]:w-9",
				track:
					"data-[orientation=horizontal]:h-[3px] data-[orientation=vertical]:w-[3px] group-hover/slider:data-[orientation=horizontal]:h-[5px] group-hover/slider:data-[orientation=vertical]:w-[5px]",
				thumb: "size-3 border",
			},
			md: {
				control: "data-[orientation=horizontal]:h-11 data-[orientation=vertical]:w-11",
				track:
					"data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1 group-hover/slider:data-[orientation=horizontal]:h-1.5 group-hover/slider:data-[orientation=vertical]:w-1.5",
				thumb: "size-4 border-2",
			},
			lg: {
				control: "data-[orientation=horizontal]:h-14 data-[orientation=vertical]:w-14",
				track:
					"data-[orientation=horizontal]:h-[5px] data-[orientation=vertical]:w-[5px] group-hover/slider:data-[orientation=horizontal]:h-[7px] group-hover/slider:data-[orientation=vertical]:w-[7px]",
				thumb: "size-5 border-2",
			},
		},
	},
	defaultVariants: { size: "md" },
});

export type SliderSize = NonNullable<VariantProps<typeof slider>["size"]>;

export type SliderMark = { value: number; label?: string };

/** Share of the track `value` sits at, 0 to 100. */
export function sliderPercent(value: number, min: number, max: number): number {
	return max > min ? Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)) : 0;
}
