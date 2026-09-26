"use client";

import {
	type CSSProperties,
	type FocusEvent,
	type KeyboardEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import { cn } from "../lib/cn";
import {
	type LayeredStackAspect,
	type LayeredStackColumns,
	type LayeredStackItem,
	layeredStack,
	nextIndex,
	spreadDelay,
	stackOffsets,
	stackRotation,
} from "./variants";

export type { LayeredStackAspect, LayeredStackColumns, LayeredStackItem };

export interface LayeredStackProps {
	items: readonly LayeredStackItem[];
	/** Controlled spread state: true lays cards out in the grid. */
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	/** Largest resting tilt of a stacked card, in degrees. */
	tilt?: number;
	columns?: LayeredStackColumns;
	aspect?: LayeredStackAspect;
	/** Accessible name of the group. */
	label?: string;
	className?: string;
}

/** Cards piled in the centre that fan out into a grid on hover or keyboard focus. */
export function LayeredStack({
	items,
	open: openProp,
	defaultOpen = false,
	onOpenChange,
	tilt = 10,
	columns,
	aspect,
	label = "Card stack",
	className,
}: LayeredStackProps) {
	const root = useRef<HTMLDivElement>(null);
	const [innerOpen, setInnerOpen] = useState(defaultOpen);
	const [offsets, setOffsets] = useState<{ x: number; y: number }[]>([]);
	const [focusIndex, setFocusIndex] = useState(0);
	const hovered = useRef(false);
	const focused = useRef(false);
	const open = openProp ?? innerOpen;
	const s = layeredStack({ columns, aspect, state: open ? "spread" : "stacked" });
	const count = items.length;

	const request = (next: boolean) => {
		if (next === open) return;
		if (openProp === undefined) setInnerOpen(next);
		onOpenChange?.(next);
	};
	const sync = () => request(hovered.current || focused.current);

	useEffect(() => {
		const el = root.current;
		if (!el || count === 0) return;
		const measure = () => setOffsets(stackOffsets(el));
		const resize = new ResizeObserver(measure);
		resize.observe(el);
		return () => resize.disconnect();
	}, [count, columns]);

	const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Escape") return request(false);
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			return request(!open);
		}
		const next = nextIndex(event.key, focusIndex, count);
		if (next === undefined) return;
		event.preventDefault();
		setFocusIndex(next);
		root.current?.querySelectorAll<HTMLElement>("[data-layered-card]")[next]?.focus();
		request(true);
	};

	return (
		// biome-ignore lint/a11y/useSemanticElements: a fieldset would restyle the grid
		<div
			ref={root}
			role="group"
			aria-label={label}
			data-slot="layered-stack"
			data-state={open ? "open" : "closed"}
			className={cn(s.root(), className)}
			onMouseEnter={() => {
				hovered.current = true;
				sync();
			}}
			onMouseLeave={() => {
				hovered.current = false;
				sync();
			}}
			onFocus={() => {
				focused.current = true;
				sync();
			}}
			onBlur={(event: FocusEvent<HTMLDivElement>) => {
				if (event.currentTarget.contains(event.relatedTarget)) return;
				focused.current = false;
				sync();
			}}
			onKeyDown={onKeyDown}
		>
			{items.map((item, i) => (
				<figure
					key={`${item.src}-${i}`}
					data-layered-card=""
					tabIndex={i === focusIndex ? 0 : -1}
					aria-label={item.alt}
					className={s.card()}
					onFocus={() => setFocusIndex(i)}
					style={
						{
							zIndex: 100 - i,
							transitionDelay: open ? `${spreadDelay(i, count)}ms` : "0ms",
							"--layered-x": `${offsets[i]?.x ?? 0}px`,
							"--layered-y": `${offsets[i]?.y ?? 0}px`,
							"--layered-r": `${stackRotation(i, tilt)}deg`,
						} as CSSProperties
					}
				>
					<img src={item.src} alt="" className={s.image()} draggable={false} />
				</figure>
			))}
		</div>
	);
}
