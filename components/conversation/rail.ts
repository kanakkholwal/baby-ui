export type RailState = { count: number; active: number };

const MESSAGE = '[data-slot="message"]';

/**
 * Tracks the messages inside a conversation viewport: how many there are and which one is
 * reading now (the last whose top has passed a third of the way down).
 */
export function createRail(viewport: HTMLElement, onChange: (state: RailState) => void) {
	let state: RailState = { count: 0, active: -1 };
	let frame = 0;
	const messages = () => [...viewport.querySelectorAll<HTMLElement>(MESSAGE)];

	const read = () => {
		frame = 0;
		const list = messages();
		const line = viewport.getBoundingClientRect().top + viewport.clientHeight / 3;
		let active = list.length ? 0 : -1;
		list.forEach((el, i) => {
			if (el.getBoundingClientRect().top <= line) active = i;
		});
		// The bottom of the log always reads as the last message.
		if (viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop < 2)
			active = list.length - 1;
		if (active === state.active && list.length === state.count) return;
		state = { count: list.length, active };
		onChange(state);
	};
	const schedule = () => {
		if (!frame) frame = requestAnimationFrame(read);
	};

	const mutations = new MutationObserver(schedule);
	mutations.observe(viewport, { childList: true, subtree: true });
	viewport.addEventListener("scroll", schedule, { passive: true });
	read();

	return {
		/** Scrolls message `index` to the top of the viewport. */
		jump(index: number) {
			const target = messages()[index];
			if (!target) return;
			const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
			const top =
				target.getBoundingClientRect().top -
				viewport.getBoundingClientRect().top +
				viewport.scrollTop -
				16;
			viewport.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
		},
		destroy() {
			cancelAnimationFrame(frame);
			mutations.disconnect();
			viewport.removeEventListener("scroll", schedule);
		},
	};
}
