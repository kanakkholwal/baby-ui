/** A mounted demo's claim on the pool; `release` unmounts it. */
export type LiveSlot = { visible: boolean; release: () => void };

// Bounded pool of mounted demos. Past the cap, the oldest off-screen demo gives up its slot,
// so scrolling never keeps more than a screenful of live demos.
const pool: LiveSlot[] = [];

export function claim(slot: LiveSlot) {
	pool.push(slot);
	const cap = matchMedia("(hover: hover)").matches ? 12 : 4;
	while (pool.length > cap) {
		const i = pool.findIndex((s) => !s.visible);
		const [evicted] = pool.splice(i === -1 ? 0 : i, 1);
		evicted?.release();
	}
}

export function drop(slot: LiveSlot) {
	const i = pool.indexOf(slot);
	if (i !== -1) pool.splice(i, 1);
}

// Safari has no requestIdleCallback.
const onIdle = (cb: () => void) =>
	typeof requestIdleCallback === "function"
		? requestIdleCallback(cb, { timeout: 1000 })
		: window.setTimeout(cb, 1);
const offIdle = (id: number) =>
	typeof cancelIdleCallback === "function"
		? cancelIdleCallback(id)
		: window.clearTimeout(id);

/** Calls `activate` once `el` rests in view for 300ms and the browser is idle, so a fast
 * scroll mounts nothing; calls `deactivate` once it is far out of view. Returns a cleanup. */
export function watchLive(
	el: HTMLElement,
	slot: LiveSlot,
	activate: () => void,
	deactivate: () => void,
): () => void {
	let timer: number | undefined;
	let idle: number | undefined;
	const cancel = () => {
		window.clearTimeout(timer);
		if (idle !== undefined) offIdle(idle);
		idle = undefined;
	};
	const seen = new IntersectionObserver(
		([entry]) => {
			slot.visible = Boolean(entry?.isIntersecting);
			cancel();
			if (!slot.visible) return;
			timer = window.setTimeout(() => (idle = onIdle(activate)), 300);
		},
		{ threshold: 0.25 },
	);
	const far = new IntersectionObserver(
		([entry]) => {
			if (entry?.isIntersecting) return;
			deactivate();
			drop(slot);
		},
		{ rootMargin: "600px 0px" },
	);
	seen.observe(el);
	far.observe(el);
	return () => {
		cancel();
		seen.disconnect();
		far.disconnect();
		drop(slot);
	};
}
