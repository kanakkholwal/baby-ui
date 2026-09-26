"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { type ClosingPlasmaOptions, mountClosingPlasma } from "./plasma";
import {
	CLOSING_PLASMA_COLORS,
	CLOSING_PLASMA_SPEED,
	type ClosingPlasmaPosition,
	type ClosingPlasmaSpeed,
	type ClosingPlasmaTone,
	closingPlasma,
} from "./variants";

export type { ClosingPlasmaPosition, ClosingPlasmaSpeed, ClosingPlasmaTone };

export interface ClosingPlasmaProps {
	tone?: ClosingPlasmaTone;
	speed?: ClosingPlasmaSpeed;
	position?: ClosingPlasmaPosition;
	/** Noise frequency growth per octave, 0 to 2. */
	turbulence?: number;
	/** Sparkle strength, 0 to 2. */
	sparkle?: number;
	/** Film grain, 0 to 2. */
	grain?: number;
	/** The field leans toward the pointer. */
	interactive?: boolean;
	className?: string;
	children?: ReactNode;
}

/** A ridged simplex plasma in WebGL that follows the theme between dark and light. */
export function ClosingPlasma({
	tone = "chart",
	speed = "normal",
	position = "absolute",
	turbulence = 1,
	sparkle = 1,
	grain = 1,
	interactive = true,
	className,
	children,
}: ClosingPlasmaProps) {
	const root = useRef<HTMLDivElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);
	const engine = useRef<ReturnType<typeof mountClosingPlasma>>(null);
	const [webgl, setWebgl] = useState(false);
	const s = closingPlasma({ tone, speed, position, webgl });
	const options: ClosingPlasmaOptions = {
		colors: CLOSING_PLASMA_COLORS[tone],
		speed: CLOSING_PLASMA_SPEED[speed],
		turbulence,
		sparkle,
		grain,
		interactive,
	};
	const latest = useRef(options);
	latest.current = options;

	useEffect(() => {
		if (!root.current || !canvas.current) return;
		const mounted = mountClosingPlasma(
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
	}, [tone, speed, turbulence, sparkle, grain, interactive]);

	return (
		<div ref={root} data-slot="closing-plasma" className={cn(s.root(), className)}>
			<div aria-hidden className={s.fallback()} />
			<canvas ref={canvas} aria-hidden className={s.canvas()} />
			{children ? <div className={s.content()}>{children}</div> : null}
		</div>
	);
}
