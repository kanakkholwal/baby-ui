import { tv, type VariantProps } from "tailwind-variants";

export const logoCloud = tv({
	slots: {
		root: "@container/logos w-full bg-background text-foreground",
		inner: "mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-8 px-6 py-16",
		title: "text-balance text-muted-foreground text-sm",
		stage: "group/logos relative",
		list: [
			"text-foreground/80 [&_img]:h-6 [&_img]:w-auto [&_svg]:h-6 [&_svg]:w-auto",
			// With a fine pointer the logos blur and dim on hover so the link can surface over them.
			"transition-[opacity,filter] duration-(--duration-slow) ease-(--ease-ui-out) motion-reduce:transition-none",
			"pointer-fine:group-has-[[data-slot=logo-cloud-link]]/logos:group-hover/logos:opacity-40 pointer-fine:group-has-[[data-slot=logo-cloud-link]]/logos:group-hover/logos:blur-xs",
			"pointer-fine:group-focus-within/logos:opacity-40 pointer-fine:group-focus-within/logos:blur-xs",
		],
		item: "flex min-w-0 items-center justify-center",
		// Under the logos on touch; centred over them, revealed on hover or focus, with a fine pointer.
		link: [
			"group/logo-link mx-auto mt-6 flex w-fit items-center gap-1 rounded-full px-3 py-1.5 font-medium text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
			"pointer-fine:absolute pointer-fine:inset-0 pointer-fine:m-auto pointer-fine:h-fit pointer-fine:scale-95 pointer-fine:opacity-0 pointer-fine:transition-[opacity,scale] pointer-fine:duration-(--duration-slow) pointer-fine:ease-(--ease-ui-out)",
			"pointer-fine:pointer-events-none pointer-fine:group-hover/logos:pointer-events-auto pointer-fine:group-hover/logos:scale-100 pointer-fine:group-hover/logos:opacity-100 pointer-fine:focus-visible:scale-100 pointer-fine:focus-visible:opacity-100 motion-reduce:transition-none",
		],
		linkArrow:
			"size-3.5 transition-transform duration-(--duration-fast) group-hover/logo-link:translate-x-0.5 motion-reduce:transition-none",
	},
	variants: {
		variant: {
			// A centred grid, three logos a row and four from 36rem.
			grid: {
				title: "text-center",
				list: "mx-auto grid max-w-3xl grid-cols-3 gap-x-12 gap-y-10 @xl/logos:grid-cols-4",
			},
			// A ruled band: the line on the left, logos spread on the right from 56rem.
			row: {
				inner:
					"border-border border-y py-10 @4xl/logos:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] @4xl/logos:items-center @4xl/logos:gap-12",
				list: "flex flex-wrap items-center justify-center gap-x-12 gap-y-8 @4xl/logos:justify-between",
			},
		},
	},
	defaultVariants: { variant: "grid" },
});

export type LogoCloudVariant = NonNullable<VariantProps<typeof logoCloud>["variant"]>;
