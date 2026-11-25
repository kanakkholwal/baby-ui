type Box = { x: number; y: number };

export type ComposerSnapshot = {
	/** Part positions measured from the composer's bottom edge, so growth reads as upward. */
	boxes: Record<string, Box>;
	height: number;
	surface: number;
	bottom: number;
	expanded: boolean;
};

const PARTS = {
	actions: "[data-composer=actions]",
	input: "[data-slot=composer-input]",
	tools: "[data-slot=composer-tools]",
	footer: "[data-slot=composer-footer]",
} as const;
const MODE = "[data-composer=mode]";

// Speeds and curve come from the motion tokens: opening is --duration-base, closing is a third of it.
const CHIP_DELAY = 40;

function tokens(root: HTMLElement) {
	const css = getComputedStyle(root);
	const ms = (name: string, fallback: number) =>
		Number.parseFloat(css.getPropertyValue(name)) || fallback;
	return {
		easing: css.getPropertyValue("--ease-ui-out").trim() || "ease-out",
		open: ms("--duration-base", 200),
		close: ms("--duration-instant", 100),
		chip: ms("--duration-fast", 150),
	};
}

/** Stops our own transform animations so a measurement sees the layout, not a mid-flight frame. */
export function settleComposer(root: HTMLElement) {
	for (const a of root.getAnimations({ subtree: true }))
		if (!(a instanceof CSSTransition) && !(a instanceof CSSAnimation)) a.cancel();
}

export function snapshotComposer(root: HTMLElement): ComposerSnapshot {
	const base = root.getBoundingClientRect();
	const boxes: Record<string, Box> = {};
	for (const [key, selector] of Object.entries(PARTS)) {
		const el = root.querySelector(selector);
		if (!el) continue;
		const r = el.getBoundingClientRect();
		boxes[key] = { x: r.left - base.left, y: r.top - base.bottom };
	}
	return {
		boxes,
		height: base.height,
		surface: Number.parseFloat(getComputedStyle(root, "::before").height) || base.height,
		bottom: base.bottom,
		expanded: root.dataset.expanded === "true",
	};
}

/**
 * Glides the new layout in from the old one: the footer slides up behind the card to become the tab,
 * the card grows up from its bottom edge, the mode chip reveals from the left, then the send row settles.
 * The layout has already switched; this only plays transforms, height and radius over it.
 */
export function playComposer(
	root: HTMLElement,
	from: ComposerSnapshot,
	to: ComposerSnapshot,
) {
	if (from.expanded === to.expanded) return;
	if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
	const opening = to.expanded;
	const t = tokens(root);
	const timing = {
		duration: opening ? t.open : t.close,
		easing: t.easing,
		fill: "backwards",
	} as const;

	// Keeps the composer's bottom edge where it was, whatever the host does with the extra height.
	const shift = from.bottom - to.bottom;
	if (shift) root.animate([{ translate: `0 ${shift}px` }, { translate: "0 0" }], timing);

	for (const [key, selector] of Object.entries(PARTS)) {
		const el = root.querySelector(selector);
		const prev = from.boxes[key];
		const next = to.boxes[key];
		if (!el || !prev || !next) continue;
		const dx = prev.x - next.x;
		const dy = prev.y - next.y;
		if (!dx && !dy) continue;
		el.animate([{ translate: `${dx}px ${dy}px` }, { translate: "0 0" }], timing);
	}

	const chip = root.querySelector(MODE);
	if (chip && opening) {
		chip.animate(
			[
				{ clipPath: "inset(0 100% 0 0 round 15px)", translate: "-12px 0", opacity: 0 },
				{ clipPath: "inset(0 0 0 0 round 15px)", translate: "0 0", opacity: 1 },
			],
			{ duration: t.chip, delay: CHIP_DELAY, easing: t.easing, fill: "backwards" },
		);
	}

	// Radius starts moving with the height: 26px (half the pill) to the 24px card, and back.
	const surface = [
		{
			height: `${from.surface}px`,
			translate: `0 ${to.height - from.height}px`,
			borderRadius: opening ? "26px" : "24px",
		},
		{
			height: `${to.surface}px`,
			translate: "0 0",
			borderRadius: opening ? "24px" : "26px",
		},
	];
	root.animate(surface, { ...timing, pseudoElement: "::before" });
	root.animate(surface, { ...timing, pseudoElement: "::after" });
}
