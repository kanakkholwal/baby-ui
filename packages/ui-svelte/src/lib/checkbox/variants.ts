import { tv, type VariantProps } from "tailwind-variants";

export const checkbox = tv({
	slots: {
		wrapper: "relative inline-grid shrink-0 place-items-center",
		box: [
			"pointer-events-none grid size-full place-items-center border-2 border-muted-foreground/50 bg-background transition-[background-color,border-color,transform,scale,translate] duration-150 ease-[var(--ease-out)]",
			"peer-hover:border-muted-foreground peer-active:scale-[0.92]",
			"peer-checked:border-primary peer-checked:bg-primary peer-indeterminate:border-primary peer-indeterminate:bg-primary",
			"peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
			"motion-reduce:transition-none",
		],
		mark: "",
		text: "block text-foreground",
	},
	variants: {
		size: {
			sm: {
				wrapper: "size-3.5 rounded-[4px]",
				box: "size-3.5 rounded-[4px]",
				mark: "size-2.5",
				text: "text-xs",
			},
			md: {
				wrapper: "size-4 rounded-[5px]",
				box: "size-4 rounded-[5px]",
				mark: "size-3",
				text: "text-sm",
			},
			lg: {
				wrapper: "size-5 rounded-md",
				box: "size-5 rounded-md",
				mark: "size-3.5",
				text: "text-sm",
			},
			xl: {
				wrapper: "size-6 rounded-lg",
				box: "size-6 rounded-lg",
				mark: "size-4",
				text: "text-base",
			},
		},
	},
	defaultVariants: { size: "md" },
});

export type CheckboxSize = NonNullable<VariantProps<typeof checkbox>["size"]>;
