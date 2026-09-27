import { tv, type VariantProps } from "tailwind-variants";

export const numberInput = tv({
	slots: {
		root: "flex w-full min-w-0 flex-col gap-1.5",
		label:
			"w-fit cursor-ew-resize select-none font-medium text-foreground text-sm data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
		group: [
			"flex w-full min-w-0 items-stretch overflow-hidden rounded-lg border border-input bg-background",
			"transition-[box-shadow,border-color] duration-[var(--duration-press)] ease-[var(--ease-out)] motion-reduce:transition-none",
			"has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring",
			"has-[input[aria-invalid=true]]:border-[var(--destructive)] has-[input:disabled]:opacity-50",
		],
		input:
			"min-w-0 flex-1 bg-transparent text-center text-foreground tabular-nums outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
		button: [
			"flex shrink-0 cursor-pointer select-none items-center justify-center text-muted-foreground outline-none",
			"transition-colors duration-[var(--duration-press)] ease-[var(--ease-out)] motion-reduce:transition-none",
			"hover:bg-foreground/[0.05] hover:text-foreground active:bg-foreground/[0.08]",
			"focus-visible:bg-foreground/[0.05] focus-visible:text-foreground",
			"disabled:pointer-events-none disabled:opacity-40 data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
			"[&_svg]:size-3.5",
		],
	},
	variants: {
		size: {
			sm: { group: "h-8 text-xs", button: "w-8" },
			md: { group: "h-9 text-sm", button: "w-9" },
			lg: { group: "h-10 text-sm", button: "w-10" },
		},
	},
	defaultVariants: { size: "md" },
});

export type NumberInputSize = NonNullable<VariantProps<typeof numberInput>["size"]>;
