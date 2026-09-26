"use client";

import {
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
import { MARQUEE_TILES, REEL_ITEMS } from "../data/obsidian";

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
				<div
					key={tile.title}
					className="flex h-32 w-48 flex-col justify-between rounded-2xl border border-border bg-card p-4"
				>
					<span className="font-mono text-[11px] text-muted-foreground uppercase">
						{tile.meta}
					</span>
					<span className="font-medium text-foreground text-lg">{tile.title}</span>
				</div>
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
