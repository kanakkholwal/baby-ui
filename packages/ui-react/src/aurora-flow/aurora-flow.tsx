"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
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
	const root = useRef<HTMLDivElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);
	const engine = useRef<ReturnType<typeof mountAuroraFlow>>(null);
	const [webgl, setWebgl] = useState(false);
	const s = auroraFlow({ tone, speed, position, webgl });
	const options: AuroraFlowOptions = {
		colors: AURORA_FLOW_COLORS[tone],
		speed: AURORA_FLOW_SPEED[speed],
		intensity,
		grain,
		direction,
		interactive,
	};
	const latest = useRef(options);
	latest.current = options;

	useEffect(() => {
		if (!root.current || !canvas.current) return;
		const mounted = mountAuroraFlow(
			root.current,
			canvas.current,
			latest.current,
			setWebgl,
		);
		engine.current = mounted;
		return () => {
			mounted.destroy();
			engine.current = null;
		};
	}, []);

	useEffect(() => {
		engine.current?.update(latest.current);
	}, [tone, speed, intensity, grain, direction, interactive]);

	return (
		<div ref={root} data-slot="aurora-flow" className={cn(s.root(), className)}>
			<div aria-hidden className={s.fallback()} />
			<canvas ref={canvas} aria-hidden className={s.canvas()} />
			{children ? <div className={s.content()}>{children}</div> : null}
		</div>
	);
}
