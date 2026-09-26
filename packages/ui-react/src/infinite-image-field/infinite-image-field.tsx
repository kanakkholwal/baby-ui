"use client";

import { useEffect, useRef } from "react";
import { cn } from "../lib/cn";
import { type FieldOptions, mountField } from "./field";
import { INFINITE_IMAGE_FIELD_LABELS, type InfiniteImageFieldLabels } from "./labels";
import {
	type InfiniteImageFieldLayout,
	type InfiniteImageFieldShape,
	type InfiniteImageFieldSize,
	infiniteImageField,
} from "./variants";

export type {
	InfiniteImageFieldLabels,
	InfiniteImageFieldLayout,
	InfiniteImageFieldShape,
	InfiniteImageFieldSize,
};

export interface InfiniteImageFieldProps {
	/** Image URLs; each cell always shows the same one. */
	images: string[];
	shape?: InfiniteImageFieldShape;
	/** `staggered` offsets every other column by half a tile. */
	layout?: InfiniteImageFieldLayout;
	size?: InfiniteImageFieldSize;
	/** Tile size in CSS px. */
	imageWidth?: number;
	imageHeight?: number;
	/** Space between tiles in CSS px. */
	gap?: number;
	/** Top drift speed in CSS px per frame at 60fps. */
	maxSpeed?: number;
	/** How quickly the drift follows the pointer, 0 to 1 per frame. */
	smoothing?: number;
	labels?: Partial<InfiniteImageFieldLabels>;
	className?: string;
}

/** An endless field of images that drifts toward whichever side of the centre the pointer is on. */
export function InfiniteImageField({
	images,
	shape = "rounded",
	layout = "grid",
	size,
	imageWidth = 160,
	imageHeight = 220,
	gap = 24,
	maxSpeed = 5,
	smoothing = 0.07,
	labels,
	className,
}: InfiniteImageFieldProps) {
	const root = useRef<HTMLElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);
	const engine = useRef<ReturnType<typeof mountField>>(null);
	const l = { ...INFINITE_IMAGE_FIELD_LABELS, ...labels };
	const s = infiniteImageField({ shape, layout, size });
	const options: FieldOptions = {
		images,
		shape,
		layout,
		imageWidth,
		imageHeight,
		gap,
		maxSpeed,
		smoothing,
	};
	const latest = useRef(options);
	latest.current = options;

	useEffect(() => {
		if (!root.current || !canvas.current) return;
		engine.current = mountField(root.current, canvas.current, latest.current);
		return () => engine.current?.destroy();
	}, []);

	useEffect(() => {
		engine.current?.update(latest.current);
	}, [images, shape, layout, imageWidth, imageHeight, gap, maxSpeed, smoothing]);

	return (
		<section
			ref={root}
			data-slot="infinite-image-field"
			aria-label={l.label}
			// biome-ignore lint/a11y/noNoninteractiveTabindex: focus is how arrow keys drift the field
			tabIndex={0}
			className={cn(s.root(), className)}
		>
			<canvas ref={canvas} aria-hidden className={s.canvas()} />
		</section>
	);
}
