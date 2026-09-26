"use client";

import {
	ArtGallery,
	type ArtGalleryLens,
	ClickSpark,
	type ClickSparkTone,
	CubeText,
	type CubeTextSize,
	type CubeTextStagger,
	DraggableMarquee,
	type DraggableMarqueeDirection,
	type DraggableMarqueeGap,
	TextReel,
	type TextReelSize,
} from "@baby-ui/react";
import { GALLERY_ITEMS, MARQUEE_TILES, REEL_ITEMS } from "../data/obsidian";

type Props = Record<string, unknown>;

export function CubeTextDemo({ props }: { props: Props }) {
	return (
		<CubeText
			text={(props.text as string) || "Baby UI"}
			durationMs={Number(props.durationMs ?? 2200)}
			delayMs={Number(props.delayMs ?? 0)}
			loop={(props.loop as boolean) ?? true}
			stagger={(props.stagger as CubeTextStagger) ?? "wave"}
			size={(props.size as CubeTextSize) ?? "md"}
		/>
	);
}

export function TextReelDemo({ props }: { props: Props }) {
	return (
		<TextReel
			items={REEL_ITEMS}
			prefix={(props.prefix as string) || "We"}
			speed={Number(props.speed ?? 0.6)}
			paused={(props.paused as boolean) ?? false}
			size={(props.size as TextReelSize) ?? "md"}
			className="w-full"
		/>
	);
}

export function DraggableMarqueeDemo({ props }: { props: Props }) {
	return (
		<DraggableMarquee
			speed={Number(props.speed ?? 1)}
			direction={(props.direction as DraggableMarqueeDirection) ?? "left"}
			gap={(props.gap as DraggableMarqueeGap) ?? "md"}
			pauseOnHover={(props.pauseOnHover as boolean) ?? false}
		>
			{MARQUEE_TILES.map((tile) => (
				<figure key={tile.title} className="w-56">
					<img
						src={tile.src}
						alt={tile.title}
						loading="lazy"
						className="aspect-[3/2] w-full rounded-2xl border border-border object-cover"
					/>
					<figcaption className="mt-2 flex justify-between text-sm">
						<span className="font-medium text-foreground">{tile.title}</span>
						<span className="text-muted-foreground">{tile.meta}</span>
					</figcaption>
				</figure>
			))}
		</DraggableMarquee>
	);
}

export function ClickSparkDemo({ props }: { props: Props }) {
	return (
		<div className="relative grid h-56 w-full max-w-md place-items-center overflow-hidden rounded-2xl border border-border border-dashed text-muted-foreground text-sm">
			Click anywhere in here
			<ClickSpark
				scope="parent"
				tone={(props.tone as ClickSparkTone) ?? "foreground"}
				count={Number(props.count ?? 8)}
				size={Number(props.size ?? 10)}
				radius={Number(props.radius ?? 15)}
				durationMs={Number(props.durationMs ?? 400)}
			/>
		</div>
	);
}

export function ArtGalleryDemo({ props }: { props: Props }) {
	return (
		<ArtGallery
			items={GALLERY_ITEMS}
			lens={(props.lens as ArtGalleryLens) ?? "barrel"}
			cellSize={Number(props.cellSize ?? 0.75)}
			dragZoom={Number(props.dragZoom ?? 1.25)}
			showHint={(props.showHint as boolean) ?? true}
		/>
	);
}
