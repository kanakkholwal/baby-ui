import { tv, type VariantProps } from "tailwind-variants";

/** Slots joined into one bordered strip; the active slot lifts above its neighbours' borders. */
export const inputOtp = tv({
	slots: {
		root: "flex items-center gap-2 has-disabled:opacity-50",
		input: "disabled:cursor-not-allowed",
		group: [
			"flex items-center rounded-md",
			"has-aria-invalid:ring-2 has-aria-invalid:ring-destructive/25",
		],
		slot: [
			"relative flex items-center justify-center border-input border-y border-r bg-background font-medium tabular-nums",
			"outline-none transition-[box-shadow,border-color] duration-100 first:rounded-l-md first:border-l last:rounded-r-md",
			"data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-2 data-[active=true]:ring-ring/30",
			"aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/25",
			"motion-reduce:transition-none",
		],
		caret: "pointer-events-none absolute inset-0 flex items-center justify-center",
		caretLine: "otp-caret h-4 w-px bg-foreground",
		separator: "flex items-center text-muted-foreground [&_svg]:size-4",
	},
	variants: {
		size: {
			sm: { slot: "size-8 text-sm" },
			md: { slot: "size-10 text-base" },
			lg: { slot: "size-12 text-lg" },
		},
	},
	defaultVariants: { size: "md" },
});

export type InputOtpSize = NonNullable<VariantProps<typeof inputOtp>["size"]>;
