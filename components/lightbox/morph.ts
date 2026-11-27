/** Where a thumbnail sits on screen: the picture flies out of it and lands back in it. */
export type Origin = { rect: DOMRect; radius: number };

/** Measures the thumbnail picture inside `el` (or `el` itself); null when it is not on screen. */
export function readOrigin(el: Element | null | undefined): Origin | null {
	if (!el) return null;
	const target = el.matches("img") ? el : (el.querySelector("img") ?? el);
	const rect = target.getBoundingClientRect();
	if (rect.width === 0 || rect.height === 0) return null;
	const radius = Number.parseFloat(getComputedStyle(target).borderTopLeftRadius) || 0;
	return { rect, radius };
}

function tokens(el: Element) {
	const css = getComputedStyle(el);
	const ms = (name: string, fallback: number) =>
		Number.parseFloat(css.getPropertyValue(name)) || fallback;
	return {
		easing: css.getPropertyValue("--ease-ui-out").trim() || "ease-out",
		open: ms("--duration-slow", 250),
		close: ms("--duration-base", 200),
	};
}

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// The picture scaled and moved to cover the thumbnail, clipped to the thumbnail's box.
function coverFrame(img: HTMLElement, origin: Origin) {
	const to = img.getBoundingClientRect();
	const scale = Math.max(origin.rect.width / to.width, origin.rect.height / to.height);
	const dx = origin.rect.left + origin.rect.width / 2 - (to.left + to.width / 2);
	const dy = origin.rect.top + origin.rect.height / 2 - (to.top + to.height / 2);
	const insetX = Math.max(0, (to.width * scale - origin.rect.width) / 2 / scale);
	const insetY = Math.max(0, (to.height * scale - origin.rect.height) / 2 / scale);
	return {
		transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
		clipPath: `inset(${insetY}px ${insetX}px round ${origin.radius / scale}px)`,
	};
}

const REST_CLIP = "inset(0px round 0px)";

/** Flies the picture from its thumbnail to the stage (`in`) or from the stage back (`out`). */
export function playMorph(img: HTMLElement, origin: Origin, direction: "in" | "out") {
	if (reduced()) return;
	const t = tokens(img);
	const rest = getComputedStyle(img).transform;
	const frame = coverFrame(img, origin);
	const away = { transform: frame.transform, clipPath: frame.clipPath, opacity: 1 };
	const home = { transform: rest, clipPath: REST_CLIP, opacity: 1 };
	img.animate(direction === "in" ? [away, home] : [home, away], {
		duration: direction === "in" ? t.open : t.close,
		easing: t.easing,
		fill: direction === "in" ? "backwards" : "forwards",
	});
}

/** A short slide in the direction of travel when the picture changes. */
export function playSlide(img: HTMLElement, direction: 1 | -1) {
	if (reduced()) return;
	const t = tokens(img);
	const rest = getComputedStyle(img).transform;
	const base = rest === "none" ? "" : rest;
	img.animate(
		[{ transform: `translate(${direction * 48}px, 0px) ${base}` }, { transform: rest }],
		{ duration: t.close, easing: t.easing, fill: "backwards" },
	);
}
