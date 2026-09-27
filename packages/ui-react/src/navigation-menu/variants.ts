import { tv, type VariantProps } from "tailwind-variants";

/** Trigger and top-level link look; shadcn's name, so shadcn blocks can import it. */
export const navigationMenuTriggerStyle = tv({
	base: [
		"group/navigation-menu-trigger inline-flex w-max items-center justify-center gap-1 rounded-md",
		"font-medium text-muted-foreground outline-none transition-colors",
		"hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
		"data-[state=open]:text-foreground data-[popup-open]:text-foreground",
		"data-[active]:text-foreground aria-[current=page]:text-foreground",
		"disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none",
	],
	variants: {
		size: {
			sm: "h-8 px-2 text-xs",
			md: "h-9 px-3 text-sm",
		},
	},
	defaultVariants: { size: "md" },
});

export type NavigationMenuSize = NonNullable<
	VariantProps<typeof navigationMenuTriggerStyle>["size"]
>;

/** Content enters from the side the pointer came from, so moving between triggers reads as one panel sliding. */
export const navigationMenu = tv({
	slots: {
		root: "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
		list: "flex flex-1 list-none items-center justify-center gap-0.5",
		item: "relative",
		chevron: [
			"size-3.5 shrink-0 transition-transform duration-[var(--duration-dropdown)] ease-[var(--ease-out)]",
			"group-data-[state=open]/navigation-menu-trigger:rotate-180",
			"group-data-[popup-open]/navigation-menu-trigger:rotate-180 motion-reduce:transition-none",
		],
		content: [
			"top-0 left-0 w-full p-2 md:absolute md:w-auto",
			"transition-[opacity,translate] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
			// bits-ui: data-motion names the side the new panel enters from.
			"starting:opacity-0 starting:data-[motion=from-start]:-translate-x-8 starting:data-[motion=from-end]:translate-x-8",
			"data-[motion=to-start]:-translate-x-8 data-[motion=to-end]:translate-x-8 data-[motion^=to-]:opacity-0",
			// Base UI: activation-direction plus starting/ending style.
			"data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
			"data-[starting-style]:data-[activation-direction=left]:-translate-x-8",
			"data-[starting-style]:data-[activation-direction=right]:translate-x-8",
			"data-[ending-style]:data-[activation-direction=left]:translate-x-8",
			"data-[ending-style]:data-[activation-direction=right]:-translate-x-8",
		],
		viewport: [
			"relative overflow-hidden rounded-xl border border-border bg-popover text-foreground shadow-lg",
			"origin-top transition-[width,height,opacity,scale] duration-[var(--duration-dropdown)] ease-[var(--ease-out)]",
			"data-[state=closed]:scale-[var(--enter-scale)] data-[state=closed]:opacity-0",
			"data-[state=closed]:duration-[var(--duration-exit)] motion-reduce:transition-none",
		],
		link: [
			"flex flex-col gap-0.5 rounded-md px-3 py-2 text-sm outline-none transition-colors",
			"hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
			"data-[active]:font-medium aria-[current=page]:font-medium motion-reduce:transition-none",
		],
		indicator: "top-full z-10 flex h-1.5 items-end justify-center overflow-hidden",
		indicatorArrow: "relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-border",
	},
});
