"use client";

import { useEffect, useRef } from "react";
import { cn } from "../lib/cn";
import { type FisheyeGridItem, type FisheyeOptions, mountFisheye } from "./fisheye";
import { FISHEYE_INFINITE_GRID_LABELS, type FisheyeInfiniteGridLabels } from "./labels";
import {
	type FisheyeInfiniteGridSize,
	type FisheyeInfiniteGridVariant,
	fisheyeInfiniteGrid,
} from "./variants";

export type {
	FisheyeGridItem,
	FisheyeInfiniteGridLabels,
	FisheyeInfiniteGridSize,
	FisheyeInfiniteGridVariant,
};

export interface FisheyeInfiniteGridProps {
	/** Tiles repeat endlessly in both directions. */
	items: FisheyeGridItem[];
	/** `card` frames each image with a caption row; `plain` shows bare images. */
	variant?: FisheyeInfiniteGridVariant;
	size?: FisheyeInfiniteGridSize;
	/** Tile size in CSS px at the edge of the lens. */
	tileWidth?: number;
	tileHeight?: number;
	/** Space between tiles in CSS px. */
	gap?: number;
	/** Extra magnification at the centre; 0 is a flat grid. */
	lens?: number;
	/** Momentum kept after a drag, 0 to 0.98. */
	inertia?: number;
	labels?: Partial<FisheyeInfiniteGridLabels>;
	className?: string;
}

/** An endless image grid seen through a fisheye lens; drag with inertia or pan with arrow keys. */
export function FisheyeInfiniteGrid({
	items,
	variant = "card",
	size,
	tileWidth = 150,
	tileHeight = 180,
	gap = 8,
	lens = 0.8,
	inertia = 0.94,
	labels,
	className,
}: FisheyeInfiniteGridProps) {
	const root = useRef<HTMLElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);
	const engine = useRef<ReturnType<typeof mountFisheye>>(null);
	const l = { ...FISHEYE_INFINITE_GRID_LABELS, ...labels };
	const s = fisheyeInfiniteGrid({ variant, size });
	const options: FisheyeOptions = {
		items,
		variant,
		tileWidth,
		tileHeight,
		gap,
		lens,
		inertia,
	};
	const latest = useRef(options);
	latest.current = options;

	useEffect(() => {
		if (!root.current || !canvas.current) return;
		engine.current = mountFisheye(root.current, canvas.current, latest.current);
		return () => engine.current?.destroy();
	}, []);

	useEffect(() => {
		engine.current?.update(latest.current);
	}, [items, variant, tileWidth, tileHeight, gap, lens, inertia]);

	return (
		<section
			ref={root}
			data-slot="fisheye-infinite-grid"
			data-dragging="false"
			aria-label={l.label}
			aria-roledescription="gallery"
			// biome-ignore lint/a11y/noNoninteractiveTabindex: focus is how arrow keys pan the grid
			tabIndex={0}
			className={cn(s.root(), className)}
		>
			<ul className="sr-only">
				{items.map((item, index) => (
					<li key={index}>
						{item.title ? `${item.title}: ` : ""}
						{item.alt}
						{item.caption ? `, ${item.caption}` : ""}
					</li>
				))}
			</ul>
			<canvas ref={canvas} aria-hidden className={s.canvas()} />
			<div aria-hidden className={s.vignette()} />
		</section>
	);
}
