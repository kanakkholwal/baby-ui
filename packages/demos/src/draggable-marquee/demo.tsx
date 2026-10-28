"use client";

import { DraggableMarquee } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { MARQUEE_TILES } from "../data/obsidian";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function DraggableMarqueeDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof DraggableMarquee>>(props);
	return (
		<DraggableMarquee
			speed={Number(p.speed ?? 1)}
			direction={p.direction ?? "left"}
			gap={p.gap ?? "md"}
			pauseOnHover={p.pauseOnHover ?? false}
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
