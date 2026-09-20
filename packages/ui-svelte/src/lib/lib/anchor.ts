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
	const {
		placement = "bottom-start",
		gap = 6,
		padding = 8,
		matchWidth = false,
	} = options;

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
