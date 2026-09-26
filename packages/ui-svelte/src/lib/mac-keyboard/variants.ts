import { tv, type VariantProps } from "tailwind-variants";

export const macKeyboard = tv({
	slots: {
		root: "flex w-full shrink-0 select-none flex-col border",
		row: "flex w-full",
		slot: "flex-(--w) aspect-(--w) min-w-0",
		arrows: "grid flex-(--w) grid-cols-3 grid-rows-2",
		key: "group relative flex size-full min-w-0 touch-none flex-col items-center justify-center overflow-hidden border transition-[translate,scale,box-shadow] duration-(--duration-press) ease-(--ease-out) data-pressed:translate-y-px data-pressed:scale-[0.98] data-pressed:shadow-none motion-reduce:transition-none",
		legend: "truncate font-medium leading-none",
		sub: "leading-none opacity-60",
		icon: "size-4 shrink-0",
		led: "absolute top-2 left-2 size-1.5 rounded-full bg-current opacity-20 group-data-pressed:bg-(--success) group-data-pressed:opacity-100",
	},
	variants: {
		variant: {
			default: {
				root: "border-border bg-muted shadow-xl",
				key: "border-border bg-background text-foreground shadow-[inset_0_-2px_0_color-mix(in_oklab,var(--foreground)_8%,transparent),0_1px_1px_color-mix(in_oklab,var(--foreground)_10%,transparent)]",
			},
			inverted: {
				root: "border-transparent bg-foreground shadow-xl",
				key: "border-transparent bg-[color-mix(in_oklab,var(--foreground)_86%,var(--background))] text-background shadow-[inset_0_-2px_0_color-mix(in_oklab,var(--background)_10%,transparent),0_1px_1px_color-mix(in_oklab,var(--foreground)_60%,transparent)]",
			},
		},
		size: {
			sm: {
				root: "min-w-160 gap-1 rounded-2xl p-2",
				row: "gap-1",
				arrows: "gap-0.5",
				key: "rounded-md",
				legend: "text-[9px]",
				sub: "text-[8px]",
				icon: "size-3",
			},
			md: {
				root: "min-w-200 gap-1.5 rounded-3xl p-3",
				row: "gap-1.5",
				arrows: "gap-1",
				key: "rounded-lg",
				legend: "text-xs",
				sub: "text-xs",
				icon: "size-4",
			},
		},
		kind: {
			fn: { key: "justify-between py-2", sub: "text-[7px]" },
			icon: {},
			dual: { key: "justify-between py-2" },
			letter: {},
			text: { key: "px-2.5" },
			caps: { key: "px-2.5" },
			modifier: { key: "justify-between px-2 py-1.5", legend: "font-normal" },
		},
		end: {
			true: {},
			false: {},
		},
	},
	compoundVariants: [
		{ kind: ["text", "caps", "modifier"], end: false, class: { key: "items-start" } },
		{ kind: ["text", "caps", "modifier"], end: true, class: { key: "items-end" } },
		{ kind: "letter", size: "sm", class: { legend: "text-sm" } },
		{ kind: "letter", size: "md", class: { legend: "text-lg" } },
		{ kind: "dual", size: "sm", class: { legend: "text-[11px]" } },
		{ kind: "dual", size: "md", class: { legend: "text-sm" } },
	],
	defaultVariants: { variant: "default", size: "md", kind: "letter", end: false },
});

export type MacKeyboardVariant = NonNullable<VariantProps<typeof macKeyboard>["variant"]>;
export type MacKeyboardSize = NonNullable<VariantProps<typeof macKeyboard>["size"]>;
export type MacKeyKind = NonNullable<VariantProps<typeof macKeyboard>["kind"]>;
