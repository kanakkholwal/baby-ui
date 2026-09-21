import {
	autoUpdate,
	computePosition,
	flip,
	offset,
	type Placement,
	shift,
	size,
} from "@floating-ui/dom";

export type AnchorPlacement = Placement;

const ANCHORED_BASE = [
	"fixed top-0 left-0 z-50 pointer-events-none opacity-0",
	"duration-[var(--duration-exit)] ease-[var(--ease-out)]",
	"data-[state=open]:pointer-events-auto data-[state=open]:opacity-100",
	"data-[state=open]:duration-[var(--duration-dropdown)]",
	// The first open mounts the element already open, so only @starting-style can animate it.
	"starting:data-[state=open]:opacity-0",
	"motion-reduce:transition-none",
];

/**
 * Class contract every anchored surface shares, so a popover, a menu and a select
 * open and close identically. `anchor()` owns transform-origin; this owns the rest.
 */
export const ANCHORED = [
	...ANCHORED_BASE,
	"scale-[var(--enter-scale)] transition-[opacity,scale,translate]",
	// The closed state leans toward its trigger, so opening reads as unfolding from it.
	"data-[state=closed]:data-[placement^=bottom]:-translate-y-1",
	"data-[state=closed]:data-[placement^=top]:translate-y-1",
	"data-[state=open]:scale-100",
	"starting:data-[state=open]:scale-[var(--enter-scale)]",
	"starting:data-[state=open]:data-[placement^=bottom]:-translate-y-1",
	"starting:data-[state=open]:data-[placement^=top]:translate-y-1",
].join(" ");

/**
 * Menus, selects and comboboxes unfold from the trigger edge instead of scaling: the
 * list starts flush and square against it, then separates into its own rounded panel.
 */
export const UNFOLD = [
	...ANCHORED_BASE,
	"group/surface transition-[opacity,translate,clip-path,border-radius]",
	// Negative insets keep the box-shadow inside the clip; only the near edge closes to 100%.
	"data-[state=open]:[clip-path:inset(-4rem)]",
	"data-[state=closed]:data-[placement^=bottom]:[clip-path:inset(-4rem_-4rem_100%_-4rem)]",
	"data-[state=closed]:data-[placement^=bottom]:-translate-y-1.5 data-[state=closed]:data-[placement^=bottom]:rounded-t-none",
	"data-[state=closed]:data-[placement^=top]:[clip-path:inset(100%_-4rem_-4rem_-4rem)]",
	"data-[state=closed]:data-[placement^=top]:translate-y-1.5 data-[state=closed]:data-[placement^=top]:rounded-b-none",
	"starting:data-[state=open]:data-[placement^=bottom]:[clip-path:inset(-4rem_-4rem_100%_-4rem)]",
	"starting:data-[state=open]:data-[placement^=bottom]:-translate-y-1.5 starting:data-[state=open]:data-[placement^=bottom]:rounded-t-none",
	"starting:data-[state=open]:data-[placement^=top]:[clip-path:inset(100%_-4rem_-4rem_-4rem)]",
	"starting:data-[state=open]:data-[placement^=top]:translate-y-1.5 starting:data-[state=open]:data-[placement^=top]:rounded-b-none",
].join(" ");

/** Rows inside an `UNFOLD` surface settle in one after another; `stagger()` numbers them. */
export const UNFOLD_ITEM = [
	"transition-[color,background-color,opacity,translate,filter] ease-[var(--ease-out)]",
	"[--stagger:calc(var(--i,0)*30ms+40ms)] [transition-delay:0s,0s,var(--stagger),var(--stagger),var(--stagger)]",
	"group-data-[state=closed]/surface:opacity-0 group-data-[state=closed]/surface:-translate-y-1.5",
	"group-data-[state=closed]/surface:blur-[3px] group-data-[state=closed]/surface:[--stagger:0s]",
	"group-data-[state=closed]/surface:duration-[var(--duration-exit)]",
	"starting:group-data-[state=open]/surface:opacity-0 starting:group-data-[state=open]/surface:-translate-y-1.5",
	"starting:group-data-[state=open]/surface:blur-[3px]",
	"motion-reduce:transition-none",
].join(" ");

