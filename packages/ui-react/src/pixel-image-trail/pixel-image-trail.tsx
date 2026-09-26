"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { cn } from "../lib/cn";
import {
	mountPixelTrail,
	type PixelImageTrailSize,
	type PixelImageTrailVariant,
	type PixelTrailOptions,
	pixelImageTrail,
} from "./pixel-trail";

export type { PixelImageTrailSize, PixelImageTrailVariant };

export interface PixelImageTrailProps {
	/** Image revealed square by square under the pointer. */
	src: string;
	/** Accessible description of the image. */
	alt: string;
	/** Edge of one square, in px (at least 12). */
	pixelSize?: number;
	/** Farthest distance, in px, for an occasional satellite square. */
	radius?: number;
	/** Time in ms before a trail square has fully faded. */
	fadeDuration?: number;
	/** Most trail squares kept at once; the oldest drop first. */
	maxPixels?: number;
	/** Dimmed fragments shown before any interaction. */
	initialPixels?: number;
	variant?: PixelImageTrailVariant;
	size?: PixelImageTrailSize;
	className?: string;
	children?: ReactNode;
}

/** A hidden image revealed in square fragments that trail the pointer and fade away. */
export function PixelImageTrail({
	src,
	alt,
	pixelSize = 36,
	radius = 58,
	fadeDuration = 900,
	maxPixels = 84,
	initialPixels = 24,
	variant = "fade",
	size,
	className,
	children,
}: PixelImageTrailProps) {
	const root = useRef<HTMLDivElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);
	const image = useRef<HTMLImageElement>(null);
	const trail = useRef<ReturnType<typeof mountPixelTrail>>(null);
	const s = pixelImageTrail({ variant, size });
	const options: PixelTrailOptions = {
		pixelSize,
		radius,
		fadeDuration,
		maxPixels,
		initialPixels,
		variant,
	};
	const latest = useRef(options);
	latest.current = options;

	useEffect(() => {
		if (!root.current || !canvas.current || !image.current) return;
		trail.current = mountPixelTrail(
			root.current,
			canvas.current,
			image.current,
			latest.current,
		);
		return () => trail.current?.destroy();
	}, []);

	useEffect(() => {
		trail.current?.update(latest.current);
	}, [pixelSize, radius, fadeDuration, maxPixels, initialPixels, variant]);

	return (
		<div ref={root} data-slot="pixel-image-trail" className={cn(s.root(), className)}>
			<img ref={image} src={src} alt={alt} draggable={false} className={s.image()} />
			<canvas ref={canvas} aria-hidden className={s.canvas()} />
			{children ? <div className={s.content()}>{children}</div> : null}
		</div>
	);
}
