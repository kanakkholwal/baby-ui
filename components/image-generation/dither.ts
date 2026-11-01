const GAP = 10;
const TAU = Math.PI * 2;

export type DitherField = {
	/** Starts or stops the drift; a stopped field keeps its last frame. */
	setRunning(running: boolean): void;
	destroy(): void;
};

/**
 * A grid of dots pushed outward around a slow wandering point, drawn in the canvas's own
 * text colour. A fine pointer inside steers the point; reduced motion draws one still frame.
 */
export function createDitherField(canvas: HTMLCanvasElement): DitherField {
	const context = canvas.getContext("2d");
	const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
	const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
	let width = 0;
	let height = 0;
	let colour = "currentColor";
	let frame = 0;
	let running = false;
	let visible = true;
	const point = { x: 0, y: 0, tx: 0, ty: 0, inside: false };

	const resize = () => {
		const rect = canvas.getBoundingClientRect();
		width = rect.width;
		height = rect.height;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		canvas.width = Math.round(width * dpr);
		canvas.height = Math.round(height * dpr);
		context?.setTransform(dpr, 0, 0, dpr, 0, 0);
		colour = getComputedStyle(canvas).color;
		point.x = point.tx = width / 2;
		point.y = point.ty = height / 2;
		draw(0);
	};

	function draw(time: number) {
		if (!context || !width || !height) return;
		if (!point.inside && !reduce) {
			point.tx = width / 2 + Math.sin(time / 1700) * width * 0.12;
			point.ty = height / 2 + Math.cos(time / 2100) * height * 0.1;
		}
		const follow = reduce ? 1 : point.inside ? 0.16 : 0.045;
		point.x += (point.tx - point.x) * follow;
		point.y += (point.ty - point.y) * follow;

		const radius = Math.min(width, height) * 0.38;
		const columns = Math.ceil(width / GAP) + 1;
		const rows = Math.ceil(height / GAP) + 1;
		const left = (width - (columns - 1) * GAP) / 2;
		const top = (height - (rows - 1) * GAP) / 2;
		context.clearRect(0, 0, width, height);
		context.fillStyle = colour;
		for (let row = 0; row < rows; row++) {
			for (let column = 0; column < columns; column++) {
				const ax = left + column * GAP;
				const ay = top + row * GAP;
				const dx = ax - point.x;
				const dy = ay - point.y;
				const distance = Math.hypot(dx, dy);
				const near = Math.max(0, 1 - distance / radius);
				// Smoothstep, so the swell has no hard edge.
				const pull = near * near * (3 - 2 * near);
				const push = (pull * pull * 9) / (distance || 1);
				context.globalAlpha = 0.17 + pull * 0.72;
				context.beginPath();
				context.arc(ax + dx * push, ay + dy * push, 0.65 + pull * 0.85, 0, TAU);
				context.fill();
			}
		}
		context.globalAlpha = 1;
	}

	const loop = (time: number) => {
		draw(time);
		frame = running && visible && !reduce ? requestAnimationFrame(loop) : 0;
	};
	const kick = () => {
		if (!frame && running && visible && !reduce) frame = requestAnimationFrame(loop);
	};

	const onMove = (event: PointerEvent) => {
		const rect = canvas.getBoundingClientRect();
		point.inside = true;
		point.tx = event.clientX - rect.left;
		point.ty = event.clientY - rect.top;
	};
	const onLeave = () => {
		point.inside = false;
	};
	if (finePointer && !reduce) {
		canvas.addEventListener("pointermove", onMove, { passive: true });
		canvas.addEventListener("pointerleave", onLeave);
	}

	const sized = new ResizeObserver(resize);
	sized.observe(canvas);
	// Offscreen fields stop drawing.
	const seen = new IntersectionObserver(([entry]) => {
		visible = entry?.isIntersecting ?? true;
		kick();
	});
	seen.observe(canvas);
	resize();

	return {
		setRunning(next) {
			running = next;
			kick();
		},
		destroy() {
			cancelAnimationFrame(frame);
			sized.disconnect();
			seen.disconnect();
			canvas.removeEventListener("pointermove", onMove);
			canvas.removeEventListener("pointerleave", onLeave);
		},
	};
}
