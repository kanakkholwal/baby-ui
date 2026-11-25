import { tv, type VariantProps } from "tailwind-variants";

// The `default` design lays the parts on a grid and morphs it: one row at rest, a card when expanded.
const PILL_AREAS = "[grid-template-areas:'lead_input_trail'_'foot_foot_foot']";
const PILL_AREAS_OPEN =
	"data-[expanded=true]:[grid-template-areas:'files_files_files'_'input_input_input'_'lead_mid_trail']";

export const composer = tv({
	slots: {
		root: "relative w-full rounded-2xl p-2 transition-[border-color,background-color] duration-(--duration-fast) ease-(--ease-ui-out) data-[disabled]:pointer-events-none data-[disabled]:opacity-60 motion-reduce:transition-none",
		input: "relative",
		// slop-scan-ignore: focus shows on the root (the pill opens into a card, bare changes border).
		textarea:
			"scrollbar-none block w-full resize-none overflow-y-auto bg-transparent text-foreground outline-none placeholder:text-muted-foreground",
		mirror:
			"pointer-events-none invisible absolute inset-x-0 top-0 whitespace-pre-wrap [overflow-wrap:break-word]",
		toolbar: "mt-1 flex min-h-8 items-center gap-1",
		actionsTrigger:
			"size-8 rounded-full data-[popup-open]:bg-accent data-[state=open]:bg-accent [&>svg]:transition-[rotate] [&>svg]:duration-(--duration-fast) [&>svg]:ease-(--ease-spring-snappy) data-[popup-open]:[&>svg]:rotate-45 data-[state=open]:[&>svg]:rotate-45 motion-reduce:[&>svg]:transition-none",
		actionIcon:
			"mt-0.5 grid size-5 shrink-0 place-items-center text-muted-foreground [&_svg]:size-4",
		modelTrigger:
			"inline-flex h-8 max-w-52 items-center gap-1 rounded-xl px-2 font-medium text-muted-foreground text-sm outline-none transition-colors duration-(--duration-fast) ease-(--ease-ui-out) hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 data-[popup-open]:bg-foreground/[0.06] data-[state=open]:bg-foreground/[0.06] motion-reduce:transition-none",
		modelContent: "w-56 gap-0 p-1",
		modelItem:
			"w-full flex-row-reverse items-center justify-between rounded-lg px-2 py-1.5 text-sm transition-colors duration-(--duration-fast) ease-(--ease-ui-out) has-[[data-checked]]:bg-foreground/[0.06] has-[[data-state=checked]]:bg-foreground/[0.06] motion-reduce:transition-none",
		effort:
			"mt-1 flex flex-col gap-1.5 border-foreground/10 border-t px-2 pt-2 pb-1 text-sm",
		effortHeader: "flex items-baseline gap-1.5 text-muted-foreground text-sm",
		effortValue: "font-medium text-foreground",
		effortTrack:
			"w-full [&_[data-slot=slider-thumb]]:w-6 [&_[data-slot=slider-thumb]]:rounded-lg [&_[data-slot=slider-thumb]]:bg-background [&_[data-slot=slider-thumb]]:shadow-sm [&_[data-slot=slider-thumb]]:before:hidden",
		effortNotches:
			"pointer-events-none absolute inset-x-3 inset-y-0 flex items-center justify-between",
		effortNotch: "h-3.5 w-0.5 rounded-full bg-foreground/25",
		effortEnds: "flex justify-between text-muted-foreground text-xs",
		submit: "ms-auto size-8 rounded-full",
		submitIcon:
			"grid place-items-center transition-[opacity,translate,scale] duration-(--duration-fast) ease-(--ease-spring-snappy) starting:translate-y-[3px] starting:scale-80 starting:opacity-0 motion-reduce:transition-none",
		// Pill parts.
		tools: "flex shrink-0 items-center gap-2",
		voice: "size-9 rounded-full shadow-xs",
		files:
			"grid grid-rows-[0fr] transition-[grid-template-rows] duration-(--duration-base) ease-(--ease-ui-out) data-[open=true]:grid-rows-[1fr] motion-reduce:transition-none",
		filesInner: "flex min-h-0 gap-2 overflow-hidden",
		attachment:
			"group/attachment relative flex h-16 min-w-16 max-w-24 shrink-0 flex-col justify-end overflow-hidden rounded-2xl bg-muted px-2 pb-1.5 text-muted-foreground text-xs data-[error=true]:bg-destructive/10 data-[error=true]:text-destructive-strong",
		attachmentImage: "absolute inset-0 size-full object-cover",
		attachmentName: "relative min-w-0 truncate",
		attachmentIcon: "absolute top-2 left-2 size-5 [&_svg]:size-5",
		attachmentRemove:
			"absolute top-1 right-1 z-10 grid size-5 place-items-center rounded-full bg-foreground/55 text-background outline-none transition-colors hover:bg-foreground/75 focus-visible:ring-2 focus-visible:ring-ring after:absolute after:-inset-1 after:content-[''] [&_svg]:size-3",
		attachmentProgress:
			"absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary transition-[scale] duration-(--duration-base) ease-(--ease-ui-out) motion-reduce:transition-none",
		footer:
			"flex h-[26px] items-center gap-2 text-[13px] text-muted-foreground [grid-area:foot]",
		chip: "inline-flex h-6 shrink-0 items-center gap-1 rounded-full px-1.5 font-medium text-[13px] text-muted-foreground outline-none transition-colors duration-(--duration-fast) ease-(--ease-ui-out) hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[popup-open]:bg-foreground/[0.06] data-[state=open]:bg-foreground/[0.06] motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0",
		usage:
			"ms-auto inline-flex h-6 shrink-0 items-center gap-1 rounded-full bg-foreground/[0.06] pe-2 ps-1.5 font-medium text-[13px] text-muted-foreground tabular-nums [&_svg]:size-4",
		menuLabel: "px-2 pt-1 pb-0.5 font-medium text-muted-foreground text-sm",
		menu: "w-max min-w-72",
		menuRow: "my-0.5 items-center justify-start gap-2",
		menuIcon:
			"grid shrink-0 place-items-center text-muted-foreground [&_svg:not([class*='size-'])]:size-5",
		menuTitle: "whitespace-nowrap font-medium text-foreground text-sm",
		menuHint: "-ms-0.5 whitespace-nowrap text-muted-foreground text-sm",
	},
	variants: {
		/** `default` is one row that grows into a card. `bare` is a flat field kept only for Audio and Image Composer until they are revamped. */
		variant: {
			bare: { root: "border border-transparent bg-muted focus-within:border-border" },
			default: {
				root: [
					"isolate mx-auto grid max-w-[640px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-y-2.5 rounded-none border-0 bg-transparent p-0",
					PILL_AREAS,
					PILL_AREAS_OPEN,
					// The surface is a pseudo-element on the card rows: a pill at rest, a rounded card when expanded.
					"before:col-[1/-1] before:row-[1] before:self-stretch before:rounded-full before:bg-popover before:shadow-xs before:content-[''] data-[expanded=true]:before:row-[1/4] data-[expanded=true]:before:rounded-[1.5rem] after:col-[1/-1] after:row-[1] after:-z-10 after:self-stretch after:rounded-full after:bg-black after:opacity-10 after:blur-[50px] after:content-[''] data-[expanded=true]:after:row-[1/4] data-[expanded=true]:after:rounded-[1.5rem] dark:after:hidden",
					"[&>[data-slot=composer-toolbar]]:contents",
					"[&_[data-slot=composer-submit]]:disabled:opacity-100 [&_[data-slot=composer-tools]_[data-slot=select-trigger]]:text-sm [&_[data-slot=composer-tools]_[data-slot=select-trigger]]:font-medium",
					"[&>[data-slot=composer-input]]:[grid-area:input] [&>[data-slot=composer-input]]:mx-0.5 [&>[data-slot=composer-input]]:self-center",
					"data-[expanded=true]:gap-y-0 data-[expanded=true]:[&>[data-slot=composer-input]]:mx-2.5 data-[expanded=true]:[&>[data-slot=composer-input]]:mt-2.5 data-[expanded=true]:[&>[data-slot=composer-input]]:mb-3",
					"[&>[data-slot=composer-files]]:hidden data-[expanded=true]:[&>[data-slot=composer-files]]:grid data-[expanded=true]:[&>[data-slot=composer-files]]:[grid-area:files] data-[expanded=true]:[&>[data-slot=composer-files]]:mx-3 data-[expanded=true]:[&>[data-slot=composer-files][data-open=true]]:mt-3",
					"[&_[data-composer=actions]]:m-2 [&_[data-composer=actions]]:size-9 [&_[data-composer=actions]]:bg-muted [&_[data-composer=actions]]:[grid-area:lead]",
					"[&_[data-composer=mode]]:[grid-area:mid] [&_[data-composer=mode]]:justify-self-start [&_[data-composer=mode]]:hidden data-[expanded=true]:[&_[data-composer=mode]]:inline-flex",
					"[&_[data-slot=composer-tools]]:m-2 [&_[data-slot=composer-tools]]:[grid-area:trail]",
					"[&>[data-slot=composer-footer]]:px-3",
					// Expanded, the footer becomes a tab tucked behind the top edge of the card.
					"data-[expanded=true]:[&>[data-slot=composer-footer]]:absolute data-[expanded=true]:[&>[data-slot=composer-footer]]:inset-x-7 data-[expanded=true]:[&>[data-slot=composer-footer]]:bottom-[calc(100%-10px)] data-[expanded=true]:[&>[data-slot=composer-footer]]:-z-10 data-[expanded=true]:[&>[data-slot=composer-footer]]:h-[42px] data-[expanded=true]:[&>[data-slot=composer-footer]]:items-center data-[expanded=true]:[&>[data-slot=composer-footer]]:rounded-t-2xl data-[expanded=true]:[&>[data-slot=composer-footer]]:bg-foreground/[0.07] data-[expanded=true]:[&>[data-slot=composer-footer]]:px-2 data-[expanded=true]:[&>[data-slot=composer-footer]]:pb-2.5",
				],
				toolbar: "mt-0",
				files: "[&>*]:p-0",
			},
		},
		size: {
			sm: {
				textarea: "px-1.5 pt-1 text-xs leading-5",
				mirror: "px-1.5 pt-1 text-xs leading-5",
				submit: "size-8",
			},
			default: {
				textarea: "px-2 pt-1.5 text-sm leading-6",
				mirror: "px-2 pt-1.5 text-sm leading-6",
				submit: "size-9",
			},
			lg: {
				textarea: "px-2.5 pt-2 text-base leading-7",
				mirror: "px-2.5 pt-2 text-base leading-7",
				submit: "size-10",
			},
		},
	},
	// iOS zooms into text under 16px, so the pill's field reads 16px below md.
	compoundVariants: [
		{
			variant: "default",
			class: { textarea: "text-base md:text-sm", mirror: "text-base md:text-sm" },
		},
	],
	defaultVariants: { variant: "default", size: "default" },
});

export type ComposerVariant = NonNullable<VariantProps<typeof composer>["variant"]>;
export type ComposerSize = NonNullable<VariantProps<typeof composer>["size"]>;

export const COMPOSER_LINE_HEIGHT: Record<ComposerSize, number> = {
	sm: 20,
	default: 24,
	lg: 28,
};

/** Circumference of the context ring (radius 7 on a 20px box). */
export const CONTEXT_RING_LENGTH = 2 * Math.PI * 7;

/** How much of the ring to leave undrawn for a 0 to 100 usage value. */
export function contextOffset(percent: number): number {
	return CONTEXT_RING_LENGTH * (1 - Math.min(100, Math.max(0, percent)) / 100);
}
