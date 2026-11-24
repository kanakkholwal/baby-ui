"use client";

import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useCanvasEngine } from "../../lib/react/use-canvas-engine";
import { type LightRaysOptions, mountLightRays } from "../rays";
import {
	LIGHT_RAYS_COLORS,
	LIGHT_RAYS_COUNT,
	LIGHT_RAYS_FIELD,
	LIGHT_RAYS_SPEED,
	type LightRaysPosition,
	type LightRaysSpeed,
	type LightRaysTone,
	type LightRaysVariant,
	lightRays,
} from "../variants";

export type { LightRaysPosition, LightRaysSpeed, LightRaysTone, LightRaysVariant };

export interface LightRaysProps {
	variant?: LightRaysVariant;
	tone?: LightRaysTone;
	speed?: LightRaysSpeed;
	position?: LightRaysPosition;
	/** Beam strength, 0 to 2. */
	intensity?: number;
	/** Beams alive at once, 1 to 64. Defaults per variant. */
	count?: number;
	/** Reshuffles beam positions, widths and phases. */
	seed?: number;
	className?: string;
	children?: ReactNode;
}

/** Vertical shafts of light that fade up, hold and fade out, drawn in WebGL from theme tokens. */
export function LightRays({
	variant = "soft",
	tone = "primary",
	speed = "normal",
	position = "absolute",
	intensity = 1,
	count,
	seed = 34,
	className,
	children,
}: LightRaysProps) {
	const options: LightRaysOptions = {
		colors: LIGHT_RAYS_COLORS[tone],
		speed: LIGHT_RAYS_SPEED[speed],
		intensity,
		count: count ?? LIGHT_RAYS_COUNT[variant],
		seed,
		field: LIGHT_RAYS_FIELD[variant],
	};
	const { root, canvas, webgl } = useCanvasEngine(mountLightRays, options, [
		variant,
		tone,
		speed,
		intensity,
		count,
		seed,
	]);
	const s = lightRays({ variant, tone, speed, position, webgl });

	return (
		<div
			ref={root}
			data-slot="light-rays"
			data-variant={variant}
			className={cn(s.root(), className)}
		>
			<canvas ref={canvas} aria-hidden className={s.canvas()} />
			{children ? <div className={s.content()}>{children}</div> : null}
		</div>
	);
}
