import { tv, type VariantProps } from "tailwind-variants";

export const megaNavbar = tv({
	slots: {
		root: "@container w-full transition-colors duration-[var(--duration-dropdown)] motion-reduce:transition-none",
		nav: "mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-6",
		trigger:
			"inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 font-medium text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
		chevron:
			"size-3.5 transition-transform duration-[var(--duration-dropdown)] motion-reduce:transition-none",
		panel: [
			"absolute top-full z-50 origin-top overflow-hidden rounded-xl border border-border bg-card shadow-2xl",
			"transition-[width,height,transform,opacity] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
		],
		pane: "absolute inset-x-0 top-0 w-max transition-opacity duration-[var(--duration-dropdown)] motion-reduce:transition-none",
		link: "inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-2 font-medium text-sm transition-colors hover:text-foreground motion-reduce:transition-none",
		mobileChevron:
			"size-4 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-dropdown)] motion-reduce:transition-none",
		mobileItem:
			"flex min-h-12 items-center gap-3 rounded-lg px-2 py-2 transition-colors motion-reduce:transition-none",
		mobileLink:
			"flex min-h-12 items-center rounded-lg px-2 font-medium text-foreground transition-colors motion-reduce:transition-none",
	},
	variants: {
		/** Solid spans the page edge to edge; floating is an inset rounded bar. */
		variant: {
			solid: { root: "border-b" },
			floating: {
				root: "px-3 pt-3",
				nav: "h-14 rounded-2xl border px-4 transition-[background,border-color,box-shadow,backdrop-filter] duration-[var(--duration-dropdown)] motion-reduce:transition-none",
			},
		},
		/** Resting, scrolled over content with blur, scrolled without blur. */
		surface: { clear: {}, blurred: {}, opaque: {} },
		sticky: {
			true: { root: "sticky inset-x-0 top-0 z-50" },
			false: { root: "relative" },
		},
		current: {
			true: {
				trigger: "text-foreground",
				link: "text-foreground",
				mobileItem: "bg-foreground/[0.06]",
				mobileLink: "bg-foreground/[0.06]",
			},
			false: {
				trigger: "text-muted-foreground hover:text-foreground",
				link: "text-muted-foreground",
				mobileItem: "hover:bg-foreground/[0.06]",
				mobileLink: "hover:bg-foreground/[0.06]",
			},
		},
		open: {
			true: {
				chevron: "rotate-180",
				mobileChevron: "rotate-180",
				panel: "pointer-events-auto opacity-100",
				pane: "opacity-100",
			},
			false: {
				panel: "pointer-events-none opacity-0",
				pane: "pointer-events-none opacity-0",
			},
		},
	},
	compoundVariants: [
		{ variant: "solid", surface: "clear", class: { root: "border-transparent" } },
		{
			variant: "solid",
			surface: "blurred",
			class: { root: "border-border bg-background/85 backdrop-blur" },
		},
		{
			variant: "solid",
			surface: "opaque",
			class: { root: "border-border bg-background/85" },
		},
		{
			variant: "floating",
			surface: "clear",
			class: { nav: "border-border bg-background/60" },
		},
		{
			variant: "floating",
			surface: "blurred",
			class: { nav: "border-border bg-background/85 shadow-lg backdrop-blur" },
		},
		{
			variant: "floating",
			surface: "opaque",
			class: { nav: "border-border bg-background/85 shadow-lg" },
		},
	],
	defaultVariants: {
		variant: "solid",
		surface: "clear",
		sticky: true,
		current: false,
		open: false,
	},
});

export type MegaNavbarVariant = NonNullable<VariantProps<typeof megaNavbar>["variant"]>;
