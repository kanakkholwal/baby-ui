import { tv, type VariantProps } from "tailwind-variants";

export const combobox = tv({
	slots: {
		trigger: [
			"items-center justify-between gap-2 rounded-lg border border-input bg-background font-normal text-foreground outline-none transition-colors",
			"hover:border-border-strong focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring",
			// Base UI marks the open trigger data-popup-open, bits-ui data-state=open.
			"data-[popup-open]:border-ring data-[state=open]:border-ring",
		],
		// As wide as its trigger: Base UI sets --anchor-width, bits-ui --bits-popover-anchor-width.
		content:
			"w-[var(--anchor-width,var(--bits-popover-anchor-width))] overflow-hidden p-0",
		list: "rounded-none border-none bg-transparent shadow-none",
	},
	variants: {
		// Rows keep one inline padding at every size, so group headings stay aligned with them.
		size: {
			sm: {
				trigger: "h-8 w-56 px-2.5 text-xs",
				list: [
					"max-h-64 [&_[data-slot=command-empty]]:text-xs",
					"[&_[data-slot=command-input]]:h-9 [&_[data-slot=command-input]]:text-xs",
					"[&_[data-slot=command-item]]:py-1.5 [&_[data-slot=command-item]]:text-xs",
				],
			},
			md: {
				trigger: "h-9 w-64 px-3 text-sm",
				list: [
					"max-h-72 [&_[data-slot=command-empty]]:text-sm",
					"[&_[data-slot=command-input]]:h-10 [&_[data-slot=command-input]]:text-sm",
					"[&_[data-slot=command-item]]:py-2 [&_[data-slot=command-item]]:text-sm",
				],
			},
			lg: {
				trigger: "h-10 w-72 px-3.5 text-sm",
				list: [
					"max-h-80 [&_[data-slot=command-empty]]:text-sm",
					"[&_[data-slot=command-input]]:h-11 [&_[data-slot=command-input]]:text-sm",
					"[&_[data-slot=command-item]]:py-2.5 [&_[data-slot=command-item]]:text-sm",
				],
			},
			xl: {
				trigger: "h-12 w-80 px-4 text-base",
				list: [
					"max-h-96 [&_[data-slot=command-empty]]:text-base",
					"[&_[data-slot=command-input]]:h-12 [&_[data-slot=command-input]]:text-base",
					"[&_[data-slot=command-item]]:py-3 [&_[data-slot=command-item]]:text-base",
				],
			},
		},
	},
	defaultVariants: { size: "md" },
});

export type ComboboxSize = NonNullable<VariantProps<typeof combobox>["size"]>;
