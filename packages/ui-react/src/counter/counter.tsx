"use client";

import { useEffect, useRef } from "react";
import { cn } from "../lib/cn";
import { type CounterDirection, type CounterSize, counter } from "./variants";

export type { CounterDirection, CounterSize };

export interface CounterProps {
	/** The number to count toward. Re-animates whenever this changes. */
	value: number;
	/** Formats the displayed number. Defaults to locale-grouped integers. */
	format?: (value: number) => string;
	/** Which way the count runs on its first play: from 0, or down from `value`. */
	direction?: CounterDirection;
	/** How long the count takes, in ms. */
	durationMs?: number;
	/** Delay before the count starts, in ms. */
	delayMs?: number;
	/** Wait until the counter scrolls into view before the first count. */
	triggerOnView?: boolean;
	size?: CounterSize;
	className?: string;
}

function defaultFormat(value: number) {
	return Intl.NumberFormat("en-US").format(Math.round(value));
}

function easeOutCubic(t: number) {
	return 1 - (1 - t) ** 3;
}

export function Counter({
	value,
	format = defaultFormat,
	direction = "up",
	durationMs = 1200,
	delayMs = 0,
	triggerOnView = true,
	size = "md",
	className,
}: CounterProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const fromRef = useRef(direction === "up" ? 0 : value);
	const inViewRef = useRef(!triggerOnView);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		let raf = 0;
		let timeout: ReturnType<typeof setTimeout> | undefined;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		function run() {
			if (!el) return;
			if (reduced) {
				el.textContent = format(value);
				fromRef.current = value;
				return;
			}
			const from = fromRef.current;
			const to = value;
			const start = performance.now();
			function tick(now: number) {
				if (!el) return;
				const t = Math.min(1, (now - start) / durationMs);
				el.textContent = format(from + (to - from) * easeOutCubic(t));
				if (t < 1) {
					raf = requestAnimationFrame(tick);
				} else {
					fromRef.current = to;
				}
			}
			raf = requestAnimationFrame(tick);
		}

		function schedule() {
			if (delayMs > 0) timeout = setTimeout(run, delayMs);
			else run();
		}

		if (inViewRef.current) {
			schedule();
			return () => {
				cancelAnimationFrame(raf);
				clearTimeout(timeout);
			};
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries[0]?.isIntersecting) return;
				inViewRef.current = true;
				schedule();
				observer.disconnect();
			},
			{ rootMargin: "0px" },
		);
		observer.observe(el);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(raf);
			clearTimeout(timeout);
		};
	}, [value, format, durationMs, delayMs]);

	return (
		<span ref={ref} data-slot="counter" className={cn(counter({ size }), className)}>
			{format(direction === "up" ? 0 : value)}
		</span>
	);
}
