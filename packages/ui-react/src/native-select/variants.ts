import { tv, type VariantProps } from "tailwind-variants";

export const nativeSelect = tv({
	slots: {
		wrapper: "group/native-select relative w-fit has-[select:disabled]:opacity-50",
		select: [
			"w-full min-w-0 appearance-none rounded-lg border border-input bg-background pr-8 text-foreground outline-none",
			"transition-[box-shadow,border-color] duration-[var(--duration-press)] ease-[var(--ease-out)] motion-reduce:transition-none",
			"focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring",
			"disabled:pointer-events-none disabled:cursor-not-allowed",
			"aria-[invalid=true]:border-[var(--destructive)]",
		],
		icon: "pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 select-none text-muted-foreground",
		option: "bg-[Canvas] text-[CanvasText]",
	},
	variants: {
		size: {
			sm: { select: "h-8 pl-2.5 text-xs" },
			md: { select: "h-9 pl-3 text-sm" },
			lg: { select: "h-10 pl-3.5 text-sm" },
		},
	},
	defaultVariants: { size: "md" },
});

export type NativeSelectSize = NonNullable<VariantProps<typeof nativeSelect>["size"]>;
