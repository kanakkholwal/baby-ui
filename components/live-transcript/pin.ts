/** True while the reader is at, or within `slack` pixels of, the newest line. */
export function isPinned(
	el: { scrollHeight: number; scrollTop: number; clientHeight: number },
	slack = 16,
): boolean {
	return el.scrollHeight - el.scrollTop - el.clientHeight <= slack;
}

export function isOverflowing(el: {
	scrollHeight: number;
	clientHeight: number;
}): boolean {
	return el.scrollHeight > el.clientHeight + 1;
}
