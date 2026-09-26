"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { Spinner } from "../spinner/spinner";
import { type ArtGalleryItem, createGallery } from "./gallery";
import { ART_GALLERY_LABELS, type ArtGalleryLabels } from "./labels";
import { type ArtGalleryLens, artGallery, LENS_STRENGTH } from "./variants";

export type { ArtGalleryItem, ArtGalleryLabels, ArtGalleryLens };

export interface ArtGalleryProps {
	/** Tiles repeat endlessly in both directions; images need CORS headers if remote. */
	items: ArtGalleryItem[];
	/** Cell size in world units; the view is 2 units tall. */
	cellSize?: number;
	/** How far the view pulls back while dragging; 1 disables it. */
	dragZoom?: number;
	lens?: ArtGalleryLens;
	showHint?: boolean;
	labels?: Partial<ArtGalleryLabels>;
	className?: string;
}

export function ArtGallery({
	items,
	cellSize = 0.75,
	dragZoom = 1.25,
	lens = "barrel",
	showHint = true,
	labels,
	className,
}: ArtGalleryProps) {
	const rootRef = useRef<HTMLElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const galleryRef = useRef<ReturnType<typeof createGallery>>(null);
	const [phase, setPhase] = useState<"loading" | "webgl" | "fallback">("loading");
	const l = { ...ART_GALLERY_LABELS, ...labels };
	const s = artGallery({ lens });
	const options = { cellSize, dragZoom, lens: LENS_STRENGTH[lens] };

	useEffect(() => {
		if (!rootRef.current || !canvasRef.current) return;
		setPhase("loading");
		const gallery = createGallery(
			rootRef.current,
			canvasRef.current,
			items,
			options,
			(webgl) => setPhase(webgl ? "webgl" : "fallback"),
		);
		galleryRef.current = gallery;
		return () => gallery.destroy();
		// Options flow through update(); only new items rebuild the atlases.
	}, [items]);

	useEffect(() => {
		galleryRef.current?.update(options);
	});

	return (
		<section
			ref={rootRef}
			data-slot="art-gallery"
			aria-label={l.label}
			aria-roledescription="gallery"
			aria-busy={phase === "loading"}
			// biome-ignore lint/a11y/noNoninteractiveTabindex: focus is how arrow keys pan the grid
			tabIndex={0}
			className={cn(s.root(), className)}
		>
			<ul className="sr-only">
				{items.map((item) => (
					<li key={item.src}>
						{item.title}
						{item.caption ? `, ${item.caption}` : ""}
					</li>
				))}
			</ul>
			<canvas
				ref={canvasRef}
				className={cn(s.canvas(), phase !== "webgl" && "opacity-0")}
			/>
			{phase === "loading" ? (
				<div className={s.status()}>
					<Spinner label={l.loading} />
				</div>
			) : null}
			{phase === "fallback" ? (
				<div className={s.fallback()}>
					{items.map((item) => (
						<figure key={item.src}>
							<img
								src={item.src}
								alt={item.alt ?? item.title}
								className={s.fallbackImage()}
							/>
							<figcaption className={s.fallbackCaption()}>
								<span>{item.title}</span>
								{item.caption ? <span>{item.caption}</span> : null}
							</figcaption>
						</figure>
					))}
				</div>
			) : null}
			{phase === "webgl" && showHint ? (
				<p aria-hidden="true" className={s.hint()}>
					{l.hint}
				</p>
			) : null}
		</section>
	);
}
