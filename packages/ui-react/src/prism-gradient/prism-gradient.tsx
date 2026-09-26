"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { mountPrismGradient, type PrismGradientOptions } from "./prism";
import {
	PRISM_GRADIENT_COLORS,
	PRISM_GRADIENT_SPEED,
	type PrismGradientPosition,
	type PrismGradientSpeed,
	type PrismGradientTone,
	prismGradient,
} from "./variants";

export type { PrismGradientPosition, PrismGradientSpeed, PrismGradientTone };

export interface PrismGradientProps {
	tone?: PrismGradientTone;
	speed?: PrismGradientSpeed;
	position?: PrismGradientPosition;
	/** Film grain, 0 to 1. */
	grain?: number;
	className?: string;
	children?: ReactNode;
}

/** Swirled prism bands in a WebGL field, coloured from theme tokens. */
export function PrismGradient({
	tone = "chart",
	speed = "normal",
	position = "absolute",
	grain = 0,
	className,
	children,
}: PrismGradientProps) {
	const root = useRef<HTMLDivElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);
	const engine = useRef<ReturnType<typeof mountPrismGradient>>(null);
	const [webgl, setWebgl] = useState(false);
	const s = prismGradient({ tone, speed, position, webgl });
	const options: PrismGradientOptions = {
		colors: PRISM_GRADIENT_COLORS[tone],
		speed: PRISM_GRADIENT_SPEED[speed],
		grain,
	};
	const latest = useRef(options);
	latest.current = options;

	useEffect(() => {
		if (!root.current || !canvas.current) return;
		const mounted = mountPrismGradient(
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
	}, [tone, speed, grain]);

	return (
		<div ref={root} data-slot="prism-gradient" className={cn(s.root(), className)}>
			<div aria-hidden className={s.fallback()} />
			<canvas ref={canvas} aria-hidden className={s.canvas()} />
			{children ? <div className={s.content()}>{children}</div> : null}
		</div>
	);
}
