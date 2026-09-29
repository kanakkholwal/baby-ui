"use client";

import { ScrollProgress } from "@baby-ui/react";
import { type ComponentProps, useRef } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const SECTIONS = ["Overview", "Install", "Usage", "Props", "Motion", "Accessibility"];

export function ScrollProgressDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ScrollProgress>>(props);
	const box = useRef<HTMLDivElement>(null);
	return (
		<div className="relative h-80 w-full max-w-md overflow-hidden rounded-xl border bg-card">
			<div ref={box} className="h-full overflow-y-auto px-10 py-8">
				{SECTIONS.map((title) => (
					<section key={title} className="mb-10">
						<h3 className="mb-2 font-semibold text-foreground">{title}</h3>
						<p className="text-muted-foreground text-sm leading-relaxed">
							Scroll this panel and the rail on the edge fills tick by tick, with the
							percentage riding along the fill.
						</p>
						<div className="mt-3 h-24 rounded-lg bg-foreground/[0.04]" />
					</section>
				))}
			</div>
			<ScrollProgress
				container={box}
				position={p.position ?? "right"}
				tickCount={Number(p.tickCount ?? 40)}
				height={Number(p.height ?? 160)}
				width={Number(p.width ?? 14)}
				showLabel={p.showLabel !== false}
			/>
		</div>
	);
}
