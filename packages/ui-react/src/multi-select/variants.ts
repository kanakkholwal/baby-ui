import { tv, type VariantProps } from "tailwind-variants";

export const multiSelect = tv({
	slots: {
		root: [
			"flex w-full min-w-0 flex-wrap items-center gap-1 rounded-lg border border-input bg-background",
			"transition-[box-shadow,border-color] duration-[var(--duration-press)] ease-[var(--ease-out)] motion-reduce:transition-none",
			"has-[[role=combobox]:focus-visible]:border-ring has-[[role=combobox]:focus-visible]:ring-2 has-[[role=combobox]:focus-visible]:ring-ring",
			"has-[[aria-invalid=true]]:border-[var(--destructive)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		],
		chip: "max-w-40 gap-1 pr-0.5",
		chipLabel: "min-w-0 truncate",
		chipRemove:
			"inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm text-muted-foreground outline-none hover:bg-foreground/[0.08] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-3",
		trigger: [
			"flex min-w-16 flex-1 cursor-pointer items-center justify-between gap-2 self-stretch rounded-md text-left text-foreground outline-none",
			"data-[placeholder]:text-muted-foreground",
		],
		chevron: "size-3.5 shrink-0 text-muted-foreground",
		content: "overflow-hidden p-0",
		list: "rounded-none border-none bg-transparent shadow-none",
		check: "size-3.5 shrink-0",
		item: "gap-2",
		box: "flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input data-[checked=true]:border-foreground data-[checked=true]:bg-foreground data-[checked=true]:text-background",
	},
	variants: {
		size: {
			sm: {
				root: "min-h-8 px-1 py-0.5 text-xs",
				trigger: "h-6 px-1.5",
				content: "min-w-56",
				list: "max-h-64 text-xs",
			},
			md: {
				root: "min-h-9 px-1 py-1 text-sm",
				trigger: "h-7 px-2",
				content: "min-w-64",
				list: "max-h-72 text-sm",
			},
			lg: {
				root: "min-h-10 px-1.5 py-1 text-sm",
				trigger: "h-8 px-2",
				content: "min-w-72",
				list: "max-h-80 text-sm",
			},
		},
	},
	defaultVariants: { size: "md" },
});

export type MultiSelectSize = NonNullable<VariantProps<typeof multiSelect>["size"]>;

export interface MultiSelectOption {
	value: string;
	label: string;
	/** Extra words the search matches. */
	keywords?: string;
	disabled?: boolean;
}

export interface MultiSelectLabels {
	placeholder: string;
	search: string;
	empty: string;
	selectAll: string;
	clear: string;
	remove: string;
	/** Read after a chosen option, as the list's own highlight uses aria-selected. */
	selected: string;
	/** `{count}` hidden chips. */
	more: string;
}

export const MULTI_SELECT_LABELS: MultiSelectLabels = {
	placeholder: "Select…",
	search: "Search…",
	empty: "No matches",
	selectAll: "Select all",
	clear: "Clear selection",
	remove: "Remove",
	selected: "selected",
	more: "+{count}",
};

/** Toggles one value, keeping the options' order. */
export function toggleValue(
	options: MultiSelectOption[],
	value: string[],
	item: string,
): string[] {
	const next = new Set(value);
	if (next.has(item)) next.delete(item);
	else next.add(item);
	return options.filter((o) => next.has(o.value)).map((o) => o.value);
}
