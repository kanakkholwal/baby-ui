"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { createReel } from "./reel";
import { type TextReelSize, textReel } from "./variants";

export type { TextReelSize };

export interface TextReelProps {
	items: string[];
	/** Small caption above the reel. */
	prefix?: string;
	/** Drift in px per frame while the page is still; scrolling boosts and steers it. */
	speed?: number;
	paused?: boolean;
	size?: TextReelSize;
	className?: string;
}

export function TextReel({
	items,
	prefix,
	speed = 0.6,
	paused = false,
	size = "md",
	className,
}: TextReelProps) {
	const viewportRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const reelRef = useRef<ReturnType<typeof createReel>>(null);
	const [copies, setCopies] = useState(2);
	const s = textReel({ size });

	useEffect(() => {
		if (!viewportRef.current || !trackRef.current) return;
		const reel = createReel(viewportRef.current, trackRef.current, {
			speed,
			paused,
			onCopies: setCopies,
		});
		reelRef.current = reel;
		return () => reel.destroy();
		// Speed and pause flow through update(); recreating would reset the reel's position.
	}, [items]);

	useEffect(() => {
		reelRef.current?.update({ speed, paused, onCopies: setCopies });
	}, [speed, paused]);

	return (
		<div data-slot="text-reel" className={cn(s.root(), className)}>
			{prefix ? <p className={s.prefix()}>{prefix}</p> : null}
			<div ref={viewportRef} className={s.viewport()}>
				<div ref={trackRef} className={s.track()}>
					{Array.from({ length: copies }, (_, copy) => (
						<div key={copy} aria-hidden={copy > 0 || undefined} className={s.copy()}>
							{items.map((item, i) => (
								<div key={i} className={s.item()}>
									{item}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
