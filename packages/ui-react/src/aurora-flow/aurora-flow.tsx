"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { useCanvasEngine } from "../lib/use-canvas-engine";
import { type AuroraFlowOptions, mountAuroraFlow } from "./aurora";
import {
	AURORA_FLOW_COLORS,
	AURORA_FLOW_SPEED,
	type AuroraFlowPosition,
	type AuroraFlowSpeed,
	type AuroraFlowTone,
	auroraFlow,
} from "./variants";

export type { AuroraFlowPosition, AuroraFlowSpeed, AuroraFlowTone };

export interface AuroraFlowProps {
	tone?: AuroraFlowTone;
	speed?: AuroraFlowSpeed;
	position?: AuroraFlowPosition;
	/** Veil and light strength, 0 to 2. */
	intensity?: number;
	/** Film grain, 0 to 1. */
	grain?: number;
	/** Flow direction in degrees. */
	direction?: number;
	/** Veils bend toward the pointer. */
	interactive?: boolean;
	className?: string;
	children?: ReactNode;
}

/** Layered silk veils drifting in a WebGL field, coloured from theme tokens. */
export function AuroraFlow({
	tone = "chart",
	speed = "normal",
	position = "absolute",
	intensity = 1,
	grain = 0.22,
	direction = -18,
	interactive = true,
	className,
	children,
}: AuroraFlowProps) {
	const options: AuroraFlowOptions = {
		colors: AURORA_FLOW_COLORS[tone],
		speed: AURORA_FLOW_SPEED[speed],
		intensity,
		grain,
		direction,
		interactive,
	};
	const { root, canvas, webgl } = useCanvasEngine(mountAuroraFlow, options, [
		tone,
		speed,
		intensity,
		grain,
		direction,
		interactive,
	]);
	const s = auroraFlow({ tone, speed, position, webgl });

	return (
		<div ref={root} data-slot="aurora-flow" className={cn(s.root(), className)}>
			<div aria-hidden className={s.fallback()} />
			<canvas ref={canvas} aria-hidden className={s.canvas()} />
			{children ? <div className={s.content()}>{children}</div> : null}
		</div>
	);
}
