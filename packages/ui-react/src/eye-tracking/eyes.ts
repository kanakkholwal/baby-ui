export type EyeTrackingOptions = {
	/** How far the iris may travel toward the rim, 0 to 1. */
	pupilRange: number;
	/** Pupils widen as the pointer nears. */
	reactivePupil: boolean;
};

const EYE = '[data-slot="eye-tracking-eye"]';
const VARS = ["--et-x", "--et-y", "--et-r", "--et-p"];

function pupilScale(distance: number) {
	if (distance < 200) return 1.3 - (distance / 200) * 0.3;
	return 1 - (Math.min(distance - 200, 600) / 600) * 0.15;
}

/** Points every eye in `root` at the pointer by writing CSS variables; CSS eases them. */
export function mountEyeTracking(root: HTMLElement, initial: EyeTrackingOptions) {
	let opts = initial;
	const reduced = matchMedia("(prefers-reduced-motion: reduce)");
	let pointer: { x: number; y: number } | null = null;
	let visible = true;
	let frame = 0;

	const eyes = () => Array.from(root.querySelectorAll<HTMLElement>(EYE));

	const clear = () => {
		for (const eye of eyes()) for (const name of VARS) eye.style.removeProperty(name);
	};

	const paint = () => {
		frame = 0;
		if (!pointer || reduced.matches) return;
		const range = Math.min(1, Math.max(0, opts.pupilRange));
		for (const eye of eyes()) {
			const rect = eye.getBoundingClientRect();
			const dx = pointer.x - (rect.left + rect.width / 2);
			const dy = pointer.y - (rect.top + rect.height / 2);
			const distance = Math.hypot(dx, dy);
			const max = rect.width * 0.275 * range;
			const reach = Math.max(max * 3, 1);
			const offset = (Math.min(distance, reach) / reach) * max;
			const angle = Math.atan2(dy, dx);
			const x = Math.cos(angle) * offset;
			eye.style.setProperty("--et-x", `${x.toFixed(2)}px`);
			eye.style.setProperty("--et-y", `${(Math.sin(angle) * offset).toFixed(2)}px`);
			eye.style.setProperty("--et-r", `${max > 0 ? ((x / max) * 15).toFixed(2) : 0}deg`);
			eye.style.setProperty(
				"--et-p",
				opts.reactivePupil ? pupilScale(distance).toFixed(3) : "1",
			);
		}
	};

	const schedule = () => {
		if (!frame && visible && !reduced.matches) frame = requestAnimationFrame(paint);
	};

	const onMove = (e: PointerEvent) => {
		pointer = { x: e.clientX, y: e.clientY };
		schedule();
	};

	const onReduced = () => {
		if (reduced.matches) clear();
		else schedule();
	};

	const seen = new IntersectionObserver(([entry]) => {
		visible = entry?.isIntersecting ?? true;
		schedule();
	});
	seen.observe(root);
	reduced.addEventListener("change", onReduced);
	window.addEventListener("pointermove", onMove, { passive: true });
	window.addEventListener("scroll", schedule, { passive: true, capture: true });

	return {
		update(next: EyeTrackingOptions) {
			opts = next;
			schedule();
		},
		destroy() {
			cancelAnimationFrame(frame);
			seen.disconnect();
			reduced.removeEventListener("change", onReduced);
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("scroll", schedule, { capture: true });
		},
	};
}
