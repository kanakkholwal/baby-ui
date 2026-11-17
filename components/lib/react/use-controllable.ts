"use client";

import { useState } from "react";

/** Reads `value` when the caller drives it, else its own state; `set` updates both paths. */
export function useControllable<T>(
	value: T | undefined,
	defaultValue: T,
	onChange?: (next: T) => void,
) {
	const [own, setOwn] = useState(defaultValue);
	const set = (next: T) => {
		if (value === undefined) setOwn(next);
		onChange?.(next);
	};
	return [value ?? own, set] as const;
}
