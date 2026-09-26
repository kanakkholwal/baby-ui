"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import { cn } from "../lib/cn";
import {
	followScroll,
	type ScrollVelocityDirection,
	type ScrollVelocityLayout,
	type ScrollVelocitySize,
	scrollVelocity,
} from "./variants";

export type { ScrollVelocityDirection, ScrollVelocityLayout, ScrollVelocitySize };

export interface ScrollVelocityProps {
	/** The phrase each row repeats. */
	text: string;
	/** Seconds for one full loop at rest. */
	durationS?: number;
	/** Extra speed per 1000 px/s of scroll, as a multiple of the resting speed. */
	boost?: number;
	/** Copies of `text` in each half of a row; raise it for short phrases on wide screens. */
	repeat?: number;
	layout?: ScrollVelocityLayout;
	direction?: ScrollVelocityDirection;
	size?: ScrollVelocitySize;
	className?: string;
}

/** Marquee rows that drift at rest, speed up with scroll and flip direction with it. */
export function ScrollVelocity({
	text,
	durationS = 30,
	boost = 5,
	repeat = 4,
	layout = "double",
	direction = "left",
	size,
	className,
}: ScrollVelocityProps) {
	const rows = useRef<HTMLDivElement[]>([]);
	const s = scrollVelocity({ layout, direction, size });
	const rowCount = layout === "double" ? 2 : 1;

	useEffect(() => {
		rows.current.length = rowCount;
		return followScroll(rows.current.filter(Boolean), boost);
	}, [boost, rowCount]);

	const half = (key: string) => (
		<div key={key} className={s.half()}>
			{Array.from({ length: repeat }, (_, i) => (
				<span key={i} className={s.item()}>
					{text}
				</span>
			))}
		</div>
	);

	return (
		<div data-slot="scroll-velocity" className={cn(s.root(), className)}>
			<span className={s.srOnly()}>{text}</span>
			{Array.from({ length: rowCount }, (_, r) => {
				const reverse = (r % 2 === 1) !== (direction === "right");
				return (
					<div key={r} aria-hidden className={s.row()}>
						<div
							ref={(el) => {
								if (el) rows.current[r] = el;
							}}
							className={s.track()}
							style={
								{
									"--scroll-velocity-duration": `${durationS}s`,
									animationDirection: reverse ? "reverse" : "normal",
								} as CSSProperties
							}
						>
							{half("a")}
							{half("b")}
						</div>
					</div>
				);
			})}
		</div>
	);
}
