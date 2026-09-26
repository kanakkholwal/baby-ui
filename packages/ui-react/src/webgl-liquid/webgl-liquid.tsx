"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { mountWebglLiquid, type WebglLiquidOptions } from "./liquid";
import {
	WEBGL_LIQUID_COLORS,
	WEBGL_LIQUID_SPEED,
	type WebglLiquidPosition,
	type WebglLiquidSpeed,
	type WebglLiquidTone,
	webglLiquid,
} from "./variants";

export type { WebglLiquidPosition, WebglLiquidSpeed, WebglLiquidTone };

export interface WebglLiquidProps {
	tone?: WebglLiquidTone;
	speed?: WebglLiquidSpeed;
	position?: WebglLiquidPosition;
	/** Large-scale flow and glow strength, 0 to 2. */
	flow?: number;
	/** Dither amount, 0 to 0.2. */
	grain?: number;
	/** Sweep the field in from the left the first time it is on screen. */
	reveal?: boolean;
	className?: string;
	children?: ReactNode;
}

/** A rising liquid field that fades up into the surface, drawn in WebGL from theme tokens. */
export function WebglLiquid({
	tone = "ocean",
	speed = "normal",
	position = "absolute",
	flow = 1,
	grain = 0.05,
	reveal = true,
	className,
	children,
}: WebglLiquidProps) {
	const root = useRef<HTMLDivElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);
	const engine = useRef<ReturnType<typeof mountWebglLiquid>>(null);
	const [webgl, setWebgl] = useState(false);
	const s = webglLiquid({ tone, speed, position, webgl });
	const options: WebglLiquidOptions = {
		colors: WEBGL_LIQUID_COLORS[tone],
		speed: WEBGL_LIQUID_SPEED[speed],
		flow,
		grain,
		reveal,
	};
	const latest = useRef(options);
	latest.current = options;

	useEffect(() => {
		if (!root.current || !canvas.current) return;
		const mounted = mountWebglLiquid(
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
	}, [tone, speed, flow, grain, reveal]);

	return (
		<div ref={root} data-slot="webgl-liquid" className={cn(s.root(), className)}>
			<div aria-hidden className={s.fallback()} />
			<canvas ref={canvas} aria-hidden className={s.canvas()} />
			{children ? <div className={s.content()}>{children}</div> : null}
		</div>
	);
}
