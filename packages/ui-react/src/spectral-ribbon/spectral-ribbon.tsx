"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { mountSpectralRibbon, type SpectralRibbonOptions } from "./ribbon";
import {
	SPECTRAL_RIBBON_COLORS,
	SPECTRAL_RIBBON_SPEED,
	type SpectralRibbonPosition,
	type SpectralRibbonSpeed,
	type SpectralRibbonTone,
	spectralRibbon,
} from "./variants";

export type { SpectralRibbonPosition, SpectralRibbonSpeed, SpectralRibbonTone };

export interface SpectralRibbonProps {
	tone?: SpectralRibbonTone;
	speed?: SpectralRibbonSpeed;
	position?: SpectralRibbonPosition;
	/** Ribbon brightness, 0.25 to 2. */
	intensity?: number;
	/** Ribbon thickness, 0.5 to 2. */
	thickness?: number;
	/** Film grain, 0 to 1. */
	grain?: number;
	className?: string;
	children?: ReactNode;
}

/** A soft light trail with a prismatic fringe, drawn in WebGL from theme tokens. */
export function SpectralRibbon({
	tone = "spectrum",
	speed = "normal",
	position = "absolute",
	intensity = 1,
	thickness = 1,
	grain = 0.45,
	className,
	children,
}: SpectralRibbonProps) {
	const root = useRef<HTMLDivElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);
	const engine = useRef<ReturnType<typeof mountSpectralRibbon>>(null);
	const [webgl, setWebgl] = useState(false);
	const s = spectralRibbon({ tone, speed, position, webgl });
	const options: SpectralRibbonOptions = {
		colors: SPECTRAL_RIBBON_COLORS[tone],
		speed: SPECTRAL_RIBBON_SPEED[speed],
		intensity,
		thickness,
		grain,
	};
	const latest = useRef(options);
	latest.current = options;

	useEffect(() => {
		if (!root.current || !canvas.current) return;
		const mounted = mountSpectralRibbon(
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
	}, [tone, speed, intensity, thickness, grain]);

	return (
		<div ref={root} data-slot="spectral-ribbon" className={cn(s.root(), className)}>
			<div aria-hidden className={s.fallback()} />
			<canvas ref={canvas} aria-hidden className={s.canvas()} />
			{children ? <div className={s.content()}>{children}</div> : null}
		</div>
	);
}
