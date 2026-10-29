import { tv, type VariantProps } from "tailwind-variants";

export const contactSection = tv({
	slots: {
		root: "@container/contact w-full bg-background text-foreground",
		inner:
			"mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-6 py-20 @3xl/contact:py-28",
		header: "grid max-w-2xl gap-4",
		title:
			"text-balance font-medium text-3xl tracking-tight @3xl/contact:text-4xl @5xl/contact:text-5xl",
		description: "text-pretty text-lg text-muted-foreground leading-relaxed",
		channels: "grid",
		channel: "grid min-w-0 content-start gap-1.5",
		channelTitle: "font-medium",
		// The underline draws in from the left on hover instead of popping on.
		channelLink: [
			"w-fit max-w-full truncate bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_1px] bg-bottom-left bg-no-repeat text-primary",
			"rounded-sm outline-none transition-[background-size] duration-(--duration-slow) ease-(--ease-ui-out) hover:bg-size-[100%_1px] focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
		],
		channelDetail: "text-muted-foreground text-sm",
		form: "grid w-full min-w-0 gap-6 rounded-2xl border border-border bg-background p-6 shadow-foreground/5 shadow-xl @xl/contact:p-10",
		formTitle: "font-medium text-xl",
		formDescription: "-mt-4 text-muted-foreground text-sm leading-relaxed",
	},
	variants: {
		variant: {
			// Copy and channels on the left, the form card spanning both rows on the right.
			split: {
				inner:
					"@4xl/contact:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] @4xl/contact:items-start @4xl/contact:gap-x-16",
				channels: "gap-8 border-border border-t pt-8",
				form: "@4xl/contact:col-start-2 @4xl/contact:row-span-2 @4xl/contact:row-start-1",
			},
			// Centred header, a ruled row of channel cells, then a narrower centred form.
			stacked: {
				header: "mx-auto justify-items-center text-center",
				channels:
					"gap-px overflow-hidden rounded-2xl border border-border bg-border @xl/contact:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]",
				channel: "bg-background p-6 @xl/contact:p-8",
				form: "mx-auto max-w-xl",
			},
		},
	},
	defaultVariants: { variant: "split" },
});

export type ContactSectionVariant = NonNullable<
	VariantProps<typeof contactSection>["variant"]
>;
