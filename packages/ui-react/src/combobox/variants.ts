import { tv, type VariantProps } from "tailwind-variants";

export const combobox = tv({
	slots: {
		trigger:
			"items-center justify-between gap-2 rounded-lg border border-input bg-background font-normal text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring",
		content: "overflow-hidden p-0",
		list: "rounded-none border-none bg-transparent shadow-none",
	},
	variants: {
		size: {
			sm: {
				trigger: "h-8 w-56 px-2.5 text-xs",
				content: "w-56",
				list: "max-h-64 text-xs [&_[data-slot=command-input]]:h-9 [&_[data-slot=command-item]]:px-2 [&_[data-slot=command-item]]:py-1.5",
			},
			md: {
				trigger: "h-9 w-64 px-3 text-sm",
				content: "w-64",
				list: "max-h-72 text-sm [&_[data-slot=command-input]]:h-10 [&_[data-slot=command-item]]:px-2.5 [&_[data-slot=command-item]]:py-2",
			},
			lg: {
				trigger: "h-10 w-72 px-3.5 text-sm",
				content: "w-72",
				list: "max-h-80 text-sm [&_[data-slot=command-input]]:h-11 [&_[data-slot=command-item]]:px-3 [&_[data-slot=command-item]]:py-2",
			},
			xl: {
				trigger: "h-12 w-80 px-4 text-base",
				content: "w-80",
				list: "max-h-96 text-base [&_[data-slot=command-input]]:h-12 [&_[data-slot=command-item]]:px-3.5 [&_[data-slot=command-item]]:py-2.5",
			},
		},
	},
	defaultVariants: { size: "md" },
});

export type ComboboxSize = NonNullable<VariantProps<typeof combobox>["size"]>;
