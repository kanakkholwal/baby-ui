import { Button, InkBloom, type InkBloomSpeed, type InkBloomTone } from "@baby-ui/react";

export function InkBloomDemo({ props = {} }: { props?: Record<string, unknown> }) {
	return (
		<div className="relative h-96 w-full max-w-3xl overflow-hidden rounded-xl border border-border">
			<InkBloom
				position="absolute"
				tone={(props.tone as InkBloomTone) ?? "chart"}
				speed={(props.speed as InkBloomSpeed) ?? "normal"}
				intensity={Number(props.intensity ?? 1)}
				grain={Number(props.grain ?? 0)}
			>
				<div className="flex size-full flex-col items-start justify-end gap-4 p-8">
					<p className="font-medium text-foreground text-xs uppercase tracking-widest">
						Autumn collection
					</p>
					<h2 className="max-w-sm text-balance font-semibold text-3xl text-foreground tracking-tight">
						Slow colour, still water
					</h2>
					<Button>Get started</Button>
				</div>
			</InkBloom>
		</div>
	);
}
