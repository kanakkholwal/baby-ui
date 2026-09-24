"use client";

import {
	Children,
	type CSSProperties,
	memo,
	type ReactNode,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { cn } from "../lib/cn";

const CYCLE_INTERVAL_MS = 1600;
const STAGGER_MS = 125;

export interface LogoCarouselProps {
	/** Each child is one logo; distributed round-robin across `columnCount` columns. */
	children: ReactNode;
	columnCount?: number;
	/** Which edge the per-column stagger counts from. */
	direction?: "ltr" | "rtl";
	className?: string;
}

function distribute(logos: ReactNode[], count: number): ReactNode[][] {
	const n = Math.min(count, logos.length);
	const columns: ReactNode[][] = Array.from({ length: n }, () => []);
	logos.forEach((logo, index) => {
		columns[index % n]?.push(logo);
	});
	return columns;
}

function useReducedMotion(): boolean {
	const [reduced, setReduced] = useState(false);
	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(query.matches);
		const onChange = () => setReduced(query.matches);
		query.addEventListener("change", onChange);
		return () => query.removeEventListener("change", onChange);
	}, []);
	return reduced;
}

function usePageVisible(): boolean {
	const [visible, setVisible] = useState(
		() => typeof document === "undefined" || document.visibilityState === "visible",
	);
	useEffect(() => {
		const onChange = () => setVisible(document.visibilityState === "visible");
		document.addEventListener("visibilitychange", onChange);
		return () => document.removeEventListener("visibilitychange", onChange);
	}, []);
	return visible;
}

export function LogoCarousel({
	children,
	columnCount = 4,
	direction = "ltr",
	className,
}: LogoCarouselProps) {
	const logos = useMemo(() => Children.toArray(children), [children]);
	const columns = useMemo(() => distribute(logos, columnCount), [logos, columnCount]);

	const containerRef = useRef<HTMLDivElement>(null);
	const [inView, setInView] = useState(false);
	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => setInView(entry?.isIntersecting ?? false),
			{ rootMargin: "100px" },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const reduced = useReducedMotion();
	const pageVisible = usePageVisible();
	const shouldPlay = inView && pageVisible && !reduced;

	const [indices, setIndices] = useState<number[]>(() => columns.map(() => 0));
	const columnsRef = useRef(columns);
	columnsRef.current = columns;

	useEffect(() => {
		if (!shouldPlay) return;
		const id = setInterval(() => {
			setIndices((prev) =>
				columnsRef.current.map(
					(col, i) => ((prev[i] ?? 0) + 1) % Math.max(1, col.length),
				),
			);
		}, CYCLE_INTERVAL_MS);
		return () => clearInterval(id);
	}, [shouldPlay]);

	return (
		<div
			ref={containerRef}
			data-slot="logo-carousel"
			className={cn("grid", className)}
			style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
		>
			{columns.map((col, i) => (
				<LogoColumn
					key={i}
					logos={col}
					activeIndex={col.length > 0 ? (indices[i] ?? 0) % col.length : 0}
					delayMs={
						reduced ? 0 : (direction === "rtl" ? columns.length - 1 - i : i) * STAGGER_MS
					}
					reduced={reduced}
				/>
			))}
		</div>
	);
}

const LogoColumn = memo(function LogoColumn({
	logos,
	activeIndex,
	delayMs,
	reduced,
}: {
	logos: ReactNode[];
	activeIndex: number;
	delayMs: number;
	reduced: boolean;
}) {
	const [state, setState] = useState(() => ({
		activeIndex,
		prevIndex: null as number | null,
	}));
	if (state.activeIndex !== activeIndex) {
		setState({ activeIndex, prevIndex: reduced ? null : state.activeIndex });
	}
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const style = { "--lc-delay": `${delayMs}ms` } as CSSProperties;

	return (
		<div className="relative overflow-hidden" data-slot="logo-carousel-column">
			{/* Invisible spacer: holds the column's natural height so the absolutely
			    positioned logo below doesn't collapse the grid cell. */}
			<div aria-hidden className="pointer-events-none invisible select-none">
				{logos[0]}
			</div>
			{state.prevIndex !== null ? (
				<span
					key={`exit-${state.prevIndex}`}
					className="logo-carousel-exit absolute inset-0 flex items-center justify-center"
					style={style}
					onAnimationEnd={() =>
						setState((s) =>
							s.prevIndex === state.prevIndex ? { ...s, prevIndex: null } : s,
						)
					}
				>
					{logos[state.prevIndex]}
				</span>
			) : null}
			<span
				key={`enter-${activeIndex}`}
				data-slot="logo-carousel-logo"
				className={cn(
					"absolute inset-0 flex items-center justify-center",
					mounted && "logo-carousel-enter",
				)}
				style={style}
			>
				{logos[activeIndex]}
			</span>
		</div>
	);
});
