import { tv, type VariantProps } from "tailwind-variants";

export const scrollArea = tv({
	slots: {
		root: "group/scroll relative overflow-hidden",
		viewport: "size-full overscroll-contain rounded-[inherit] outline-none",
		scrollbar:
			"flex touch-none select-none p-0.5 transition-opacity duration-(--duration-fast) motion-reduce:transition-none data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-2.5",
		thumb: "relative flex-1 rounded-full bg-border",
		fadeStart:
			"pointer-events-none absolute z-1 transition-opacity duration-(--duration-fast) motion-reduce:transition-none",
		fadeEnd:
			"pointer-events-none absolute z-1 transition-opacity duration-(--duration-fast) motion-reduce:transition-none",
	},
	variants: {
		/** `hover` and `scroll` keep the bar mounted but transparent until it is needed. */
		scrollbar: {
			auto: {},
			hover: {
				scrollbar:
					"opacity-0 group-hover/scroll:opacity-100 group-focus-within/scroll:opacity-100 group-data-[scrolling=true]/scroll:opacity-100",
			},
			scroll: { scrollbar: "opacity-0 group-data-[scrolling=true]/scroll:opacity-100" },
			hidden: {
				viewport:
					"[scrollbar-gutter:auto] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
			},
		},
		/** `reserve` pads the content so the bar never overlaps it. */
		gutter: { overlay: {}, reserve: {} },
		orientation: {
			vertical: { viewport: "overflow-x-hidden! overflow-y-auto!" },
			horizontal: { viewport: "overflow-x-auto! overflow-y-hidden!" },
			both: { viewport: "overflow-auto!" },
		},
		/** `mask` fades the content itself, so it works on any surface; `blur` softens it instead. */
		fade: { none: {}, mask: {}, blur: {} },
	},
	compoundVariants: [
		{ gutter: "reserve", orientation: "vertical", class: { viewport: "pr-3" } },
		{ gutter: "reserve", orientation: "horizontal", class: { viewport: "pb-3" } },
		{ gutter: "reserve", orientation: "both", class: { viewport: "pr-3 pb-3" } },
		{
			fade: "mask",
			orientation: "vertical",
			class: {
				viewport: `[mask-image:linear-gradient(to_bottom,transparent,#000_var(--sa-top,0px),#000_calc(100%-var(--sa-bottom,0px)),transparent)]`,
			},
		},
		// Both axes: the two fades intersect, so a corner fades along each edge it is clipped at.
		{
			fade: "mask",
			orientation: "both",
			class: {
				viewport:
					"[-webkit-mask-composite:source-in] [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,transparent,#000_var(--sa-top,0px),#000_calc(100%-var(--sa-bottom,0px)),transparent),linear-gradient(to_right,transparent,#000_var(--sa-left,0px),#000_calc(100%-var(--sa-right,0px)),transparent)]",
			},
		},
		{
			fade: "mask",
			orientation: "horizontal",
			class: {
				viewport: `[mask-image:linear-gradient(to_right,transparent,#000_var(--sa-left,0px),#000_calc(100%-var(--sa-right,0px)),transparent)]`,
			},
		},
		{
			fade: "blur",
			orientation: ["vertical", "both"],
			class: {
				fadeStart:
					"inset-x-0 top-0 h-6 backdrop-blur-[3px] [mask-image:linear-gradient(to_bottom,#000,transparent)]",
				fadeEnd:
					"inset-x-0 bottom-0 h-6 backdrop-blur-[3px] [mask-image:linear-gradient(to_top,#000,transparent)]",
			},
		},
		{
			fade: "blur",
			orientation: "horizontal",
			class: {
				fadeStart:
					"inset-y-0 left-0 w-6 backdrop-blur-[3px] [mask-image:linear-gradient(to_right,#000,transparent)]",
				fadeEnd:
					"inset-y-0 right-0 w-6 backdrop-blur-[3px] [mask-image:linear-gradient(to_left,#000,transparent)]",
			},
		},
	],
	defaultVariants: {
		scrollbar: "auto",
		gutter: "overlay",
		orientation: "vertical",
		fade: "mask",
	},
});

export type ScrollAreaScrollbar = NonNullable<
	VariantProps<typeof scrollArea>["scrollbar"]
>;
export type ScrollAreaGutter = NonNullable<VariantProps<typeof scrollArea>["gutter"]>;
export type ScrollAreaOrientation = NonNullable<
	VariantProps<typeof scrollArea>["orientation"]
>;
export type ScrollAreaFade = NonNullable<VariantProps<typeof scrollArea>["fade"]>;

/** Default length, in px, over which a mask fade ramps in. */
export const SCROLL_FADE = 32;

export type ScrollEdges = { start: boolean; end: boolean };

/** Whether content is clipped before and after the viewport along its main axis. */
export function readEdges(
	el: HTMLElement,
	orientation: ScrollAreaOrientation,
): ScrollEdges {
	if (orientation === "horizontal") {
		return {
			start: Math.abs(el.scrollLeft) > 1,
			end: Math.abs(el.scrollLeft) + el.clientWidth < el.scrollWidth - 1,
		};
	}
	return {
		start: el.scrollTop > 1,
		end: el.scrollTop + el.clientHeight < el.scrollHeight - 1,
	};
}

/**
 * Writes how much of each edge to fade, in px. A fade grows from nothing over `size` px of
 * scrolling (after `offset`), so it never pops; an edge with nothing clipped has none.
 */
export function writeFade(
	el: HTMLElement,
	orientation: ScrollAreaOrientation,
	size: number,
	offset: number,
) {
	const ramp = (hidden: number) => Math.min(size, Math.max(0, hidden - offset));
	const maxY = el.scrollHeight - el.clientHeight;
	const maxX = el.scrollWidth - el.clientWidth;
	const x = Math.abs(el.scrollLeft);
	// In a right-to-left box scrollLeft runs from 0 to negative: the hidden start is on the right.
	const rtl = getComputedStyle(el).direction === "rtl";
	const hiddenStart = rtl ? maxX - x : x;
	const hiddenEnd = rtl ? x : maxX - x;
	const vertical = orientation !== "horizontal";
	const horizontal = orientation !== "vertical";
	const set = (name: string, px: number) => el.style.setProperty(name, `${px}px`);
	set("--sa-top", vertical ? ramp(el.scrollTop) : 0);
	set("--sa-bottom", vertical ? ramp(maxY - el.scrollTop) : 0);
	set("--sa-left", horizontal ? ramp(hiddenStart) : 0);
	set("--sa-right", horizontal ? ramp(hiddenEnd) : 0);
}
