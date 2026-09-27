import { tv, type VariantProps } from "tailwind-variants";

/** Trigger and top-level link look; shadcn's name, so shadcn blocks can import it. */
export const navigationMenuTriggerStyle = tv({
	base: [
		"group/navigation-menu-trigger inline-flex w-max items-center justify-center rounded-lg font-medium outline-none",
		"transition-colors hover:bg-muted focus:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
		"data-[state=open]:bg-muted/50 data-[popup-open]:bg-muted/50",
		"disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none",
	],
	variants: {
		size: {
			sm: "h-8 px-2 text-xs",
			md: "h-9 px-2.5 text-sm",
		},
	},
	defaultVariants: { size: "md" },
});

export type NavigationMenuSize = NonNullable<
	VariantProps<typeof navigationMenuTriggerStyle>["size"]
>;

/** The visual contract both ports share; motion is per primitive, as in shadcn's two ports. */
export const navigationMenu = tv({
	slots: {
		root: "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
		list: "group flex flex-1 list-none items-center justify-center gap-0",
		item: "relative",
		chevron: [
			"relative top-px ml-1 size-3 shrink-0 transition-transform duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
			"group-data-[state=open]/navigation-menu-trigger:rotate-180",
			"group-data-[popup-open]/navigation-menu-trigger:rotate-180 motion-reduce:transition-none",
		],
		content: "p-2 **:data-[slot=navigation-menu-link]:focus:ring-0",
		viewport:
			"overflow-hidden rounded-xl bg-popover text-foreground shadow-lg ring-1 ring-foreground/10",
		link: [
			"flex flex-col gap-0.5 rounded-md p-2 text-sm outline-none transition-colors",
			"hover:bg-muted focus:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
			"data-[active]:bg-muted/50 aria-[current=page]:bg-muted/50 motion-reduce:transition-none",
		],
		indicator: "top-full z-10 flex h-1.5 items-end justify-center overflow-hidden",
		indicatorArrow:
			"relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-border shadow-md",
	},
});
