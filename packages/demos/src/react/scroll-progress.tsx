"use client";

import { ScrollProgress, type ScrollProgressPosition } from "@baby-ui/react";
import { useRef } from "react";

type Props = Record<string, unknown>;

const SECTIONS = ["Overview", "Install", "Usage", "Props", "Motion", "Accessibility"];

export function ScrollProgressDemo({ props }: { props: Props }) {
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
				position={(props.position as ScrollProgressPosition) ?? "right"}
				tickCount={Number(props.tickCount ?? 40)}
				height={Number(props.height ?? 160)}
				width={Number(props.width ?? 14)}
				showLabel={props.showLabel !== false}
			/>
		</div>
	);
}
