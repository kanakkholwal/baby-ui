"use client";

import {
	HoverTransition,
	type HoverTransitionDirection,
	type HoverTransitionEffect,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function HoverTransitionDemo({ props }: { props: Props }) {
	return (
		<HoverTransition
			effect={(props.effect as HoverTransitionEffect) ?? "wipe"}
			direction={(props.direction as HoverTransitionDirection) ?? "right"}
			durationMs={Number(props.durationMs ?? 720)}
			tilt={(props.tilt as boolean) ?? true}
			label={(props.label as string) || "Hover to reveal more"}
			className="aspect-4/5 w-full max-w-xs rounded-3xl border border-border"
			hoverContent={
				<div className="flex size-full flex-col justify-between bg-primary p-6 text-primary-foreground">
					<p className="font-medium text-xl leading-tight tracking-tight">
						Turning complex product ideas into clear, expressive experiences.
					</p>
					<div>
						<p className="font-semibold">Maya Chen</p>
						<p className="mt-1 text-xs uppercase tracking-widest opacity-70">
							Product designer
						</p>
					</div>
				</div>
			}
		>
			<div className="relative flex size-full flex-col justify-end bg-card text-card-foreground">
				<img
					src="https://picsum.photos/id/64/640/800"
					alt=""
					className="absolute inset-0 size-full object-cover"
				/>
				<div className="relative bg-linear-to-t from-background/90 to-transparent p-6 pt-16">
					<p className="font-medium text-2xl tracking-tight">Maya Chen</p>
					<p className="mt-1 text-muted-foreground text-sm">Hover or focus the card</p>
				</div>
			</div>
		</HoverTransition>
	);
}
