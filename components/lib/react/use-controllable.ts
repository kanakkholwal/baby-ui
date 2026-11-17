"use client";

import { useState } from "react";

/**
 * Reads `value` when the caller drives it (any value but `undefined`, so `null` counts),
 * else its own state; `set` updates the state and notifies, forwarding any extra arguments.
 */
export function useControllable<T, A extends unknown[] = []>(
	value: T | undefined,
	defaultValue: T,
	onChange?: (next: T, ...extra: A) => void,
) {
	const [own, setOwn] = useState(defaultValue);
	const set = (next: T, ...extra: A) => {
		if (value === undefined) setOwn(next);
		onChange?.(next, ...extra);
	};
	return [value === undefined ? own : value, set] as const;
}
