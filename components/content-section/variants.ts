import { tv, type VariantProps } from "tailwind-variants";

export const contentSection = tv({
	slots: {
		root: "@container/content w-full bg-background text-foreground",
		inner:
			"mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-10 px-6 py-20 @3xl/content:gap-16 @3xl/content:py-28",
		title:
			"max-w-2xl text-balance font-medium text-3xl tracking-tight @3xl/content:text-4xl @5xl/content:text-5xl",
		// Prose: muted paragraphs, with <strong> lifted to the foreground as the line to remember.
		body: "grid min-w-0 content-start gap-4 text-pretty text-muted-foreground leading-relaxed [&_strong]:font-medium [&_strong]:text-foreground",
		media: [
			"group/content-media relative min-w-0 overflow-hidden rounded-3xl border border-border bg-foreground/[0.03] p-1.5",
			"[&_img]:h-auto [&_img]:w-full [&_img]:rounded-[1.125rem] [&_img]:align-top",
			"[&_img]:transition-[scale] [&_img]:duration-(--duration-slow) [&_img]:ease-(--ease-ui-out) hover:[&_img]:scale-[1.015] motion-reduce:[&_img]:transition-none",
		],
		quote: "mt-4 grid gap-4 border-border border-l-2 pl-5 text-foreground",
		quoteText: "text-pretty leading-relaxed",
		quoteAuthor: "text-muted-foreground text-sm not-italic",
	},
	variants: {
		variant: {
			// Title across the top, then the media beside the prose from 48rem.
			split: {
				inner: "@3xl/content:grid-cols-2 @3xl/content:gap-x-16 @5xl/content:gap-x-24",
				title: "@3xl/content:col-span-full",
			},
			// Title and prose centred in a reading column, the media full width beneath.
			stacked: {
				title: "mx-auto text-center",
				body: "mx-auto max-w-2xl text-center",
				quote: "justify-items-center border-l-0 border-border border-t pt-6 pl-0",
				media: "order-last",
			},
		},
	},
	defaultVariants: { variant: "split" },
});

export type ContentSectionVariant = NonNullable<
	VariantProps<typeof contentSection>["variant"]
>;
