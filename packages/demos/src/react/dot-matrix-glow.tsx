"use client";

import {
	Button,
	DotMatrixGlow,
	type DotMatrixGlowShape,
	type DotMatrixGlowSize,
	type DotMatrixGlowTone,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function DotMatrixGlowDemo({ props }: { props: Props }) {
	return (
		<div className="relative h-96 w-full max-w-3xl overflow-hidden rounded-xl border border-border">
			<DotMatrixGlow
				position="absolute"
				shape={(props.shape as DotMatrixGlowShape) ?? "dot"}
				size={(props.size as DotMatrixGlowSize) ?? "md"}
				tone={(props.tone as DotMatrixGlowTone) ?? "primary"}
				glowRadius={Number(props.glowRadius ?? 160)}
				ripple={props.ripple !== false}
				ambient={props.ambient === true}
			>
				<div className="flex size-full flex-col items-center justify-center gap-5 px-6 text-center">
					<p className="font-medium text-muted-foreground text-xs uppercase tracking-widest">
						Observability for AI agents
					</p>
					<h2 className="max-w-md text-balance font-semibold text-3xl text-foreground tracking-tight">
						See every step your agents take
					</h2>
					<div className="flex gap-3">
						<Button>Start free trial</Button>
						<Button variant="outline">Book a demo</Button>
					</div>
				</div>
			</DotMatrixGlow>
		</div>
	);
}
