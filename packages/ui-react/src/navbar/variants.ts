import { tv, type VariantProps } from "tailwind-variants";

export const navbar = tv({
	slots: {
		header:
			"inset-x-0 top-0 z-40 transition-[background,border-color,backdrop-filter] duration-300",
		nav: "mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6",
		links: "relative hidden items-center gap-0.5 md:flex",
		pill: "pointer-events-none absolute inset-y-1 left-0 rounded-md bg-foreground/[0.06] transition-[transform,scale,translate,width,opacity] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
		link: "relative z-10 rounded-md px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground aria-[current=page]:text-foreground",
		menuButton:
			"grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground md:hidden",
		// Only the closed state carries motion, so opening and closing never compete.
		layer:
			"fixed inset-0 z-50 transition-[visibility] duration-0 data-[state=closed]:invisible data-[state=closed]:delay-[var(--duration-overlay)] md:hidden",
		veil: "absolute inset-0 bg-black/40 transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-out)] starting:opacity-0 data-[state=closed]:opacity-0 data-[state=closed]:duration-[var(--duration-exit)] motion-reduce:transition-none",
		sheet:
			"absolute inset-x-0 bottom-0 rounded-t-2xl border-border border-t bg-card p-4 transition-transform duration-[var(--duration-drawer)] ease-[var(--ease-drawer)] starting:translate-y-full data-[state=closed]:translate-y-full data-[state=closed]:duration-[var(--duration-overlay)] motion-reduce:transition-none",
		sheetLink:
			"block rounded-lg px-3 py-2.5 text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground aria-[current=page]:bg-foreground/[0.06] aria-[current=page]:text-foreground",
	},
	variants: {
		/** Solid spans the page edge to edge; floating is an inset rounded bar. */
		variant: {
			solid: { header: "border-b" },
			floating: {
				header: "px-3 pt-3",
				nav: "h-12 max-w-6xl rounded-2xl border px-3 transition-[background,border-color,box-shadow,backdrop-filter] duration-300 md:px-4",
			},
		},
		/** Resting, scrolled over content with blur, scrolled without blur. */
		surface: { clear: {}, blurred: {}, opaque: {} },
		sticky: { true: { header: "sticky" }, false: {} },
	},
	compoundVariants: [
		{
			variant: "solid",
			surface: "clear",
			class: { header: "border-transparent bg-transparent" },
		},
		{
			variant: "solid",
			surface: "blurred",
			class: {
				header: "border-border bg-background/70 backdrop-blur-xl backdrop-saturate-150",
			},
		},
		{
			variant: "solid",
			surface: "opaque",
			class: { header: "border-border bg-background" },
		},
		{
			variant: "floating",
			surface: "clear",
			class: { nav: "border-border bg-background/60" },
		},
		{
			variant: "floating",
			surface: "blurred",
			class: {
				nav: "border-border bg-background/70 shadow-lg backdrop-blur-xl backdrop-saturate-150",
			},
		},
		{
			variant: "floating",
			surface: "opaque",
			class: { nav: "border-border bg-background shadow-lg" },
		},
	],
	defaultVariants: { variant: "solid", surface: "clear", sticky: true },
});

export type NavbarVariant = NonNullable<VariantProps<typeof navbar>["variant"]>;