/** Numbers `rows` for `UNFOLD_ITEM`'s stagger delay. */
export function stagger(rows: Iterable<HTMLElement>) {
	let i = 0;
	for (const row of rows) row.style.setProperty("--i", String(i++));
}

export type AnchorOptions = {
	placement?: AnchorPlacement;
	/** Gap between anchor and floating element, in pixels. */
	gap?: number;
	/** Keep the floating element this far from the viewport edge. */
	padding?: number;
	/** Match the floating element's width to the anchor. Used by select and combobox. */
	matchWidth?: boolean;
};

/**
 * Positions `floating` against `anchor` and keeps it there. Returns a teardown that
 * must be called, or the listeners outlive the element.
 */
export function anchor(
	anchorEl: HTMLElement,
	floating: HTMLElement,
	options: AnchorOptions = {},
): () => void {
	const { placement = "bottom", gap = 6, padding = 8, matchWidth = false } = options;

	const middleware = [
		offset(gap),
		flip({ padding }),
		shift({ padding }),
		size({
			padding,
			apply({ availableHeight, rects, elements }) {
				elements.floating.style.setProperty(
					"--anchor-available-height",
					`${Math.max(0, availableHeight)}px`,
				);
				if (matchWidth) {
					elements.floating.style.width = `${rects.reference.width}px`;
				}
			},
		}),
	];

	// Before any layout read: the first style resolution is when @starting-style is
	// sampled, and the entry lean keys off this attribute.
	floating.dataset.placement ??= placement;
	// computePosition resolves a microtask later; seed the position now so the surface
	// never paints a frame at the viewport corner and appear to fly in from there.
	const seed = anchorEl.getBoundingClientRect();
	Object.assign(floating.style, {
		position: "fixed",
		left: "0",
		top: "0",
		transform: `translate(${Math.round(seed.left)}px, ${Math.round(seed.bottom + gap)}px)`,
	});

	return autoUpdate(anchorEl, floating, () => {
		computePosition(anchorEl, floating, {
			placement,
			strategy: "fixed",
			middleware,
		}).then(({ x, y, placement: resolved }) => {
			Object.assign(floating.style, {
				position: "fixed",
				left: "0",
				top: "0",
				transform: `translate(${Math.round(x)}px, ${Math.round(y)}px)`,
			});
			floating.dataset.placement = resolved;
			// Grow from the edge nearest the anchor, whichever side flip settled on.
			floating.style.transformOrigin = resolved.startsWith("top")
				? "bottom center"
				: resolved.startsWith("left")
					? "right center"
					: resolved.startsWith("right")
						? "left center"
						: "top center";
		});
	});
}

/** Closes on outside pointerdown and on Escape. Returns a teardown. */
export function dismissable(
	elements: (HTMLElement | undefined | null)[],
	onDismiss: () => void,
): () => void {
	const onPointer = (event: PointerEvent) => {
		const target = event.target as Node;
		if (elements.some((el) => el?.contains(target))) return;
		onDismiss();
	};
	const onKey = (event: KeyboardEvent) => {
		if (event.key === "Escape") onDismiss();
	};
	window.addEventListener("pointerdown", onPointer, true);
	window.addEventListener("keydown", onKey);
	return () => {
		window.removeEventListener("pointerdown", onPointer, true);
		window.removeEventListener("keydown", onKey);
	};
}

/** Walks a list of focusable items with the arrow keys, wrapping at both ends. */
export function rove(items: HTMLElement[], current: number, key: string): number | null {
	if (key === "ArrowDown") return (current + 1) % items.length;
	if (key === "ArrowUp") return (current - 1 + items.length) % items.length;
	if (key === "Home") return 0;
	if (key === "End") return items.length - 1;
	return null;
}
