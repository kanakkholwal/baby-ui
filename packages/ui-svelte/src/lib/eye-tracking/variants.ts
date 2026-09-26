import { tv, type VariantProps } from "tailwind-variants";

// --et-light / --et-dark keep the sclera light and the pupil dark in both themes.
export const eyeTracking = tv({
	slots: {
		root: "flex items-center justify-center [--et-dark:var(--foreground)] [--et-light:var(--background)] dark:[--et-dark:var(--background)] dark:[--et-light:var(--foreground)]",
		eye: "relative shrink-0 overflow-hidden rounded-full",
		iris: "absolute top-1/2 left-[27.5%] -mt-[22.5%] aspect-square w-[45%] translate-x-[var(--et-x,0px)] translate-y-[var(--et-y,0px)] rounded-full transition-[translate] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
		detail:
			"absolute inset-0 rotate-[var(--et-r,0deg)] rounded-full transition-[rotate] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
		pupil:
			"absolute inset-1/4 scale-[var(--et-p,1)] rounded-full bg-[var(--et-dark)] transition-[scale] duration-[var(--duration-overlay)] ease-[var(--ease-out)] motion-reduce:transition-none",
		glint:
			"absolute top-[22%] left-[28%] size-[20%] rounded-full bg-[var(--et-light)] blur-[0.5px]",
		glintSmall:
			"absolute top-[60%] left-[60%] size-[9%] rounded-full bg-[var(--et-light)]/70",
		lid: "pointer-events-none absolute inset-0 rounded-full",
		scan: "hidden",
	},
	variants: {
		variant: {
			realistic: {
				eye: "aspect-[1/0.85] bg-[radial-gradient(circle_at_35%_35%,var(--et-light),color-mix(in_oklch,var(--et-light)_84%,var(--et-dark)))] shadow-[inset_0_2px_8px_color-mix(in_oklch,var(--et-dark)_18%,transparent),0_4px_20px_color-mix(in_oklch,var(--et-dark)_12%,transparent)]",
				iris: "bg-[radial-gradient(circle_at_40%_40%,color-mix(in_oklch,var(--chart-3)_65%,var(--et-light)),var(--chart-3)_60%,color-mix(in_oklch,var(--chart-3)_75%,var(--et-dark)))] shadow-[inset_0_2px_6px_color-mix(in_oklch,var(--et-dark)_35%,transparent)]",
				detail:
					"bg-[repeating-conic-gradient(color-mix(in_oklch,var(--et-dark)_30%,transparent)_0deg_2deg,transparent_2deg_15deg)] [mask-image:radial-gradient(circle,transparent_42%,var(--et-dark)_48%,var(--et-dark)_78%,transparent_96%)]",
				lid: "bg-[linear-gradient(to_bottom,color-mix(in_oklch,var(--et-dark)_14%,transparent),transparent_35%,transparent_80%,color-mix(in_oklch,var(--et-dark)_8%,transparent))]",
			},
			cartoon: {
				eye: "aspect-square border-[3px] border-[var(--et-dark)] bg-[var(--et-light)]",
				iris: "bg-[var(--chart-1)]",
				detail: "hidden",
				pupil: "inset-[22%]",
				glint: "top-[16%] left-[22%] size-[30%] blur-none",
				lid: "bg-[linear-gradient(to_bottom,color-mix(in_oklch,var(--et-dark)_10%,transparent),transparent_30%)]",
			},
			minimal: {
				eye: "aspect-[1/0.85] border border-border bg-[var(--et-light)]",
				iris: "bg-transparent",
				detail: "hidden",
				pupil: "inset-[12%]",
				lid: "hidden",
			},
			cyber: {
				eye: "aspect-[1/0.85] border border-[var(--accent)]/30 bg-[radial-gradient(circle,color-mix(in_oklch,var(--accent)_12%,var(--et-dark)),var(--et-dark))] shadow-[inset_0_0_30px_color-mix(in_oklch,var(--accent)_12%,transparent),0_0_20px_color-mix(in_oklch,var(--accent)_18%,transparent)]",
				iris: "bg-[conic-gradient(var(--accent),var(--chart-1),var(--accent))] shadow-[0_0_15px_color-mix(in_oklch,var(--accent)_40%,transparent)]",
				detail:
					"inset-[15%] border border-[var(--et-dark)]/40 border-dashed bg-[repeating-conic-gradient(color-mix(in_oklch,var(--et-dark)_35%,transparent)_0deg_1deg,transparent_1deg_45deg)]",
				pupil:
					"bg-[radial-gradient(circle,var(--et-dark)_45%,transparent)] shadow-[0_0_10px_color-mix(in_oklch,var(--accent)_55%,transparent)]",
				glint: "bg-[var(--accent)]",
				glintSmall: "bg-[var(--accent)]/60",
				lid: "bg-[linear-gradient(to_bottom,color-mix(in_oklch,var(--et-dark)_60%,transparent),transparent_35%,transparent_80%,color-mix(in_oklch,var(--et-dark)_40%,transparent))]",
				scan: "eye-tracking-scan pointer-events-none absolute inset-x-0 block h-0.5 bg-[linear-gradient(to_right,transparent,color-mix(in_oklch,var(--accent)_45%,transparent),transparent)]",
			},
		},
		size: {
			sm: { root: "gap-3", eye: "w-16" },
			md: { root: "gap-6", eye: "w-28" },
			lg: { root: "gap-10", eye: "w-40" },
		},
		blink: {
			true: { eye: "eye-tracking-blink" },
			false: {},
		},
		reflection: {
			true: {},
			false: { glint: "hidden", glintSmall: "hidden" },
		},
	},
	defaultVariants: { variant: "realistic", size: "md", blink: true, reflection: true },
});

export type EyeTrackingVariant = NonNullable<VariantProps<typeof eyeTracking>["variant"]>;
export type EyeTrackingSize = NonNullable<VariantProps<typeof eyeTracking>["size"]>;
