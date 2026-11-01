import { tv, type VariantProps } from "tailwind-variants";

const SETTLE =
	"transition-opacity duration-(--duration-overlay) ease-(--ease-ui-out) motion-reduce:transition-none [[data-streaming]_&]:pointer-events-none [[data-streaming]_&]:opacity-0";

export const streamingText = tv({
	slots: {
		root: "group/stream flex w-full flex-col",
		text: "m-0 text-foreground",
		caret:
			"stream-caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-current",
		chip: "pop-in mr-1 inline-flex h-4.5 translate-y-[-1px] items-center gap-1 rounded-[5px] bg-muted px-[3px] align-middle font-mono text-muted-foreground text-xs shadow-xs transition-colors duration-(--duration-fast) hover:bg-accent hover:text-accent-foreground",
		footer: ["mt-2 flex flex-wrap items-center gap-0.5", SETTLE],
		copy: "size-6 rounded-md border-0 bg-transparent text-muted-foreground shadow-none hover:bg-accent hover:text-accent-foreground",
		sources: "contents",
		sourcesTrigger:
			"ms-1.5 flex items-center gap-1.5 rounded-md px-1 py-0.5 text-left outline-none transition-[background-color,scale] duration-(--duration-fast) hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring active:scale-(--press-scale) motion-reduce:transition-none",
		favicons: "flex -space-x-1",
		favicon: "size-3.5 rounded-full bg-card shadow-[0_0_0_1.5px_var(--background)]",
		sourcesLabel: "text-muted-foreground text-xs",
		panel: [
			"invisible grid basis-full grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,visibility] duration-(--duration-slow) ease-(--ease-ui-out) motion-reduce:transition-none",
			"data-[open]:visible data-[open]:grid-rows-[1fr] data-[open]:opacity-100 data-[state=open]:visible data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100",
		],
		clip: "min-h-0 overflow-hidden",
		list: "mt-1.5 flex flex-col rounded-[10px] bg-muted p-1 shadow-xs",
		source:
			"flex items-center gap-2 rounded-md px-1.5 py-1 text-muted-foreground text-xs outline-none transition-[background-color,color,scale] duration-(--duration-fast) hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-(--press-scale) motion-reduce:transition-none",
		sourceImage: "size-4 rounded-[4px]",
		sourceDomain: "ms-auto font-mono text-muted-foreground text-xs",
		followUps: ["mt-2.5", SETTLE],
		followUpsLabel: "m-0 font-medium text-muted-foreground text-xs",
		followUpList: "m-0 mt-0.5 flex list-none flex-col p-0",
		followUp:
			"-mx-1.5 flex w-[calc(100%+0.75rem)] items-center gap-2 rounded-md border-border border-b px-1.5 py-1.5 text-left text-foreground text-xs outline-none transition-[background-color,scale] duration-(--duration-instant) last:border-0 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring active:scale-(--press-scale) motion-reduce:transition-none",
	},
	variants: {
		layout: {
			inline: { root: "" },
			card: { root: "rounded-xl border border-border bg-card p-4" },
		},
		size: {
			sm: { text: "text-xs leading-normal" },
			default: { text: "text-sm leading-relaxed" },
			lg: { text: "text-base leading-relaxed" },
		},
	},
	defaultVariants: { layout: "inline", size: "default" },
});

export type StreamingTextSize = NonNullable<VariantProps<typeof streamingText>["size"]>;
export type StreamingTextLayout = NonNullable<
	VariantProps<typeof streamingText>["layout"]
>;

export type StreamingToken = { text: string; cite?: number };
export type StreamingSource = {
	name: string;
	domain: string;
	href: string;
	image: string;
};

export const WORD_DELAY = 55;

/** Plain text splits into word tokens; tokens pass through. */
export const tokensOf = (content: StreamingToken[] | string): StreamingToken[] =>
	typeof content === "string"
		? content
				.split(/\s+/)
				.filter(Boolean)
				.map((text) => ({ text }))
		: content;

/** The answer as plain text, for copying. */
export const plainTextOf = (content: StreamingToken[] | string) =>
	typeof content === "string"
		? content
		: content
				.map((token) => token.text)
				.filter(Boolean)
				.join(" ");
