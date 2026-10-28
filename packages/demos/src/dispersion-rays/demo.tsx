import {
	Button,
	DispersionRays,
	type DispersionRaysSpeed,
	type DispersionRaysTone,
} from "@baby-ui/react";

export function DispersionRaysDemo({ props = {} }: { props?: Record<string, unknown> }) {
	return (
		<div className="relative h-96 w-full max-w-3xl overflow-hidden rounded-xl border border-border">
			<DispersionRays
				position="absolute"
				tone={(props.tone as DispersionRaysTone) ?? "chart"}
				speed={(props.speed as DispersionRaysSpeed) ?? "normal"}
				intensity={Number(props.intensity ?? 1)}
				grain={Number(props.grain ?? 0)}
			>
				<div className="flex size-full flex-col items-start justify-end gap-4 p-8">
					<p className="font-medium text-foreground text-xs uppercase tracking-widest">
						Launch week, day 3
					</p>
					<h2 className="max-w-sm text-balance font-semibold text-3xl text-foreground tracking-tight">
						Everything, split into colour
					</h2>
					<Button>Get started</Button>
				</div>
			</DispersionRays>
		</div>
	);
}
